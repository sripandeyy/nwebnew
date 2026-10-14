import crypto from 'crypto';
import { Router, Request, Response } from 'express';
import { getLinkedInConfig, isLinkedInConfigured } from './config';
import { tokenStore } from './tokenStore';
import { postsStore } from './postsStore';
import { LinkedInApiClient } from './client';
import { syncService } from './syncService';
import { socketManager } from '../socket';

export const linkedinRouter = Router();

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isLoopback(req: Request): boolean {
  const addr = req.socket.remoteAddress || '';
  return addr === '127.0.0.1' || addr === '::1' || addr === '::ffff:127.0.0.1';
}

/**
 * Admin-only endpoints (starting OAuth, forcing a sync). With LINKEDIN_ADMIN_KEY set the key
 * must be supplied via the X-LinkedIn-Admin-Key header or ?key= query; without it, only
 * loopback requests (local development) are allowed.
 */
function requireAdmin(req: Request, res: Response): boolean {
  const { adminKey } = getLinkedInConfig();
  if (adminKey) {
    const supplied = String(req.get('x-linkedin-admin-key') || req.query.key || '');
    const a = Buffer.from(supplied);
    const b = Buffer.from(adminKey);
    if (a.length === b.length && crypto.timingSafeEqual(a, b)) return true;
    res.status(401).json({ error: 'Admin key required for this LinkedIn endpoint.' });
    return false;
  }
  if (isLoopback(req)) return true;
  res.status(403).json({
    error: 'Set LINKEDIN_ADMIN_KEY to use this LinkedIn endpoint from a non-local address.',
  });
  return false;
}

function renderResultPage(options: {
  title: string;
  heading: string;
  message: string;
  success: boolean;
  messageType: 'LINKEDIN_AUTH_SUCCESS' | 'LINKEDIN_AUTH_ERROR';
}): string {
  const { frontendUrl } = getLinkedInConfig();
  const accent = options.success ? '#10b981' : '#ef4444';
  // JSON.stringify output is safe inside <script> once "<" is escaped
  const scriptData = JSON.stringify({ type: options.messageType, frontendUrl }).replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(options.title)} - Nyeras</title>
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
    <a href="${escapeHtml(frontendUrl)}/">Return to Nyeras Website</a>
  </div>
  <script>
    (function () {
      var data = ${scriptData};
      if (window.opener) {
        window.opener.postMessage({ type: data.type }, data.frontendUrl);
        setTimeout(function () { window.close(); }, 2500);
      }
    })();
  </script>
