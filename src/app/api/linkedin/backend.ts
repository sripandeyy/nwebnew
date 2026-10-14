// Server-only proxy helpers: the Express backend (src/server) owns LinkedIn OAuth, tokens and sync.
// Next.js only relays the public, secret-free endpoints so the browser can use same-origin URLs.

const BACKEND_URL = (process.env.LINKEDIN_BACKEND_URL || 'http://localhost:5001').replace(/\/$/, '');

export const UNAVAILABLE_STATUS = {
  configured: false,
  authenticated: false,
  live: false,
  organizationId: null,
  organizationUrn: null,
  apiVersion: null,
  lastSyncTime: null,
  syncInProgress: false,
  postCount: 0,
  pollingIntervalMs: null,
  error: 'LinkedIn sync service is unavailable.',
};

export async function fetchFromBackend(path: string): Promise<{ ok: true; data: unknown } | { ok: false }> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/linkedin${path}`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return { ok: false };
    return { ok: true, data: await res.json() };
  } catch {
    return { ok: false };
  }
}
