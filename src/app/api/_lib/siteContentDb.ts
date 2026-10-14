import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import { getDb } from '../db'

export const SITE_CONTENT_KEYS = ['courses', 'blogs', 'gallery', 'mous'] as const
export type SiteContentKey = (typeof SITE_CONTENT_KEYS)[number]

export const MAX_MEDIA_BYTES = 3 * 1024 * 1024
export const ALLOWED_MEDIA_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

let tablesReady: Promise<void> | null = null

export function ensureTables(): Promise<void> {
  if (!tablesReady) {
    tablesReady = (async () => {
      const db = getDb()
      await db.query(`CREATE TABLE IF NOT EXISTS site_content (
        content_key VARCHAR(64) NOT NULL PRIMARY KEY,
        data LONGTEXT NOT NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) DEFAULT CHARSET=utf8mb4`)
      await db.query(`CREATE TABLE IF NOT EXISTS site_media (
        id CHAR(32) NOT NULL PRIMARY KEY,
        mime VARCHAR(64) NOT NULL,
        data LONGBLOB NOT NULL,
        size INT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`)
    })().catch((err) => {
      tablesReady = null
      throw err
    })
  }
  return tablesReady
}

export function isSiteContentKey(key: unknown): key is SiteContentKey {
  return typeof key === 'string' && (SITE_CONTENT_KEYS as readonly string[]).includes(key)
}

export async function readAllContent(): Promise<Partial<Record<SiteContentKey, unknown>>> {
  await ensureTables()
  const [rows] = await getDb().query<RowDataPacket[]>('SELECT content_key, data FROM site_content')
  const result: Partial<Record<SiteContentKey, unknown>> = {}
  for (const row of rows) {
    if (isSiteContentKey(row.content_key)) {
      try {
        result[row.content_key] = JSON.parse(row.data)
      } catch {
        // Ignore a corrupted row rather than breaking the whole site.
      }
    }
  }
  return result
}

export async function writeContent(key: SiteContentKey, data: unknown): Promise<void> {
  await ensureTables()
  await getDb().execute(
    'INSERT INTO site_content (content_key, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data = VALUES(data)',
    [key, JSON.stringify(data)]
  )
}

export async function insertMedia(id: string, mime: string, data: Buffer): Promise<void> {
  await ensureTables()
  await getDb().execute<ResultSetHeader>('INSERT INTO site_media (id, mime, data, size) VALUES (?, ?, ?, ?)', [
    id,
    mime,
    data,
    data.length,
  ])
}

export async function readMedia(id: string): Promise<{ mime: string; data: Buffer } | null> {
  await ensureTables()
  const [rows] = await getDb().execute<RowDataPacket[]>('SELECT mime, data FROM site_media WHERE id = ? LIMIT 1', [id])
  if (rows.length === 0) return null
  return { mime: String(rows[0].mime), data: rows[0].data as Buffer }
}
