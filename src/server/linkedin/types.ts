/**
 * Types for LinkedIn REST API, OAuth, and Synchronization Service
 */

export interface LinkedInAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
  apiVersion: string;
  orgId: string;
  orgUrn: string;
  syncIntervalMs: number;
}

export interface LinkedInOAuthToken {
  accessToken: string;
  expiresIn: number; // seconds
  expiresAt: number; // timestamp in ms
  scope?: string;
  refreshToken?: string;
  refreshTokenExpiresIn?: number;
  createdAt: number;
  // Set only after an authenticated Posts API request with this token succeeds
  verifiedAt?: number;
}

export interface LinkedInMediaItem {
  type: 'image' | 'article' | 'video' | 'document' | 'unknown';
  url?: string;
  title?: string;
  description?: string;
  altText?: string;
  thumbnailUrl?: string;
}

export interface NormalizedLinkedInPost {
  id: string; // e.g. urn:li:share:12345
  urn: string;
  commentary: string;
  createdAt: number; // ms
  createdAtFormatted: string;
  lastModifiedAt?: number;
  lifecycleState?: string;
  visibility?: string;
  postUrl: string; // https://www.linkedin.com/feed/update/{urn}
  author: {
    name: string;
    urn: string;
  };
  media: LinkedInMediaItem[];
  stats?: {
    likes?: number;
    comments?: number;
    shares?: number;
  };
}

export interface LinkedInStatusResponse {
  configured: boolean;
  authenticated: boolean;
  // True only when an authenticated LinkedIn API request has succeeded with the current token
  live: boolean;
  organizationId: string | null;
  organizationUrn: string | null;
  apiVersion: string;
  lastSyncTime: string | null;
  syncInProgress: boolean;
  postCount: number;
  pollingIntervalMs: number;
  error: string | null;
}

export interface LinkedInPostsResponse {
  success: boolean;
  status: LinkedInStatusResponse;
  posts: NormalizedLinkedInPost[];
  message?: string;
}

export interface LinkedInRawPostElement {
  id: string;
  author: string;
  commentary?: string;
  createdAt?: number;
  publishedAt?: number;
  lastModifiedAt?: number;
  lifecycleState?: string;
  visibility?: string;
  distribution?: {
    feedDistribution?: 'MAIN_FEED' | 'NONE' | string;
  };
  content?: {
    media?: {
      id?: string;
      title?: string;
      altText?: string;
    };
    article?: {
      source?: string;
      title?: string;
      description?: string;
      thumbnail?: string;
    };
    multiImage?: {
      images?: Array<{
        id?: string;
        altText?: string;
      }>;
    };
    poll?: {
      question?: string;
    };
  };
  specificContent?: {
    'com.linkedin.ugc.ShareContent'?: {
      shareCommentary?: {
        text?: string;
      };
      shareMediaCategory?: string;
      media?: Array<{
        originalUrl?: string;
        title?: { text?: string };
        description?: { text?: string };
        thumbnails?: Array<{ url?: string }>;
      }>;
    };
  };
}
