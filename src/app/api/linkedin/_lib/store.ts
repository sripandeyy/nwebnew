import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { getDb } from '../../db';
import { LinkedInOAuthToken, NormalizedLinkedInPost } from './types';

export interface FeedState {
  posts: NormalizedLinkedInPost[];
  lastSyncTime: string | null;
  lastError: string | null;
  // Fingerprint of the access token whose last API request succeeded
  verifiedToken: string | null;
}

const EMPTY_FEED: FeedState = { posts: [], lastSyncTime: null, lastError: null, verifiedToken: null };

type StateKey = 'token' | 'feed' | 'sync_lock';

let tableReady: Promise<void> | null = null;

function ensureTable(): Promise<void> {
  if (!tableReady) {
    tableReady = getDb()
      .query(
        `CREATE TABLE IF NOT EXISTS linkedin_state (
          state_key VARCHAR(32) NOT NULL PRIMARY KEY,
          data LONGTEXT NULL,
          updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
        ) DEFAULT CHARSET=utf8mb4`
      )
      .then(() => undefined)
      .catch((err) => {
        tableReady = null;
        throw err;
      });
  }
  return tableReady;
}

async function readState<T>(key: StateKey): Promise<T | null> {
  await ensureTable();
  const [rows] = await getDb().execute<RowDataPacket[]>(
    'SELECT data FROM linkedin_state WHERE state_key = ? LIMIT 1',
    [key]
  );
  if (rows.length === 0 || rows[0].data == null) return null;
  try {
    return JSON.parse(rows[0].data) as T;
  } catch {
    return null;
  }
}

async function writeState(key: StateKey, data: unknown): Promise<void> {
  await ensureTable();
  await getDb().execute(
    `INSERT INTO linkedin_state (state_key, data, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP(3))
     ON DUPLICATE KEY UPDATE data = VALUES(data), updated_at = CURRENT_TIMESTAMP(3)`,
    [key, data == null ? null : JSON.stringify(data)]
  );
}

export async function readToken(): Promise<LinkedInOAuthToken | null> {
  const token = await readState<LinkedInOAuthToken>('token');
  return token && token.accessToken ? token : null;
}

export async function writeToken(token: LinkedInOAuthToken | null): Promise<void> {
  await writeState('token', token);
}

export async function readFeed(): Promise<FeedState> {
  return { ...EMPTY_FEED, ...(await readState<Partial<FeedState>>('feed')) };
}

export async function writeFeed(feed: FeedState): Promise<void> {
  await writeState('feed', feed);
}

/**
 * Atomically claims the right to call LinkedIn if nobody has claimed it in the last `minGapMs`.
 * This is both the cross-instance sync lock and the rate limit protecting the API quota.
 */
export async function claimSync(minGapMs: number): Promise<boolean> {
  await ensureTable();
  const db = getDb();
  await db.execute(
    "INSERT IGNORE INTO linkedin_state (state_key, data, updated_at) VALUES ('sync_lock', NULL, '1970-01-02 00:00:00.000')"
  );
  const [result] = await db.execute<ResultSetHeader>(
    `UPDATE linkedin_state SET updated_at = CURRENT_TIMESTAMP(3)
     WHERE state_key = 'sync_lock' AND TIMESTAMPDIFF(MICROSECOND, updated_at, CURRENT_TIMESTAMP(3)) >= ?`,
    [Math.max(0, Math.floor(minGapMs)) * 1000]
  );
  return result.affectedRows === 1;
}

/** Milliseconds until claimSync(minGapMs) can succeed again (0 if it can now). */
export async function syncCooldownRemaining(minGapMs: number): Promise<number> {
  await ensureTable();
  const [rows] = await getDb().execute<RowDataPacket[]>(
    `SELECT TIMESTAMPDIFF(MICROSECOND, updated_at, CURRENT_TIMESTAMP(3)) AS ago
     FROM linkedin_state WHERE state_key = 'sync_lock' LIMIT 1`
  );
  if (rows.length === 0) return 0;
  return Math.max(0, minGapMs - Number(rows[0].ago) / 1000);
}
