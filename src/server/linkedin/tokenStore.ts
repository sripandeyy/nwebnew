import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { LinkedInOAuthToken } from './types';
import { getLinkedInConfig } from './config';

class LinkedInTokenStore {
  private inMemoryToken: LinkedInOAuthToken | null = null;
  private cacheFilePath: string;
  private activeCsrfStates: Map<string, number> = new Map(); // state -> expiresAt timestamp (ms)
  private manualTokenVerifiedAt: number | null = null;

  constructor() {
    const cacheDir = getLinkedInConfig().cacheDir;
    try {
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }
    } catch {
      // Graceful fallback if filesystem is read-only
    }
    this.cacheFilePath = path.join(cacheDir, 'linkedin_token.json');
    this.loadTokenFromDisk();
  }

  private loadTokenFromDisk(): void {
    try {
      if (fs.existsSync(this.cacheFilePath)) {
        const raw = fs.readFileSync(this.cacheFilePath, 'utf-8');
        const parsed = JSON.parse(raw) as LinkedInOAuthToken;
        if (parsed && parsed.accessToken) {
          this.inMemoryToken = parsed;
        }
      }
    } catch (err) {
      console.warn('[LinkedInTokenStore] Failed to load token cache:', (err as Error).message);
    }
  }

  private persistTokenToDisk(): void {
    try {
      if (this.inMemoryToken) {
        fs.writeFileSync(this.cacheFilePath, JSON.stringify(this.inMemoryToken, null, 2), {
          encoding: 'utf-8',
          mode: 0o600,
        });
      } else if (fs.existsSync(this.cacheFilePath)) {
        fs.unlinkSync(this.cacheFilePath);
      }
    } catch (err) {
      console.warn('[LinkedInTokenStore] Failed to persist token cache:', (err as Error).message);
    }
  }

  /**
   * Save newly exchanged token from OAuth flow
   */
  public saveToken(data: {
    accessToken: string;
    expiresIn: number;
    scope?: string;
    refreshToken?: string;
    refreshTokenExpiresIn?: number;
  }): LinkedInOAuthToken {
    const now = Date.now();
    const tokenObj: LinkedInOAuthToken = {
      accessToken: data.accessToken,
      expiresIn: data.expiresIn,
      expiresAt: now + data.expiresIn * 1000,
      scope: data.scope,
      refreshToken: data.refreshToken,
      refreshTokenExpiresIn: data.refreshTokenExpiresIn,
      createdAt: now,
    };

    this.inMemoryToken = tokenObj;
    this.persistTokenToDisk();
    return tokenObj;
  }

  /**
   * Returns valid access token or null if missing / expired.
   * If manual fallback token is set in env, it's used if no OAuth token is present.
   */
  public getAccessToken(): string | null {
    const now = Date.now();
    // 1. Check OAuth token
    if (this.inMemoryToken && this.inMemoryToken.accessToken) {
      // Allow 60s buffer before expiration
      if (this.inMemoryToken.expiresAt > now + 60000) {
        return this.inMemoryToken.accessToken;
      }
    }

    // 2. Fallback to manual token from config if provided
    const config = getLinkedInConfig();
    if (config.manualAccessToken) {
      return config.manualAccessToken;
    }

    return null;
  }

  /**
   * Check if token is valid without revealing it
   */
  public hasValidToken(): boolean {
    return Boolean(this.getAccessToken());
  }

  /**
   * Get metadata about token expiration (safe to expose, no secrets)
   */
  public getTokenMeta(): { hasToken: boolean; expiresAt: number | null; scope?: string } {
    const hasToken = this.hasValidToken();
    if (this.inMemoryToken) {
      return {
        hasToken,
        expiresAt: this.inMemoryToken.expiresAt,
        scope: this.inMemoryToken.scope,
      };
    }
    const config = getLinkedInConfig();
    if (config.manualAccessToken) {
      return {
        hasToken: true,
        expiresAt: null, // manual token expiration unknown
        scope: 'env_provided',
      };
    }
    return {
      hasToken: false,
      expiresAt: null,
    };
  }

  /**
   * Record that an authenticated LinkedIn API request succeeded with the current token.
   */
  public markVerified(): void {
    const now = Date.now();
    if (this.inMemoryToken && this.inMemoryToken.expiresAt > now + 60000) {
      this.inMemoryToken.verifiedAt = now;
      this.persistTokenToDisk();
    } else if (getLinkedInConfig().manualAccessToken) {
      this.manualTokenVerifiedAt = now;
    }
  }

  /**
   * True only if the token currently in use has been proven against the LinkedIn API.
   */
  public isVerified(): boolean {
    const now = Date.now();
    if (this.inMemoryToken && this.inMemoryToken.expiresAt > now + 60000) {
      return Boolean(this.inMemoryToken.verifiedAt);
    }
    return Boolean(getLinkedInConfig().manualAccessToken && this.manualTokenVerifiedAt);
  }

  public clearToken(): void {
    this.inMemoryToken = null;
    this.manualTokenVerifiedAt = null;
    this.persistTokenToDisk();
  }

  // --- CSRF State Management for OAuth flow ---

  public createCsrfState(): string {
    // Clean up expired states
    const now = Date.now();
    for (const [state, expiresAt] of this.activeCsrfStates.entries()) {
      if (expiresAt < now) {
        this.activeCsrfStates.delete(state);
      }
    }

    const state = crypto.randomBytes(32).toString('hex');
    const ttlMs = 10 * 60 * 1000; // 10 minutes
    this.activeCsrfStates.set(state, now + ttlMs);
    return state;
  }

  public verifyAndConsumeCsrfState(state: string): boolean {
    if (!state) return false;
    const expiresAt = this.activeCsrfStates.get(state);
    if (!expiresAt) return false;

    this.activeCsrfStates.delete(state);
    return expiresAt > Date.now();
  }
}

export const tokenStore = new LinkedInTokenStore();
