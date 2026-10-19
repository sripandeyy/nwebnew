// Must be the first import in every LinkedIn test file so real .env credentials never leak into tests.
for (const key of [
  'LINKEDIN_CLIENT_ID',
  'LINKEDIN_CLIENT_SECRET',
  'LINKEDIN_ORG_ID',
  'LINKEDIN_ACCESS_TOKEN',
  'LINKEDIN_ADMIN_KEY',
  'LINKEDIN_API_VERSION',
  'LINKEDIN_REDIRECT_URI',
  'LINKEDIN_SCOPES',
  'LINKEDIN_SYNC_INTERVAL_MS',
]) {
  process.env[key] = '';
}
