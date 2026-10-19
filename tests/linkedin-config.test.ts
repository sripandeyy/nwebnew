import './helpers/isolate-env';
import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  getLinkedInConfig,
  isLinkedInConfigured,
  resolveRedirectUri,
  DEFAULT_LINKEDIN_API_VERSION,
} from '../src/app/api/linkedin/_lib/config';

describe('LinkedIn Configuration & Validation', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  test('reports unconfigured when credentials are empty', () => {
    delete process.env.LINKEDIN_CLIENT_ID;
    delete process.env.LINKEDIN_CLIENT_SECRET;
    delete process.env.LINKEDIN_ORG_ID;

    assert.strictEqual(isLinkedInConfigured(), false);
  });

  test('reports unconfigured when placeholder values are present', () => {
    process.env.LINKEDIN_CLIENT_ID = 'your_client_id_here';
    process.env.LINKEDIN_CLIENT_SECRET = 'your_client_secret_here';
    process.env.LINKEDIN_ORG_ID = '123456';

    assert.strictEqual(isLinkedInConfigured(), false);
  });

  test('reports configured when valid non-placeholder values are provided', () => {
    process.env.LINKEDIN_CLIENT_ID = 'nyeras_app_live_id';
    process.env.LINKEDIN_CLIENT_SECRET = 'nyeras_app_secret_abc123';
    process.env.LINKEDIN_ORG_ID = '98765432';

    assert.strictEqual(isLinkedInConfigured(), true);
  });

  test('normalizes organization ID into URN format', () => {
    process.env.LINKEDIN_ORG_ID = '12345678';
    const config = getLinkedInConfig();
    assert.strictEqual(config.orgUrn, 'urn:li:organization:12345678');
    assert.strictEqual(config.orgId, '12345678');

    // If URN already prefixed, do not double-prefix
    process.env.LINKEDIN_ORG_ID = 'urn:li:organization:87654321';
    const config2 = getLinkedInConfig();
    assert.strictEqual(config2.orgUrn, 'urn:li:organization:87654321');
    assert.strictEqual(config2.orgId, '87654321');
  });

  test('defaults to a currently supported YYYYMM API version and 5 minute polling', () => {
    delete process.env.LINKEDIN_API_VERSION;
    delete process.env.LINKEDIN_SYNC_INTERVAL_MS;

    const config = getLinkedInConfig();
    assert.strictEqual(config.apiVersion, DEFAULT_LINKEDIN_API_VERSION);
    assert.match(config.apiVersion, /^\d{6}$/);
    assert.strictEqual(config.syncIntervalMs, 300000);
  });

  test('falls back to the default version when LINKEDIN_API_VERSION is malformed', () => {
    process.env.LINKEDIN_API_VERSION = '2026-09';
    assert.strictEqual(getLinkedInConfig().apiVersion, DEFAULT_LINKEDIN_API_VERSION);

    process.env.LINKEDIN_API_VERSION = '202607';
    assert.strictEqual(getLinkedInConfig().apiVersion, '202607');
  });

  test('rejects polling intervals below 30 seconds', () => {
    process.env.LINKEDIN_SYNC_INTERVAL_MS = '1000';
    assert.strictEqual(getLinkedInConfig().syncIntervalMs, 300000);
  });

  test('derives the OAuth callback from the request origin unless LINKEDIN_REDIRECT_URI is set', () => {
    delete process.env.LINKEDIN_REDIRECT_URI;
    assert.strictEqual(resolveRedirectUri('https://www.nyeras.com'), 'https://www.nyeras.com/api/linkedin/callback');
    assert.strictEqual(resolveRedirectUri('http://localhost:3001/'), 'http://localhost:3001/api/linkedin/callback');

    process.env.LINKEDIN_REDIRECT_URI = 'https://nyeras.com/api/linkedin/callback';
    assert.strictEqual(resolveRedirectUri('https://preview.vercel.app'), 'https://nyeras.com/api/linkedin/callback');
  });
});
