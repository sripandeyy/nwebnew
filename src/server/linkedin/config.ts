import dotenv from 'dotenv';
import path from 'path';

// Ensure environment variables are loaded
dotenv.config();

// Latest LinkedIn Marketing API version at time of writing (Sept 2026, supported until Sept 2027).
// LinkedIn sunsets each monthly version ~12 months after release; bump this when it nears sunset.
export const DEFAULT_LINKEDIN_API_VERSION = '202609';

export interface ResolvedLinkedInConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
  apiVersion: string;
  orgId: string;
  orgUrn: string;
  syncIntervalMs: number;
  syncCron?: string;
  port: number;
  frontendUrl: string;
  allowedOrigins: string[];
  adminKey?: string;
  cacheDir: string;
  manualAccessToken?: string;
}

export function getLinkedInConfig(): ResolvedLinkedInConfig {
  const clientId = (process.env.LINKEDIN_CLIENT_ID || '').trim();
  const clientSecret = (process.env.LINKEDIN_CLIENT_SECRET || '').trim();
  const rawOrgId = (process.env.LINKEDIN_ORG_ID || '').trim();
  
  // Format org URN properly
  let orgId = rawOrgId;
  let orgUrn = '';
  if (rawOrgId) {
    if (rawOrgId.startsWith('urn:li:organization:')) {
      orgUrn = rawOrgId;
      orgId = rawOrgId.replace('urn:li:organization:', '');
    } else {
      orgUrn = `urn:li:organization:${rawOrgId}`;
    }
  }

  const port = parseInt(process.env.PORT || '5001', 10);
  const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:3000').trim().replace(/\/$/, '');

  // Origins allowed for CORS / Socket.IO. FRONTEND_URL plus any extra comma-separated origins.
  const allowedOrigins = Array.from(
    new Set(
      [frontendUrl, ...(process.env.CORS_ALLOWED_ORIGINS || '').split(',')]
        .map((o) => o.trim().replace(/\/$/, ''))
        .filter(Boolean)
    )
  );
  
  // Default redirect URI: prioritize explicit env var, fallback to /api/linkedin/callback
  const redirectUri = (process.env.LINKEDIN_REDIRECT_URI || `http://localhost:${port}/api/linkedin/callback`).trim();

  // LinkedIn-Version header must be YYYYMM; fall back to the default on malformed input
  const rawVersion = (process.env.LINKEDIN_API_VERSION || '').trim();
  const apiVersion = /^\d{6}$/.test(rawVersion) ? rawVersion : DEFAULT_LINKEDIN_API_VERSION;

  // Scopes: default to r_organization_social
  const scopesStr = (process.env.LINKEDIN_SCOPES || 'r_organization_social').trim();
  const scopes = scopesStr.split(/[,\s]+/).filter(Boolean);

  // Sync interval: default to 5 minutes (300,000 ms), minimum 30 seconds
  const rawInterval = parseInt(process.env.LINKEDIN_SYNC_INTERVAL_MS || '300000', 10);
  const syncIntervalMs = isNaN(rawInterval) || rawInterval < 30000 ? 300000 : rawInterval;

  const syncCron = process.env.LINKEDIN_SYNC_CRON ? process.env.LINKEDIN_SYNC_CRON.trim() : undefined;

  const adminKey = (process.env.LINKEDIN_ADMIN_KEY || '').trim() || undefined;

  const cacheDir = path.resolve(process.env.LINKEDIN_CACHE_DIR || path.join(process.cwd(), '.cache'));

  // Optional manual access token from env for convenience/migration
  const manualAccessToken = (process.env.LINKEDIN_ACCESS_TOKEN || '').trim() || undefined;

  return {
    clientId,
    clientSecret,
    redirectUri,
    scopes,
    apiVersion,
    orgId,
    orgUrn,
    syncIntervalMs,
    syncCron,
    port,
    frontendUrl,
    allowedOrigins,
    adminKey,
    cacheDir,
    manualAccessToken,
  };
}

/**
 * Check if required credentials and parameters are configured.
 * Do not consider placeholder values as configured.
 */
export function isLinkedInConfigured(): boolean {
  const config = getLinkedInConfig();
  const isPlaceholder = (val: string) =>
    !val ||
    val.includes('your_') ||
    val.includes('YOUR_') ||
    val.includes('nyeras_placeholder');

  return (
    Boolean(config.clientId) &&
    !isPlaceholder(config.clientId) &&
    Boolean(config.clientSecret) &&
    !isPlaceholder(config.clientSecret) &&
    Boolean(config.orgId) &&
    !isPlaceholder(config.orgId)
  );
}
