import './helpers/isolate-env';
import { test, describe, before, after, beforeEach, afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import http from 'http';
import axios from 'axios';
import { app } from '../src/server/app';
import { tokenStore } from '../src/server/linkedin/tokenStore';
import { postsStore } from '../src/server/linkedin/postsStore';

function setCredentials() {
  process.env.LINKEDIN_CLIENT_ID = 'test_app_id';
  process.env.LINKEDIN_CLIENT_SECRET = 'test_secret';
  process.env.LINKEDIN_ORG_ID = '2414183';
}

function axiosError(status: number) {
  return Object.assign(new Error(`Request failed with status code ${status}`), {
    isAxiosError: true,
    response: { status, data: {} },
  });
}

async function startAuthState(baseUrl: string): Promise<string> {
  const res = await fetch(`${baseUrl}/api/linkedin/auth?format=json`);
  assert.strictEqual(res.status, 200);
  return (await res.json()).state;
}

describe('Express LinkedIn API Endpoints', () => {
  let server: http.Server;
  let baseUrl: string;

  before(async () => {
    await new Promise<void>((resolve) => {
      server = app.listen(0, '127.0.0.1', () => {
        const address = server.address();
        if (address && typeof address === 'object') {
          baseUrl = `http://127.0.0.1:${address.port}`;
        }
        resolve();
      });
    });
  });

  after(async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  beforeEach(() => {
    process.env.LINKEDIN_CLIENT_ID = '';
    process.env.LINKEDIN_CLIENT_SECRET = '';
    process.env.LINKEDIN_ORG_ID = '';
    process.env.LINKEDIN_ADMIN_KEY = '';
    tokenStore.clearToken();
    postsStore.clear();
  });

  afterEach(() => {
    mock.restoreAll();
  });

  test('GET /api/linkedin/status returns safe diagnostic metadata with no secrets', async () => {
    setCredentials();
    tokenStore.saveToken({ accessToken: 'super_secret_token', expiresIn: 3600 });

    const res = await fetch(`${baseUrl}/api/linkedin/status`);
    assert.strictEqual(res.status, 200);
    const raw = await res.text();
    const body = JSON.parse(raw);

    for (const key of ['configured', 'authenticated', 'live', 'organizationId', 'apiVersion', 'lastSyncTime', 'postCount']) {
      assert.ok(key in body, `missing ${key}`);
    }
    assert.strictEqual(body.authenticated, true);
    assert.strictEqual(body.live, false, 'not live until an authenticated API request succeeds');
    assert.ok(!raw.includes('super_secret_token'), 'access token must never be exposed');
    assert.ok(!raw.includes('test_secret'), 'client secret must never be exposed');
  });

  test('GET /api/linkedin/posts reports the unconfigured/pending state with no posts', async () => {
    const res = await fetch(`${baseUrl}/api/linkedin/posts`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.deepStrictEqual(body.posts, []);
    assert.strictEqual(body.status.configured, false);
    assert.strictEqual(body.status.live, false);
    assert.match(body.message, /not configured/);
  });

  test('GET /api/linkedin/auth rejects with 400 when credentials are empty', async () => {
    const res = await fetch(`${baseUrl}/api/linkedin/auth?format=json`);
    assert.strictEqual(res.status, 400);
    const body = await res.json();
    assert.ok(body.error.includes('credentials not configured'));
  });

  test('GET /api/linkedin/auth returns authorization URL with valid CSRF state', async () => {
    setCredentials();
    const res = await fetch(`${baseUrl}/api/linkedin/auth?format=json`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.ok(body.url.startsWith('https://www.linkedin.com/oauth/v2/authorization'));
    assert.ok(body.state);
  });

  test('GET /api/linkedin/auth requires the admin key when LINKEDIN_ADMIN_KEY is set', async () => {
    setCredentials();
    process.env.LINKEDIN_ADMIN_KEY = 'correct-horse-battery';

    assert.strictEqual((await fetch(`${baseUrl}/api/linkedin/auth?format=json`)).status, 401);
    assert.strictEqual((await fetch(`${baseUrl}/api/linkedin/auth?format=json&key=wrong`)).status, 401);

    const ok = await fetch(`${baseUrl}/api/linkedin/auth?format=json`, {
      headers: { 'X-LinkedIn-Admin-Key': 'correct-horse-battery' },
    });
    assert.strictEqual(ok.status, 200);
  });

  test('GET /api/linkedin/callback rejects missing or invalid CSRF state', async () => {
    const res = await fetch(`${baseUrl}/api/linkedin/callback?code=mock_code&state=invalid_csrf_state`);
    assert.strictEqual(res.status, 400);
    assert.ok((await res.text()).includes('Invalid or Expired State Token'));
  });

  test('GET /api/linkedin/callback escapes attacker-controlled error text', async () => {
    const payload = '<script>alert(1)</script>';
    const res = await fetch(
      `${baseUrl}/api/linkedin/callback?error=access_denied&error_description=${encodeURIComponent(payload)}`
    );
    assert.strictEqual(res.status, 400);
    const html = await res.text();
    assert.ok(!html.includes(payload), 'raw script must not be reflected');
    assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
    assert.ok(html.includes("postMessage({ type: data.type }, data.frontendUrl)"), 'postMessage must target the frontend origin');
  });

  test('callback refuses to store a token that cannot read the organization posts', async () => {
    setCredentials();
    const state = await startAuthState(baseUrl);

    mock.method(axios, 'post', async () => ({ data: { access_token: 'wrong_member_token', expires_in: 5184000 } }));
    mock.method(axios, 'get', async () => {
      throw axiosError(403);
    });

    const res = await fetch(`${baseUrl}/api/linkedin/callback?code=abc&state=${state}`);
    assert.strictEqual(res.status, 502);
    assert.match(await res.text(), /permission denied/);
    assert.strictEqual(tokenStore.hasValidToken(), false);
    assert.strictEqual((await (await fetch(`${baseUrl}/api/linkedin/status`)).json()).live, false);
  });

  test('callback stores a verified token and only then reports live', async () => {
    setCredentials();
    const state = await startAuthState(baseUrl);

    mock.method(axios, 'post', async () => ({ data: { access_token: 'good_token', expires_in: 5184000 } }));
    mock.method(axios, 'get', async () => ({ data: { elements: [] } }));

    const res = await fetch(`${baseUrl}/api/linkedin/callback?code=abc&state=${state}`);
    assert.strictEqual(res.status, 200);
    assert.match(await res.text(), /Authorization Successful/);
    assert.strictEqual(tokenStore.getAccessToken(), 'good_token');

    const status = await (await fetch(`${baseUrl}/api/linkedin/status`)).json();
    assert.strictEqual(status.live, true);

    // The same state cannot be replayed
    const replay = await fetch(`${baseUrl}/api/linkedin/callback?code=abc&state=${state}`);
    assert.strictEqual(replay.status, 400);
  });

  test('POST /api/linkedin/sync is rate limited', async () => {
    const first = await fetch(`${baseUrl}/api/linkedin/sync`, { method: 'POST' });
    assert.strictEqual(first.status, 400, 'unconfigured sync is rejected');
    const second = await fetch(`${baseUrl}/api/linkedin/sync`, { method: 'POST' });
    assert.strictEqual(second.status, 429);
  });

  test('CORS only allows the configured frontend origin', async () => {
    const allowed = await fetch(`${baseUrl}/api/linkedin/status`, { headers: { Origin: 'http://localhost:3000' } });
    assert.strictEqual(allowed.headers.get('access-control-allow-origin'), 'http://localhost:3000');

    const blocked = await fetch(`${baseUrl}/api/linkedin/status`, { headers: { Origin: 'https://evil.example' } });
    assert.strictEqual(blocked.headers.get('access-control-allow-origin'), null);
  });
});
