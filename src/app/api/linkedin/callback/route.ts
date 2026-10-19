import { NextRequest, NextResponse } from 'next/server';
import { getLinkedInConfig, resolveRedirectUri } from '../_lib/config';
import { LinkedInApiClient } from '../_lib/client';
import { OAUTH_STATE_COOKIE, verifyOAuthState } from '../_lib/oauthState';
import { connectWithToken, MANUAL_SYNC_COOLDOWN_MS, runSync } from '../_lib/sync';

export const dynamic = 'force-dynamic';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function resultPage(
  origin: string,
  options: { heading: string; message: string; success: boolean },
  status: number
): NextResponse {
  const accent = options.success ? '#10b981' : '#ef4444';
  const messageType = options.success ? 'LINKEDIN_AUTH_SUCCESS' : 'LINKEDIN_AUTH_ERROR';
  // JSON.stringify output is safe inside <script> once "<" is escaped
  const scriptData = JSON.stringify({ type: messageType, origin }).replace(/</g, '\\u003c');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(options.heading)} - Nyeras</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0b0f19; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
    .card { background: #111827; border: 1px solid ${accent}55; border-radius: 16px; padding: 32px; max-width: 480px; text-align: center; }
    h2 { margin: 0 0 12px 0; font-size: 22px; color: ${accent}; }
    p { color: #94a3b8; font-size: 14px; line-height: 1.5; margin-bottom: 24px; }
    a { display: inline-block; background: #0077b5; color: #fff; text-decoration: none; padding: 10px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <h2>${escapeHtml(options.heading)}</h2>
    <p>${escapeHtml(options.message)}</p>
    <a href="/lms">Return to Admin Portal</a>
  </div>
  <script>
    (function () {
      var data = ${scriptData};
      if (window.opener) {
        window.opener.postMessage({ type: data.type }, data.origin);
        setTimeout(function () { window.close(); }, 2500);
      }
    })();
  </script>
</body>
</html>`;

  const res = new NextResponse(html, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
  res.cookies.set(OAUTH_STATE_COOKIE, '', { path: '/api/linkedin', maxAge: 0 });
  return res;
}

/**
 * GET /api/linkedin/callback
 * Validates state, exchanges the code, and only stores the token once it has
 * successfully read the organization's posts.
 */
export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const params = req.nextUrl.searchParams;
  const error = params.get('error');

  if (error) {
    return resultPage(
      origin,
      {
        heading: 'Authorization Cancelled',
        message: params.get('error_description') || error || 'LinkedIn authorization was not completed.',
        success: false,
      },
      400
    );
  }

  const stateValid = verifyOAuthState(
    params.get('state'),
    req.cookies.get(OAUTH_STATE_COOKIE)?.value,
    getLinkedInConfig().clientSecret
  );
  if (!stateValid) {
    return resultPage(
      origin,
      {
        heading: 'Security Error: Invalid or Expired State Token',
        message: 'The state parameter is invalid or has expired. Please restart the authorization flow from the admin portal.',
        success: false,
      },
      400
    );
  }

  const code = params.get('code');
  if (!code) {
    return resultPage(
      origin,
      { heading: 'Missing Authorization Code', message: 'LinkedIn did not return an authorization code.', success: false },
      400
    );
  }

  try {
    const tokenData = await LinkedInApiClient.exchangeAuthCodeForToken(code, resolveRedirectUri(origin));
    // Refuses tokens that cannot read the NYERAS organization feed (wrong member, missing role/scope)
    await connectWithToken(tokenData);
    const sync = await runSync(MANUAL_SYNC_COOLDOWN_MS);
    const synced = sync.status === 'synced' ? ` ${sync.result.total} post(s) loaded.` : '';

    return resultPage(
      origin,
      {
        heading: 'Authorization Successful',
        message: `Access to the NYERAS organization posts was verified with LinkedIn.${synced} The feed will now refresh automatically.`,
        success: true,
      },
      200
    );
  } catch (err) {
    const message = (err as Error).message;
    console.error('[LinkedIn] Authorization failed:', message);
    return resultPage(origin, { heading: 'Authorization Failed', message, success: false }, 502);
  }
}
