import './helpers/isolate-env';
import { test, describe, beforeEach, afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import axios from 'axios';
import {
  LinkedInApiClient,
  LinkedInApiError,
  littleTextToPlain,
  isPublicFeedPost,
} from '../src/app/api/linkedin/_lib/client';
import { DEFAULT_LINKEDIN_API_VERSION } from '../src/app/api/linkedin/_lib/config';

function axiosError(status: number) {
  return Object.assign(new Error(`Request failed with status code ${status}`), {
    isAxiosError: true,
    response: { status, data: {} },
  });
}

describe('LinkedIn API Client', () => {
  beforeEach(() => {
    process.env.LINKEDIN_ORG_ID = '2414183';
    process.env.LINKEDIN_API_VERSION = '';
  });

  afterEach(() => {
    mock.restoreAll();
  });

  test('constructs official OAuth 2.0 authorization URL with all required query params', () => {
    process.env.LINKEDIN_CLIENT_ID = 'test_app_id';
    process.env.LINKEDIN_SCOPES = 'r_organization_social';

    const state = 'secure_random_state_val';
    const parsed = new URL(
      LinkedInApiClient.getAuthorizationUrl(state, 'https://www.nyeras.com/api/linkedin/callback')
    );
    assert.strictEqual(parsed.origin, 'https://www.linkedin.com');
    assert.strictEqual(parsed.pathname, '/oauth/v2/authorization');
    assert.strictEqual(parsed.searchParams.get('response_type'), 'code');
    assert.strictEqual(parsed.searchParams.get('client_id'), 'test_app_id');
    assert.strictEqual(parsed.searchParams.get('redirect_uri'), 'https://www.nyeras.com/api/linkedin/callback');
    assert.strictEqual(parsed.searchParams.get('state'), state);
    assert.strictEqual(parsed.searchParams.get('scope'), 'r_organization_social');
  });

  test('fetchOrganizationPosts rejects if no access token is available', async () => {
    await assert.rejects(
      () => LinkedInApiClient.fetchOrganizationPosts({ token: '' }),
      { message: /No valid LinkedIn access token available/ }
    );
  });

  test('calls the Posts API author finder with encoded org URN and required headers', async () => {
    const get = mock.method(axios, 'get', async () => ({ data: { elements: [] } }));

    await LinkedInApiClient.fetchOrganizationPosts({ token: 'tkn' });

    assert.strictEqual(get.mock.callCount(), 1);
    const [url, config] = get.mock.calls[0].arguments as [string, { headers: Record<string, string> }];
    const parsed = new URL(url);
    assert.strictEqual(parsed.origin + parsed.pathname, 'https://api.linkedin.com/rest/posts');
    assert.ok(url.includes('author=urn%3Ali%3Aorganization%3A2414183'), 'author URN must be URL-encoded');
    assert.strictEqual(parsed.searchParams.get('q'), 'author');
    assert.strictEqual(parsed.searchParams.get('sortBy'), 'CREATED');
    assert.strictEqual(config.headers['Linkedin-Version'], DEFAULT_LINKEDIN_API_VERSION);
    assert.strictEqual(config.headers['X-Restli-Protocol-Version'], '2.0.0');
    assert.strictEqual(config.headers['X-RestLi-Method'], 'FINDER');
    assert.strictEqual(config.headers.Authorization, 'Bearer tkn');
  });

  test('filters out sponsored, draft and non-public posts and normalizes the rest', async () => {
    mock.method(axios, 'get', async () => ({
      data: {
        elements: [
          {
            id: 'urn:li:share:1',
            author: 'urn:li:organization:2414183',
            commentary: 'Hello {hashtag|\\#|Nyeras} from @[Nyeras](urn:li:organization:2414183) \\(team\\)',
            createdAt: 1700000000000,
            publishedAt: 1700000001000,
            lifecycleState: 'PUBLISHED',
            visibility: 'PUBLIC',
            distribution: { feedDistribution: 'MAIN_FEED' },
          },
          {
            id: 'urn:li:share:2',
            author: 'urn:li:organization:2414183',
            lifecycleState: 'PUBLISHED',
            visibility: 'PUBLIC',
            distribution: { feedDistribution: 'NONE' },
          },
          { id: 'urn:li:share:3', author: 'x', lifecycleState: 'DRAFT', visibility: 'PUBLIC' },
          { id: 'urn:li:share:4', author: 'x', lifecycleState: 'PUBLISHED', visibility: 'CONNECTIONS' },
        ],
      },
    }));

    const posts = await LinkedInApiClient.fetchOrganizationPosts({ token: 'tkn' });
    assert.strictEqual(posts.length, 1);
    assert.strictEqual(posts[0].urn, 'urn:li:share:1');
    assert.strictEqual(posts[0].commentary, 'Hello #Nyeras from Nyeras (team)');
    assert.strictEqual(posts[0].createdAt, 1700000001000, 'prefers publishedAt');
    assert.strictEqual(posts[0].postUrl, 'https://www.linkedin.com/feed/update/urn:li:share:1');
  });

  test('resolves media by URN type and degrades gracefully when image access is denied', async () => {
    mock.method(axios, 'get', async (url: string) => {
      if (url.includes('/rest/posts')) {
        return {
          data: {
            elements: [
              {
                id: 'urn:li:share:10',
                author: 'urn:li:organization:2414183',
                lifecycleState: 'PUBLISHED',
                visibility: 'PUBLIC',
                content: { media: { id: 'urn:li:video:V1', title: 'Demo' } },
              },
              {
                id: 'urn:li:share:11',
                author: 'urn:li:organization:2414183',
                lifecycleState: 'PUBLISHED',
                visibility: 'PUBLIC',
                content: { media: { id: 'urn:li:document:D1', title: 'Brochure' } },
              },
              {
                id: 'urn:li:share:12',
                author: 'urn:li:organization:2414183',
                lifecycleState: 'PUBLISHED',
                visibility: 'PUBLIC',
                content: { media: { id: 'urn:li:image:I1' } },
              },
            ],
          },
        };
      }
      if (url.includes('/rest/videos/urn%3Ali%3Avideo%3AV1')) {
        return { data: { downloadUrl: 'https://dms.licdn.com/v.mp4', thumbnail: 'https://media.licdn.com/t.jpg' } };
      }
      if (url.includes('/rest/images/')) {
        throw axiosError(403);
      }
      throw new Error(`unexpected url ${url}`);
    });

    const posts = await LinkedInApiClient.fetchOrganizationPosts({ token: 'tkn' });
    const byUrn = Object.fromEntries(posts.map((p) => [p.urn, p]));

    assert.deepStrictEqual(byUrn['urn:li:share:10'].media[0], {
      type: 'video',
      url: 'https://dms.licdn.com/v.mp4',
      thumbnailUrl: 'https://media.licdn.com/t.jpg',
      title: 'Demo',
    });
    assert.strictEqual(byUrn['urn:li:share:11'].media[0].type, 'document');
    assert.strictEqual(byUrn['urn:li:share:11'].media[0].url, byUrn['urn:li:share:11'].postUrl);
    assert.strictEqual(byUrn['urn:li:share:12'].media[0].type, 'image');
    assert.strictEqual(byUrn['urn:li:share:12'].media[0].url, undefined);
  });

  test('401 surfaces as a LinkedInApiError with status 401 so the caller can drop the token', async () => {
    mock.method(axios, 'get', async () => {
      throw axiosError(401);
    });

    await assert.rejects(
      () => LinkedInApiClient.fetchOrganizationPosts({ token: 'expired' }),
      (err: unknown) => err instanceof LinkedInApiError && err.status === 401 && /expired or is invalid/.test(err.message)
    );
  });

  test('token exchange and refresh send the right grant to the OAuth endpoint', async () => {
    process.env.LINKEDIN_CLIENT_ID = 'test_app_id';
    process.env.LINKEDIN_CLIENT_SECRET = 'test_secret';
    const post = mock.method(axios, 'post', async () => ({
      data: { access_token: 'new', expires_in: 5184000, refresh_token: 'r1', refresh_token_expires_in: 31536000 },
    }));

    const exchanged = await LinkedInApiClient.exchangeAuthCodeForToken('code123', 'https://www.nyeras.com/api/linkedin/callback');
    assert.deepStrictEqual(exchanged, {
      accessToken: 'new',
      expiresIn: 5184000,
      scope: undefined,
      refreshToken: 'r1',
      refreshTokenExpiresIn: 31536000,
    });
    const exchangeBody = new URLSearchParams(post.mock.calls[0].arguments[1] as string);
    assert.strictEqual(exchangeBody.get('grant_type'), 'authorization_code');
    assert.strictEqual(exchangeBody.get('code'), 'code123');
    assert.strictEqual(exchangeBody.get('redirect_uri'), 'https://www.nyeras.com/api/linkedin/callback');
    assert.strictEqual(exchangeBody.get('client_secret'), 'test_secret');

    await LinkedInApiClient.refreshAccessToken('r1');
    const refreshBody = new URLSearchParams(post.mock.calls[1].arguments[1] as string);
    assert.strictEqual(refreshBody.get('grant_type'), 'refresh_token');
    assert.strictEqual(refreshBody.get('refresh_token'), 'r1');
  });

  test('maps 403, 426 and 429 responses to actionable errors', async () => {
    for (const [status, pattern] of [
      [403, /permission denied/],
      [426, /no longer supported/],
      [429, /rate limit/],
    ] as const) {
      mock.method(axios, 'get', async () => {
        throw axiosError(status);
      });
      await assert.rejects(() => LinkedInApiClient.fetchOrganizationPosts({ token: 't' }), { message: pattern });
      mock.restoreAll();
    }
  });
});

describe('LinkedIn content helpers', () => {
  test('littleTextToPlain converts hashtag/mention templates and unescapes reserved chars', () => {
    assert.strictEqual(littleTextToPlain('{hashtag|\\#|AI} and {hashtag|#|ML}'), '#AI and #ML');
    assert.strictEqual(littleTextToPlain('Thanks @[GITAM University](urn:li:organization:42)'), 'Thanks GITAM University');
    assert.strictEqual(littleTextToPlain('50\\% \\(approx\\) \\*bold\\* \\_x\\_'), '50\\% (approx) *bold* _x_');
    assert.strictEqual(littleTextToPlain(''), '');
  });

  test('isPublicFeedPost only accepts published, public, main-feed posts', () => {
    const base = { id: 'urn:li:share:1', author: 'a' };
    assert.strictEqual(isPublicFeedPost({ ...base, lifecycleState: 'PUBLISHED', visibility: 'PUBLIC' }), true);
    assert.strictEqual(
      isPublicFeedPost({ ...base, lifecycleState: 'PUBLISHED', visibility: 'PUBLIC', distribution: { feedDistribution: 'NONE' } }),
      false
    );
    assert.strictEqual(isPublicFeedPost({ ...base, lifecycleState: 'PROCESSING' }), false);
    assert.strictEqual(isPublicFeedPost({ ...base, visibility: 'LOGGED_IN' }), false);
  });
});