</body>
</html>`;
}

/**
 * 1. OAuth Authorization Endpoint (admin only)
 * GET /api/linkedin/auth
 * Redirects to LinkedIn's OAuth 2.0 consent screen with a single-use CSRF state.
 */
linkedinRouter.get('/auth', (req: Request, res: Response) => {
  if (!requireAdmin(req, res)) return;

  const config = getLinkedInConfig();

  if (!config.clientId || !config.clientSecret) {
    res.status(400).json({
      error: 'LinkedIn credentials not configured. Please define LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET in backend environment variables.',
      configured: false,
    });
    return;
  }

  if (!config.orgUrn) {
    res.status(400).json({
      error: 'LINKEDIN_ORG_ID is not configured.',
      configured: false,
    });
    return;
  }

  const state = tokenStore.createCsrfState();
  const authUrl = LinkedInApiClient.getAuthorizationUrl(state);

  if (req.query.format === 'json') {
    res.json({ url: authUrl, state });
    return;
  }

  res.redirect(authUrl);
});

/**
 * 2. OAuth Callback Endpoint
 * GET /api/linkedin/callback
 * Validates state, exchanges the code, and only stores the token once it has
 * successfully read the organization's posts.
 */
linkedinRouter.get('/callback', async (req: Request, res: Response) => {
  const query = req.query as Record<string, string | undefined>;
  const { code, state, error, error_description } = query;

  res.set('Cache-Control', 'no-store');

  if (error) {
    res.status(400).send(
      renderResultPage({
        title: 'LinkedIn Authorization Failed',
        heading: 'Authorization Cancelled',
        message: error_description || error || 'LinkedIn authorization was not completed.',
        success: false,
        messageType: 'LINKEDIN_AUTH_ERROR',
      })
    );
    return;
  }

  if (!state || !tokenStore.verifyAndConsumeCsrfState(state)) {
    res.status(400).send(
      renderResultPage({
        title: 'Invalid State',
        heading: 'Security Error: Invalid or Expired State Token',
        message: 'The state parameter is invalid or has expired. Please restart the authorization flow.',
        success: false,
        messageType: 'LINKEDIN_AUTH_ERROR',
      })
    );
    return;
  }

  if (!code) {
    res.status(400).send(
      renderResultPage({
        title: 'Authorization Failed',
        heading: 'Missing Authorization Code',
        message: 'LinkedIn did not return an authorization code.',
        success: false,
        messageType: 'LINKEDIN_AUTH_ERROR',
      })
    );
    return;
  }

  try {
    const tokenData = await LinkedInApiClient.exchangeAuthCodeForToken(code);

    // Refuse tokens that cannot read the NYERAS organization feed (wrong member, missing role/scope)
    await LinkedInApiClient.verifyAccess(tokenData.accessToken);

    tokenStore.saveToken(tokenData);
    tokenStore.markVerified();
    postsStore.setLastError(null);

    syncService.syncNow().catch((syncErr) => {
      console.warn('[LinkedInCallback] Post-authorization sync error:', (syncErr as Error).message);
    });

    socketManager.broadcastStatus(socketManager.getStatusSnapshot());

    res.send(
      renderResultPage({
        title: 'LinkedIn Connected',
        heading: 'Authorization Successful',
        message: 'Access to the NYERAS organization posts was verified with LinkedIn. The feed will now synchronize automatically.',
        success: true,
        messageType: 'LINKEDIN_AUTH_SUCCESS',
      })
    );
  } catch (err) {
    const errMsg = (err as Error).message;
    console.error('[LinkedInCallback] Authorization failed:', errMsg);
    res.status(502).send(
      renderResultPage({
        title: 'Authorization Failed',
        heading: 'Authorization Failed',
        message: errMsg,
        success: false,
        messageType: 'LINKEDIN_AUTH_ERROR',
      })
    );
  }
});

/**
 * 3. Status Endpoint
 * GET /api/linkedin/status
 * Safe diagnostic status without exposing any access tokens or client secrets
 */
linkedinRouter.get('/status', (_req: Request, res: Response) => {
  res.json(socketManager.getStatusSnapshot());
});

/**
 * 4. Posts Feed Endpoint
 * GET /api/linkedin/posts
 * Returns synchronized posts, duplicate-prevented, latest first
 */
linkedinRouter.get('/posts', (_req: Request, res: Response) => {
  const status = socketManager.getStatusSnapshot();
  // Cached posts only exist after a successful authenticated sync, so they stay visible if the token later expires
  const posts = postsStore.getAllPosts();

  let message: string;
  if (!status.configured) message = 'LinkedIn integration is not configured.';
  else if (!status.authenticated) message = 'LinkedIn integration pending authorization.';
  else if (!status.live) message = 'Authorized; waiting for the first successful LinkedIn API request.';
  else message = `Retrieved ${posts.length} synchronized post(s).`;

  res.json({ success: true, status, posts, message });
});

/**
 * 5. Manual Sync Trigger Endpoint (admin only)
 * POST /api/linkedin/sync
 */
linkedinRouter.post('/sync', async (req: Request, res: Response) => {
  if (!requireAdmin(req, res)) return;

  try {
    const { result, cooldownRemainingMs } = await syncService.manualSync();
    if (cooldownRemainingMs > 0) {
      res.status(429).json({
        success: false,
        message: `Please wait ${Math.ceil(cooldownRemainingMs / 1000)}s before triggering another sync.`,
        status: socketManager.getStatusSnapshot(),
      });
      return;
    }
    if (!result) {
      res.status(isLinkedInConfigured() ? 502 : 400).json({
        success: false,
        message: postsStore.getLastError() || 'Sync could not be performed (unconfigured or in progress).',
        status: socketManager.getStatusSnapshot(),
      });
      return;
    }

    res.json({
      success: true,
      message: `Sync completed: ${result.newCount} new post(s) found.`,
      result: { ...result, newlyAdded: undefined },
      status: socketManager.getStatusSnapshot(),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: (err as Error).message,
    });
  }
});
