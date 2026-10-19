// Latest LinkedIn Marketing API version at time of writing (Sept 2026, supported until Sept 2027).
// LinkedIn sunsets each monthly version ~12 months after release; bump this when it nears sunset.
export const DEFAULT_LINKEDIN_API_VERSION = '202609';

export const CALLBACK_PATH = '/api/linkedin/callback';

export interface ResolvedLinkedInConfig {
  clientId: string;
  clientSecret: string;
  // Explicit LINKEDIN_REDIRECT_URI; when unset the callback URL is derived from the request origin
  redirectUri?: string;
  scopes: string[];
  apiVersion: string;
  orgId: string;
  orgUrn: string;
  syncIntervalMs: number;
  adminKey?: string;
  manualAccessToken?: string;
}

export function getLinkedInConfig(): ResolvedLinkedInConfig {
  const clientId = (process.env.LINKEDIN_CLIENT_ID || '').trim();
  const clientSecret = (process.env.LINKEDIN_CLIENT_SECRET || '').trim();
  const rawOrgId = (process.env.LINKEDIN_ORG_ID || '').trim();

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

  const redirectUri = (process.env.LINKEDIN_REDIRECT_URI || '').trim() || undefined;

  // LinkedIn-Version header must be YYYYMM; fall back to the default on malformed input
  const rawVersion = (process.env.LINKEDIN_API_VERSION || '').trim();
  const apiVersion = /^\d{6}$/.test(rawVersion) ? rawVersion : DEFAULT_LINKEDIN_API_VERSION;

  const scopesStr = (process.env.LINKEDIN_SCOPES || 'r_organization_social').trim();
  const scopes = scopesStr.split(/[,\s]+/).filter(Boolean);

  // How stale the cached feed may get before a visitor request refreshes it: default 5 minutes, minimum 30 seconds
  const rawInterval = parseInt(process.env.LINKEDIN_SYNC_INTERVAL_MS || '300000', 10);
  const syncIntervalMs = isNaN(rawInterval) || rawInterval < 30000 ? 300000 : rawInterval;

  const adminKey = (process.env.LINKEDIN_ADMIN_KEY || '').trim() || undefined;

  // Optional manual access token from LinkedIn's token generator, used when no OAuth token is stored
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
    adminKey,
    manualAccessToken,
  };
}

/**
 * The redirect URI must be byte-identical in the authorization request and the token exchange,
 * and must be registered in the LinkedIn app's Auth tab.
 */
export function resolveRedirectUri(requestOrigin: string): string {
  return getLinkedInConfig().redirectUri || `${requestOrigin.replace(/\/$/, '')}${CALLBACK_PATH}`;
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
