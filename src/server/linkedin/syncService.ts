import cron from 'node-cron';
import { getLinkedInConfig, isLinkedInConfigured } from './config';
import { tokenStore } from './tokenStore';
import { postsStore, SyncResult } from './postsStore';
import { LinkedInApiClient } from './client';
import { socketManager } from '../socket';

export const MANUAL_SYNC_COOLDOWN_MS = 30000;

export class LinkedInSyncService {
  private timer: NodeJS.Timeout | null = null;
  private cronTask: cron.ScheduledTask | null = null;
  private isRunning: boolean = false;
  private lastManualSyncAt = 0;

  /**
   * Start scheduled polling/cron synchronization
   */
  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;

    const config = getLinkedInConfig();

    if (config.syncCron && cron.validate(config.syncCron)) {
      console.log(`[LinkedInSyncService] Starting cron synchronization: ${config.syncCron}`);
      this.cronTask = cron.schedule(config.syncCron, () => {
        this.syncNow().catch((err) => {
          console.warn('[LinkedInSyncService] Cron sync cycle error:', (err as Error).message);
        });
      });
    } else {
      if (config.syncCron) {
        console.warn(`[LinkedInSyncService] Ignoring invalid LINKEDIN_SYNC_CRON "${config.syncCron}".`);
      }
      console.log(`[LinkedInSyncService] Starting polling synchronization every ${config.syncIntervalMs / 1000}s`);
      this.timer = setInterval(() => {
        this.syncNow().catch((err) => {
          console.warn('[LinkedInSyncService] Polling sync cycle error:', (err as Error).message);
        });
      }, config.syncIntervalMs);
    }

    // Trigger initial sync attempt if authenticated
    if (tokenStore.hasValidToken()) {
      this.syncNow().catch((err) => {
        console.warn('[LinkedInSyncService] Initial sync error:', (err as Error).message);
      });
    } else {
      console.log('[LinkedInSyncService] Service initialized in pending authorization state.');
    }
  }

  /**
   * Stop scheduled synchronization
   */
  public stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.cronTask) {
      this.cronTask.stop();
      this.cronTask = null;
    }
    this.isRunning = false;
    console.log('[LinkedInSyncService] Stopped synchronization schedule.');
  }

  /**
   * Admin-triggered sync, rate limited so it cannot be used to exhaust the LinkedIn API quota.
   * Returns the remaining cooldown in ms instead of syncing when called too often.
   */
  public async manualSync(): Promise<{ result: SyncResult | null; cooldownRemainingMs: number }> {
    const remaining = this.lastManualSyncAt + MANUAL_SYNC_COOLDOWN_MS - Date.now();
    if (remaining > 0) {
      return { result: null, cooldownRemainingMs: remaining };
    }
    this.lastManualSyncAt = Date.now();
    return { result: await this.syncNow(), cooldownRemainingMs: 0 };
  }

  /**
   * Run synchronization now (manual or scheduled)
   */
  public async syncNow(): Promise<SyncResult | null> {
    if (postsStore.isSyncInProgress()) {
      console.log('[LinkedInSyncService] Sync already in progress, skipping duplicate cycle.');
      return null;
    }

    // Check configuration and authentication
    if (!isLinkedInConfigured()) {
      postsStore.setLastError('LinkedIn credentials not configured. Please set environment variables.');
      socketManager.broadcastStatus(socketManager.getStatusSnapshot());
      return null;
    }

    if (!tokenStore.hasValidToken()) {
      postsStore.setLastError('Awaiting LinkedIn OAuth authorization.');
      socketManager.broadcastStatus(socketManager.getStatusSnapshot());
      return null;
    }

    postsStore.setSyncInProgress(true);
    socketManager.broadcastStatus(socketManager.getStatusSnapshot());

    try {
      console.log('[LinkedInSyncService] Synchronizing posts from LinkedIn API...');
      const posts = await LinkedInApiClient.fetchOrganizationPosts();
      tokenStore.markVerified();

      const result = postsStore.addOrUpdatePosts(posts);
      console.log(
        `[LinkedInSyncService] Sync complete: ${result.newCount} new, ${result.updatedCount} updated, ${result.removedCount} removed, ${result.total} total posts.`
      );

      socketManager.broadcastPostsUpdated(postsStore.getAllPosts(), postsStore.getLastSyncTime());

      if (result.newCount > 0) {
        socketManager.broadcastNewPosts(result.newCount, result.newlyAdded);
      }

      postsStore.setLastError(null);
      return result;
    } catch (error) {
      const errMsg = (error as Error).message;
      console.error('[LinkedInSyncService] Synchronization failed:', errMsg);
      postsStore.setLastError(errMsg);
      return null;
    } finally {
      postsStore.setSyncInProgress(false);
      socketManager.broadcastStatus(socketManager.getStatusSnapshot());
    }
  }
}

export const syncService = new LinkedInSyncService();
