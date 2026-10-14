import fs from 'fs';
import path from 'path';
import { NormalizedLinkedInPost } from './types';
import { getLinkedInConfig } from './config';

// Signed media URLs rotate on every fetch, so they are excluded when detecting real edits
function contentSignature(post: NormalizedLinkedInPost): string {
  return JSON.stringify({
    commentary: post.commentary,
    lastModifiedAt: post.lastModifiedAt,
    media: (post.media || []).map((m) => ({ type: m.type, title: m.title, description: m.description })),
  });
}

export interface SyncResult {
  newCount: number;
  newlyAdded: NormalizedLinkedInPost[];
  updatedCount: number;
  removedCount: number;
  total: number;
}

function toMillis(value: number | string): number {
  return typeof value === 'number' ? value : new Date(value).getTime();
}

class LinkedInPostsStore {
  private postsMap: Map<string, NormalizedLinkedInPost> = new Map(); // urn -> post
  private cacheFilePath: string;
  private lastSyncTime: string | null = null;
  private lastError: string | null = null;
  private syncInProgress: boolean = false;

  constructor() {
    const cacheDir = getLinkedInConfig().cacheDir;
    try {
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }
    } catch {
      // Graceful fallback
    }
    this.cacheFilePath = path.join(cacheDir, 'linkedin_posts.json');
    this.loadFromDisk();
  }

  private loadFromDisk(): void {
    try {
      if (fs.existsSync(this.cacheFilePath)) {
        const raw = fs.readFileSync(this.cacheFilePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.posts)) {
          for (const post of parsed.posts as NormalizedLinkedInPost[]) {
            if (post && post.urn) {
              this.postsMap.set(post.urn, post);
            }
          }
        }
        if (parsed && parsed.lastSyncTime) {
          this.lastSyncTime = parsed.lastSyncTime;
        }
      }
    } catch (err) {
      console.warn('[LinkedInPostsStore] Failed to load cached posts:', (err as Error).message);
    }
  }

  private persistToDisk(): void {
    try {
      const data = {
        lastSyncTime: this.lastSyncTime,
        posts: this.getAllPosts(),
      };
      fs.writeFileSync(this.cacheFilePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.warn('[LinkedInPostsStore] Failed to persist posts cache:', (err as Error).message);
    }
  }

  /**
   * Add or update posts with duplicate prevention.
   * Returns newly added posts and counts.
   */
  public addOrUpdatePosts(incomingPosts: NormalizedLinkedInPost[]): SyncResult {
    const newlyAdded: NormalizedLinkedInPost[] = [];
    let updatedCount = 0;

    for (const post of incomingPosts) {
      if (!post || !post.urn) continue;

      if (!this.postsMap.has(post.urn)) {
        this.postsMap.set(post.urn, post);
        newlyAdded.push(post);
      } else {
        // Always keep the freshest copy (media URLs expire), but only count real content edits
        const existing = this.postsMap.get(post.urn)!;
        if (contentSignature(existing) !== contentSignature(post)) {
          updatedCount++;
        }
        this.postsMap.set(post.urn, { ...existing, ...post });
      }
    }

    // Incoming posts are the newest N by creation time, so any cached post inside that
    // window that LinkedIn no longer returns has been deleted or hidden.
    let removedCount = 0;
    const incomingUrns = new Set(incomingPosts.filter((p) => p && p.urn).map((p) => p.urn));
    if (incomingUrns.size > 0) {
      const oldestIncoming = Math.min(
        ...incomingPosts.filter((p) => p && p.urn).map((p) => toMillis(p.createdAt))
      );
      for (const [urn, post] of this.postsMap) {
        if (!incomingUrns.has(urn) && toMillis(post.createdAt) >= oldestIncoming) {
          this.postsMap.delete(urn);
          removedCount++;
        }
      }
    }

    this.lastSyncTime = new Date().toISOString();
    this.lastError = null;
    this.persistToDisk();

    return {
      newCount: newlyAdded.length,
      newlyAdded,
      updatedCount,
      removedCount,
      total: this.postsMap.size,
    };
  }

  /**
   * Get all posts sorted by createdAt descending (latest first)
   */
  public getAllPosts(): NormalizedLinkedInPost[] {
    return Array.from(this.postsMap.values()).sort((a, b) => toMillis(b.createdAt) - toMillis(a.createdAt));
  }

  public getPostCount(): number {
    return this.postsMap.size;
  }

  public getLastSyncTime(): string | null {
    return this.lastSyncTime;
  }

  public setLastSyncTime(isoTime: string): void {
    this.lastSyncTime = isoTime;
    this.persistToDisk();
  }

  public getLastError(): string | null {
    return this.lastError;
  }

  public setLastError(error: string | null): void {
    this.lastError = error;
  }

  public isSyncInProgress(): boolean {
    return this.syncInProgress;
  }

  public setSyncInProgress(inProgress: boolean): void {
    this.syncInProgress = inProgress;
  }

  public clear(): void {
    this.postsMap.clear();
    this.lastSyncTime = null;
    this.lastError = null;
    this.persistToDisk();
  }
}

export const postsStore = new LinkedInPostsStore();
