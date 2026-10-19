import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { createOAuthState, verifyOAuthState, OAUTH_STATE_TTL_MS } from '../src/app/api/linkedin/_lib/oauthState';

describe('LinkedIn OAuth state (CSRF protection)', () => {
  const secret = 'client-secret';

  test('accepts a fresh state that matches the browser cookie', () => {
    const state = createOAuthState(secret);
    assert.strictEqual(verifyOAuthState(state, state, secret), true);
  });

  test('rejects a missing or mismatched cookie', () => {
    const state = createOAuthState(secret);
    assert.strictEqual(verifyOAuthState(state, undefined, secret), false);
    assert.strictEqual(verifyOAuthState(state, createOAuthState(secret), secret), false);
    assert.strictEqual(verifyOAuthState(null, state, secret), false);
  });

  test('rejects a state signed with a different secret', () => {
    const forged = createOAuthState('attacker-secret');
    assert.strictEqual(verifyOAuthState(forged, forged, secret), false);
  });

  test('rejects a tampered expiry', () => {
    const state = createOAuthState(secret);
    const [, nonce, sig] = state.split('.');
    const tampered = `${Date.now() + 10 * OAUTH_STATE_TTL_MS}.${nonce}.${sig}`;
    assert.strictEqual(verifyOAuthState(tampered, tampered, secret), false);
  });

  test('rejects an expired state', () => {
    const issuedAt = Date.now() - OAUTH_STATE_TTL_MS - 1000;
    const state = createOAuthState(secret, issuedAt);
    assert.strictEqual(verifyOAuthState(state, state, secret), false);
  });
});
