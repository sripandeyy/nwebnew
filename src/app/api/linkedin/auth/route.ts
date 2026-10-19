import { NextRequest, NextResponse } from 'next/server';
import { getLinkedInConfig, isLinkedInConfigured, resolveRedirectUri } from '../_lib/config';
import { LinkedInApiClient } from '../_lib/client';
import { createOAuthState, OAUTH_STATE_COOKIE, OAUTH_STATE_TTL_MS } from '../_lib/oauthState';
import { isLinkedInAdmin } from '../_lib/adminAccess';

export const dynamic = 'force-dynamic';

/**
 * GET /api/linkedin/auth (admin only)
 * Redirects to LinkedIn's OAuth consent screen. ?format=json returns the URL instead.
 */
export async function GET(req: NextRequest) {
  if (!isLinkedInAdmin(req)) {
    return NextResponse.json({ error: 'Admin sign-in required to connect LinkedIn.' }, { status: 401 });
  }
  if (!isLinkedInConfigured()) {
    return NextResponse.json(
      { error: 'Set LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET and LINKEDIN_ORG_ID first.', configured: false },
      { status: 400 }
    );
  }

  const state = createOAuthState(getLinkedInConfig().clientSecret);
  const redirectUri = resolveRedirectUri(req.nextUrl.origin);
  const url = LinkedInApiClient.getAuthorizationUrl(state, redirectUri);

  const res =
    req.nextUrl.searchParams.get('format') === 'json'
      ? NextResponse.json({ url, redirectUri })
      : NextResponse.redirect(url);
  res.headers.set('Cache-Control', 'no-store');
  res.cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    // LinkedIn redirects back with a top-level GET, which Lax cookies accompany
    sameSite: 'lax',
    path: '/api/linkedin',
    maxAge: OAUTH_STATE_TTL_MS / 1000,
  });
  return res;
}
