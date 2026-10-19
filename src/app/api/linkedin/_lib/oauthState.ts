import { createHmac, randomBytes, timingSafeEqual } from 'crypto';

export const OAUTH_STATE_COOKIE = 'nyeras_linkedin_oauth_state';
export const OAUTH_STATE_TTL_MS = 10 * 60 * 1000;

function sign(payload: string, secret: string): string {
  return createHmac('sha256', `linkedin-oauth-state:${secret}`).update(payload).digest('base64url');
}

export function createOAuthState(secret: string, now = Date.now()): string {
  const payload = `${now + OAUTH_STATE_TTL_MS}.${randomBytes(24).toString('base64url')}`;
  return `${payload}.${sign(payload, secret)}`;
}

/**
 * Serverless instances share no memory, so the state is self-verifying (HMAC + expiry) and
 * additionally bound to the browser that started the flow via an httpOnly cookie.
 */
export function verifyOAuthState(
  state: string | undefined | null,
  cookieState: string | undefined | null,
  secret: string,
  now = Date.now()
): boolean {
  if (!state || !cookieState) return false;
  const a = Buffer.from(state);
  const b = Buffer.from(cookieState);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const lastDot = state.lastIndexOf('.');
  if (lastDot <= 0) return false;
  const payload = state.slice(0, lastDot);
  const expected = Buffer.from(sign(payload, secret));
  const given = Buffer.from(state.slice(lastDot + 1));
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return false;

  const expiresAt = Number(payload.split('.')[0]);
  return Number.isFinite(expiresAt) && expiresAt > now;
}
