import './helpers/isolate-env';
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { toStoredToken, tokenFingerprint } from '../src/app/api/linkedin/_lib/sync';

describe('LinkedIn token handling', () => {
  test('computes absolute expiry from expires_in', () => {
    const before = Date.now();
    const token = toStoredToken({ accessToken: 'a', expiresIn: 3600, refreshToken: 'r', refreshTokenExpiresIn: 7200 });
    assert.ok(token.expiresAt >= before + 3600 * 1000 && token.expiresAt <= Date.now() + 3600 * 1000);
    assert.strictEqual(token.refreshToken, 'r');
    assert.strictEqual(token.refreshTokenExpiresIn, 7200);
  });

  test('keeps the previous refresh token and its clock when a refresh response omits it', () => {
    const previous = toStoredToken({ accessToken: 'old', expiresIn: 10, refreshToken: 'r1', refreshTokenExpiresIn: 7200 });
    const refreshed = toStoredToken({ accessToken: 'new', expiresIn: 3600 }, previous);
    assert.strictEqual(refreshed.accessToken, 'new');
    assert.strictEqual(refreshed.refreshToken, 'r1');
    assert.strictEqual(refreshed.createdAt, previous.createdAt);
  });

  test('fingerprints identify a token without storing it', () => {
    assert.strictEqual(tokenFingerprint('abc'), tokenFingerprint('abc'));
    assert.notStrictEqual(tokenFingerprint('abc'), tokenFingerprint('abd'));
    assert.ok(!tokenFingerprint('secret-token').includes('secret'));
  });
});
