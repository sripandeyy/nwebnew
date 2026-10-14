import './helpers/isolate-env';
import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { tokenStore } from '../src/server/linkedin/tokenStore';

describe('LinkedIn Token Store & CSRF Security', () => {
  beforeEach(() => {
    tokenStore.clearToken();
    process.env.LINKEDIN_ACCESS_TOKEN = '';
  });

  test('CSRF state token generates random string and verifies only once', () => {
    const state = tokenStore.createCsrfState();
    assert.ok(state && state.length >= 32);
    assert.strictEqual(tokenStore.verifyAndConsumeCsrfState(state), true);
    assert.strictEqual(tokenStore.verifyAndConsumeCsrfState(state), false, 'replay must fail');
  });

  test('CSRF state verification fails for unknown token', () => {
    assert.strictEqual(tokenStore.verifyAndConsumeCsrfState('tampered_fake_state_123'), false);
  });

  test('saves token and tracks expiration properly', () => {
    assert.strictEqual(tokenStore.hasValidToken(), false);

    tokenStore.saveToken({ accessToken: 'test_token_secret_xyz', expiresIn: 3600, scope: 'r_organization_social' });

    assert.strictEqual(tokenStore.hasValidToken(), true);
    assert.strictEqual(tokenStore.getAccessToken(), 'test_token_secret_xyz');

    const meta = tokenStore.getTokenMeta();
    assert.strictEqual(meta.hasToken, true);
    assert.strictEqual(meta.scope, 'r_organization_social');
    assert.ok(typeof meta.expiresAt === 'number' && meta.expiresAt > Date.now());
  });

  test('persists the token file with owner-only permissions', () => {
    tokenStore.saveToken({ accessToken: 'perm_check', expiresIn: 3600 });
    const file = path.join(process.env.LINKEDIN_CACHE_DIR as string, 'linkedin_token.json');
    assert.strictEqual(fs.statSync(file).mode & 0o777, 0o600);
  });

  test('a token is not verified until markVerified is called', () => {
    tokenStore.saveToken({ accessToken: 'unverified', expiresIn: 3600 });
    assert.strictEqual(tokenStore.isVerified(), false);

    tokenStore.markVerified();
    assert.strictEqual(tokenStore.isVerified(), true);

    // A replacement token starts unverified again
    tokenStore.saveToken({ accessToken: 'replacement', expiresIn: 3600 });
    assert.strictEqual(tokenStore.isVerified(), false);
  });

  test('expired tokens are not returned', () => {
    tokenStore.saveToken({ accessToken: 'almost_expired', expiresIn: 30 });
    assert.strictEqual(tokenStore.hasValidToken(), false);
  });

  test('clears token properly', () => {
    tokenStore.saveToken({ accessToken: 'temporary_token', expiresIn: 3600 });
    tokenStore.markVerified();
    tokenStore.clearToken();
    assert.strictEqual(tokenStore.hasValidToken(), false);
    assert.strictEqual(tokenStore.getAccessToken(), null);
    assert.strictEqual(tokenStore.isVerified(), false);
  });
});
