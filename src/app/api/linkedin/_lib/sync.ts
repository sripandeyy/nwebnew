import { createHash } from 'crypto';
import { getLinkedInConfig, isLinkedInConfigured } from './config';
import { LinkedInApiClient, LinkedInApiError, LinkedInTokenResponse } from './client';
import { mergePosts, MergeResult } from './mergePosts';
import { claimSync, readFeed, readToken, syncCooldownRemaining, writeFeed, writeToken, FeedState } from './store';
import { LinkedInOAuthToken, LinkedInStatusResponse, NormalizedLinkedInPost } from './types';

export const MANUAL_SYNC_COOLDOWN_MS = 30000;
const EXPIRY_BUFFER_MS = 60000;

export function tokenFingerprint(accessToken: string): string {
  return createHash('sha256').update(accessToken).digest('hex').slice(0, 16);
}

export function toStoredToken(data: LinkedInTokenResponse, previous?: LinkedInOAuthToken | null): LinkedInOAuthToken {
  const now = Date.now();
  // A refresh response may omit the refresh token, in which case the previous one stays valid
  const keepPrevious = !data.refreshToken && previous?.refreshToken;
  return {
    accessToken: data.accessToken,
    expiresIn: data.expiresIn,
    expiresAt: now + data.expiresIn * 1000,
    scope: data.scope ?? previous?.scope,
    refreshToken: keepPrevious ? previous!.refreshToken : data.refreshToken,
    refreshTokenExpiresIn: keepPrevious ? previous!.refreshTokenExpiresIn : data.refreshTokenExpiresIn,
    createdAt: keepPrevious ? previous!.createdAt : now,
  };
}

function refreshTokenUsable(token: LinkedInOAuthToken, now: number): boolean {
  if (!token.refreshToken) return false;
  if (!token.refreshTokenExpiresIn) return true;
  return token.createdAt + token.refreshTokenExpiresIn * 1000 > now + EXPIRY_BUFFER_MS;
}

interface ActiveToken {
  accessToken: string;
  source: 'oauth' | 'env';
}

/** Valid access token, refreshing the stored OAuth token when LinkedIn issued a refresh token. */
async function getActiveToken(): Promise<ActiveToken | null> {
  const now = Date.now();
  const stored = await readToken();

  if (stored) {
    if (stored.expiresAt > now + EXPIRY_BUFFER_MS) {
      return { accessToken: stored.accessToken, source: 'oauth' };
    }
    if (refreshTokenUsable(stored, now)) {
      try {
        const refreshed = toStoredToken(await LinkedInApiClient.refreshAccessToken(stored.refreshToken!), stored);
        await writeToken(refreshed);
        return { accessToken: refreshed.accessToken, source: 'oauth' };
      } catch (err) {
        console.warn('[LinkedIn] Token refresh failed:', (err as Error).message);
      }
    }
  }

  const { manualAccessToken } = getLinkedInConfig();
  return manualAccessToken ? { accessToken: manualAccessToken, source: 'env' } : null;
}

async function hasActiveTokenWithoutRefresh(): Promise<{ authenticated: boolean; fingerprint: string | null }> {
  const stored = await readToken();
  if (stored && (stored.expiresAt > Date.now() + EXPIRY_BUFFER_MS || refreshTokenUsable(stored, Date.now()))) {
    return { authenticated: true, fingerprint: tokenFingerprint(stored.accessToken) };
  }
  const { manualAccessToken } = getLinkedInConfig();
  if (manualAccessToken) return { authenticated: true, fingerprint: tokenFingerprint(manualAccessToken) };
  return { authenticated: false, fingerprint: null };
}

export type SyncOutcome =
  | { status: 'synced'; result: Omit<MergeResult, 'posts'> & { total: number } }
  | { status: 'skipped'; reason: 'unconfigured' | 'unauthenticated' | 'cooldown'; cooldownRemainingMs?: number }
  | { status: 'failed'; error: string };

/**
 * Fetches the organization's posts and merges them into the stored feed, at most once per `minGapMs`
 * across all server instances.
 */
export async function runSync(minGapMs: number): Promise<SyncOutcome> {
  if (!isLinkedInConfigured()) return { status: 'skipped', reason: 'unconfigured' };

  const token = await getActiveToken();
  if (!token) return { status: 'skipped', reason: 'unauthenticated' };

  if (!(await claimSync(minGapMs))) {
    return { status: 'skipped', reason: 'cooldown', cooldownRemainingMs: await syncCooldownRemaining(minGapMs) };
  }

  const feed = await readFeed();
  try {
    const fetched = await LinkedInApiClient.fetchOrganizationPosts({ token: token.accessToken });
    const merged = mergePosts(feed.posts, fetched);
    await writeFeed({
      posts: merged.posts,
      lastSyncTime: new Date().toISOString(),
      lastError: null,
      verifiedToken: tokenFingerprint(token.accessToken),
    });
    const { posts, ...counts } = merged;
    return { status: 'synced', result: { ...counts, total: posts.length } };
  } catch (err) {
    const message = (err as Error).message;
    console.error('[LinkedIn] Synchronization failed:', message);
    if (err instanceof LinkedInApiError && err.status === 401 && token.source === 'oauth') {
      await writeToken(null);
    }
    await writeFeed({ ...feed, lastError: message });
    return { status: 'failed', error: message };
  }
}

/** Stores a token from the OAuth callback once it has proven it can read the organization feed. */
export async function connectWithToken(data: LinkedInTokenResponse): Promise<void> {
  await LinkedInApiClient.verifyAccess(data.accessToken);
  await writeToken(toStoredToken(data));
  const feed = await readFeed();
  await writeFeed({ ...feed, lastError: null, verifiedToken: tokenFingerprint(data.accessToken) });
}

export async function getFeedSnapshot(): Promise<{ status: LinkedInStatusResponse; posts: NormalizedLinkedInPost[] }> {
  const config = getLinkedInConfig();
  const configured = isLinkedInConfigured();
  const [feed, auth] = await Promise.all([readFeed(), hasActiveTokenWithoutRefresh()]);
  return { status: buildStatus(config, configured, feed, auth), posts: feed.posts };
}

function buildStatus(
  config: ReturnType<typeof getLinkedInConfig>,
  configured: boolean,
  feed: FeedState,
  auth: { authenticated: boolean; fingerprint: string | null }
): LinkedInStatusResponse {
  let error = feed.lastError;
  if (!configured) error = 'LinkedIn credentials not configured.';
  else if (!auth.authenticated) error = error || 'Awaiting LinkedIn authorization.';

  return {
    configured,
    authenticated: auth.authenticated,
    live: configured && auth.authenticated && auth.fingerprint !== null && auth.fingerprint === feed.verifiedToken,
    organizationId: config.orgId || null,
    organizationUrn: config.orgUrn || null,
    apiVersion: config.apiVersion,
    lastSyncTime: feed.lastSyncTime,
    syncInProgress: false,
    postCount: feed.posts.length,
    pollingIntervalMs: config.syncIntervalMs,
    error,
  };
}
