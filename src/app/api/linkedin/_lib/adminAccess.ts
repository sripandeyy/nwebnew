import { timingSafeEqual } from 'crypto';
import type { NextRequest } from 'next/server';
import { isAdminRequest } from '../../_lib/adminAuth';
import { getLinkedInConfig } from './config';

/**
 * Connecting LinkedIn and forcing a sync require either the /lms admin session or
 * LINKEDIN_ADMIN_KEY (X-LinkedIn-Admin-Key header or ?key= query) for scripted use.
 */
export function isLinkedInAdmin(req: NextRequest): boolean {
  if (isAdminRequest(req)) return true;
  const { adminKey } = getLinkedInConfig();
  if (!adminKey) return false;
  const supplied = Buffer.from(req.headers.get('x-linkedin-admin-key') || req.nextUrl.searchParams.get('key') || '');
  const expected = Buffer.from(adminKey);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}
