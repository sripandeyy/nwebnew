import axios, { AxiosError } from 'axios';
import { getLinkedInConfig } from './config';
import { NormalizedLinkedInPost, LinkedInRawPostElement, LinkedInMediaItem } from './types';

export interface LinkedInTokenResponse {
  accessToken: string;
  expiresIn: number;
  scope?: string;
  refreshToken?: string;
  refreshTokenExpiresIn?: number;
}

// In-memory cache for resolved media URLs to avoid repeated REST calls
const mediaCache = new Map<string, { url?: string; thumbnailUrl?: string; expiresAt: number }>();

export class LinkedInApiError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = 'LinkedInApiError';
  }
}

/**
 * Converts LinkedIn "little text" commentary (hashtag/mention templates and backslash
 * escapes) into plain display text.
 */
export function littleTextToPlain(text: string): string {
  if (!text) return '';
  return text
    .replace(/\{hashtag\|\\?#\|([^}]*)\}/g, '#$1')
    .replace(/@\[([^\]]*)\]\(urn:li:[^)]+\)/g, '$1')
    .replace(/\\([|{}@[\]()<>#\\*_~])/g, '$1');
}

/**
 * Only organic, published, publicly visible posts belong in the website feed.
 * The author finder also returns sponsored "dark" posts (feedDistribution NONE).
 */
export function isPublicFeedPost(raw: LinkedInRawPostElement): boolean {
  if (raw.lifecycleState && raw.lifecycleState !== 'PUBLISHED') return false;
  if (raw.visibility && raw.visibility !== 'PUBLIC') return false;
  if (raw.distribution?.feedDistribution && raw.distribution.feedDistribution !== 'MAIN_FEED') return false;
  return true;
}

export class LinkedInApiClient {
  private static readonly BASE_URL = 'https://api.linkedin.com/rest';
  private static readonly OAUTH_BASE_URL = 'https://www.linkedin.com/oauth/v2';

  /**
   * Generates official LinkedIn OAuth 2.0 authorization URL
   */
  public static getAuthorizationUrl(state: string, redirectUri: string): string {
    const config = getLinkedInConfig();
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: config.clientId,
      redirect_uri: redirectUri,
      state,
      scope: config.scopes.join(' '),
    });
    return `${this.OAUTH_BASE_URL}/authorization?${params.toString()}`;
  }

  /**
   * Exchanges authorization code for access token with LinkedIn OAuth endpoint
   */
  public static async exchangeAuthCodeForToken(code: string, redirectUri: string): Promise<LinkedInTokenResponse> {
    return this.requestToken('token exchange', {
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    });
  }

  /**
   * Programmatic refresh; LinkedIn only issues refresh tokens to apps approved for them.
   */
  public static async refreshAccessToken(refreshToken: string): Promise<LinkedInTokenResponse> {
    return this.requestToken('token refresh', {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });
  }

  private static async requestToken(
    label: string,
    grant: Record<string, string>
  ): Promise<LinkedInTokenResponse> {
    const config = getLinkedInConfig();

    if (!config.clientId || !config.clientSecret) {
      throw new Error('LinkedIn client ID or client secret is not configured.');
    }

    const params = new URLSearchParams({
      ...grant,
      client_id: config.clientId,
      client_secret: config.clientSecret,
    });

    try {
      const response = await axios.post<{
        access_token: string;
        expires_in: number;
        scope?: string;
        refresh_token?: string;
        refresh_token_expires_in?: number;
      }>(`${this.OAUTH_BASE_URL}/accessToken`, params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 15000,
      });

      return {
        accessToken: response.data.access_token,
        expiresIn: response.data.expires_in,
        scope: response.data.scope,
        refreshToken: response.data.refresh_token,
        refreshTokenExpiresIn: response.data.refresh_token_expires_in,
      };
    } catch (error) {
      const axiosErr = error as AxiosError<{ error?: string; error_description?: string }>;
      const errorMsg =
        axiosErr.response?.data?.error_description ||
        axiosErr.response?.data?.error ||
        axiosErr.message;
      throw new LinkedInApiError(`LinkedIn ${label} failed: ${errorMsg}`, axiosErr.response?.status);
    }
  }

  private static restHeaders(token: string, apiVersion: string): Record<string, string> {
    return {
      'Linkedin-Version': apiVersion,
      'X-Restli-Protocol-Version': '2.0.0',
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };
  }

  /**
   * Fetches posts authored by the NYERAS organization URN using the official LinkedIn Posts API
   * (GET /rest/posts?author={encoded org URN}&q=author).
   */
  public static async fetchOrganizationPosts(options: {
    token: string;
    count?: number;
    orgUrn?: string;
  }): Promise<NormalizedLinkedInPost[]> {
    const config = getLinkedInConfig();
    const token = options.token;

    if (!token) {
      throw new Error('No valid LinkedIn access token available. Authorization required.');
    }

    const orgUrn = options.orgUrn || config.orgUrn;
    if (!orgUrn) {
      throw new Error('LinkedIn organization ID/URN is not configured.');
    }

    const count = Math.min(Math.max(options.count || 20, 1), 100);

    // URNs must be URL-encoded with Rest.li protocol 2.0.0
    const url =
      `${this.BASE_URL}/posts?author=${encodeURIComponent(orgUrn)}` +
      `&q=author&count=${count}&sortBy=CREATED`;

    try {
      const response = await axios.get<{ elements?: LinkedInRawPostElement[] }>(url, {
        headers: {
          ...this.restHeaders(token, config.apiVersion),
          'X-RestLi-Method': 'FINDER',
        },
        timeout: 20000,
      });

      const rawElements = (response.data.elements || []).filter(isPublicFeedPost);
      const normalizedPosts: NormalizedLinkedInPost[] = [];

      for (const element of rawElements) {
        try {
          const normalized = await this.normalizePost(element, token, config.apiVersion);
          normalizedPosts.push(normalized);
        } catch (normErr) {
          console.warn('[LinkedInApiClient] Error normalizing post:', element.id, (normErr as Error).message);
        }
      }

      return normalizedPosts;
    } catch (error) {
      const axiosErr = error as AxiosError<{ message?: string; status?: number }>;
      const status = axiosErr.response?.status;
      if (status === 401) {
        throw new LinkedInApiError(
          'LinkedIn authentication token has expired or is invalid. Please re-authenticate.',
          401
        );
      }
      if (status === 403) {
        throw new LinkedInApiError(
          'LinkedIn API permission denied. The app needs Community Management API access with r_organization_social, and the authorizing member must be an Administrator or Content Admin of the NYERAS page.',
          403
        );
      }
      if (status === 426) {
        throw new LinkedInApiError(
          `LinkedIn API version ${config.apiVersion} is no longer supported. Update LINKEDIN_API_VERSION.`,
          426
        );
      }
      if (status === 429) {
        throw new LinkedInApiError('LinkedIn API rate limit reached. Sync will retry on the next cycle.', 429);
      }
      const message = axiosErr.response?.data?.message || axiosErr.message;
      throw new LinkedInApiError(`LinkedIn Posts API error (${status || 'Network'}): ${message}`, status);
    }
  }

  /**
   * Proves that a token can actually read the organization's posts.
   */
  public static async verifyAccess(token: string): Promise<void> {
    await this.fetchOrganizationPosts({ token, count: 1 });
  }

  /**
   * Resolves an image URN via the Images API. Note: LinkedIn requires a write-level scope
   * (e.g. w_organization_social) for GET /rest/images; with read-only scopes this degrades
   * to no preview and the card links to the post instead.
   */
  private static async resolveImage(
    imageUrn: string,
    token: string,
    apiVersion: string
  ): Promise<string | undefined> {
    const cached = mediaCache.get(imageUrn);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.url;
    }

    try {
      const res = await axios.get<{ downloadUrl?: string; downloadUrlExpiresAt?: number }>(
        `${this.BASE_URL}/images/${encodeURIComponent(imageUrn)}`,
        { headers: this.restHeaders(token, apiVersion), timeout: 8000 }
      );

      if (res.data.downloadUrl) {
        const expiresAt = res.data.downloadUrlExpiresAt || Date.now() + 2 * 3600 * 1000;
        mediaCache.set(imageUrn, { url: res.data.downloadUrl, expiresAt });
        return res.data.downloadUrl;
      }
    } catch (err) {
      console.warn('[LinkedInApiClient] Failed to resolve image URN:', imageUrn, (err as Error).message);
    }
    return undefined;
  }

  /**
   * Resolves a video URN via the Videos API to its thumbnail and playback URL.
   */
  private static async resolveVideo(
    videoUrn: string,
    token: string,
    apiVersion: string
  ): Promise<{ url?: string; thumbnailUrl?: string }> {
    const cached = mediaCache.get(videoUrn);
    if (cached && cached.expiresAt > Date.now()) {
      return { url: cached.url, thumbnailUrl: cached.thumbnailUrl };
    }

    try {
      const res = await axios.get<{ downloadUrl?: string; downloadUrlExpiresAt?: number; thumbnail?: string }>(
        `${this.BASE_URL}/videos/${encodeURIComponent(videoUrn)}`,
        { headers: this.restHeaders(token, apiVersion), timeout: 8000 }
      );
      const result = { url: res.data.downloadUrl, thumbnailUrl: res.data.thumbnail };
      const expiresAt = res.data.downloadUrlExpiresAt || Date.now() + 2 * 3600 * 1000;
      mediaCache.set(videoUrn, { ...result, expiresAt });
      return result;
    } catch (err) {
      console.warn('[LinkedInApiClient] Failed to resolve video URN:', videoUrn, (err as Error).message);
    }
    return {};
  }

  /**
   * Normalizes raw post element into clean NormalizedLinkedInPost
   */
  private static async normalizePost(
    raw: LinkedInRawPostElement,
    token: string,
    apiVersion: string
  ): Promise<NormalizedLinkedInPost> {
    const urn = raw.id;
    let commentary = raw.commentary || '';
    if (!commentary && raw.specificContent?.['com.linkedin.ugc.ShareContent']?.shareCommentary?.text) {
      commentary = raw.specificContent['com.linkedin.ugc.ShareContent'].shareCommentary.text;
    }
    commentary = littleTextToPlain(commentary);

    const createdAt = raw.publishedAt || raw.createdAt || raw.lastModifiedAt || Date.now();
    const createdAtFormatted = new Date(createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    // Post URL format: https://www.linkedin.com/feed/update/{urn}
    const postUrl = `https://www.linkedin.com/feed/update/${urn}`;

    const mediaList: LinkedInMediaItem[] = [];

    if (raw.content) {
      const mediaId = raw.content.media?.id;
      if (mediaId) {
        if (mediaId.startsWith('urn:li:video:')) {
          const video = await this.resolveVideo(mediaId, token, apiVersion);
          mediaList.push({
            type: 'video',
            url: video.url,
            thumbnailUrl: video.thumbnailUrl,
            title: raw.content.media?.title,
          });
        } else if (mediaId.startsWith('urn:li:document:')) {
          mediaList.push({
            type: 'document',
            url: postUrl,
            title: raw.content.media?.title,
          });
        } else if (mediaId.startsWith('urn:li:image:')) {
          mediaList.push({
            type: 'image',
            url: await this.resolveImage(mediaId, token, apiVersion),
            title: raw.content.media?.title,
            altText: raw.content.media?.altText,
          });
        }
      }

      if (raw.content.article) {
        const thumb = raw.content.article.thumbnail;
        mediaList.push({
          type: 'article',
          url: raw.content.article.source,
          title: raw.content.article.title,
          description: raw.content.article.description,
          thumbnailUrl: thumb?.startsWith('urn:li:image:')
            ? await this.resolveImage(thumb, token, apiVersion)
            : thumb,
        });
      }

      if (raw.content.multiImage?.images?.length) {
        for (const img of raw.content.multiImage.images) {
          if (img.id) {
            mediaList.push({
              type: 'image',
              url: await this.resolveImage(img.id, token, apiVersion),
              altText: img.altText,
            });
          }
        }
      }
    }

    // Legacy UGC content if present and no media found
    if (mediaList.length === 0 && raw.specificContent?.['com.linkedin.ugc.ShareContent']?.media) {
      for (const m of raw.specificContent['com.linkedin.ugc.ShareContent'].media) {
        mediaList.push({
          type: 'image',
          url: m.thumbnails?.[0]?.url || m.originalUrl,
          title: m.title?.text,
          description: m.description?.text,
        });
      }
    }

    return {
      id: urn,
      urn,
      commentary,
      createdAt,
      createdAtFormatted,
      lastModifiedAt: raw.lastModifiedAt,
      lifecycleState: raw.lifecycleState || 'PUBLISHED',
      visibility: raw.visibility || 'PUBLIC',
      postUrl,
      author: {
        name: 'Nyeras EduTech Innovations',
        urn: raw.author,
      },
      media: mediaList,
    };
  }
}
