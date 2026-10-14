// Must be the first import in every LinkedIn test file: the token/posts stores are created
// at import time, and tests must never read or wipe the real .cache/ token.
import fs from 'fs';
import os from 'os';
import path from 'path';

process.env.LINKEDIN_CACHE_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'nyeras-linkedin-test-'));

for (const key of [
  'LINKEDIN_CLIENT_ID',
  'LINKEDIN_CLIENT_SECRET',
  'LINKEDIN_ORG_ID',
  'LINKEDIN_ACCESS_TOKEN',
  'LINKEDIN_ADMIN_KEY',
  'LINKEDIN_API_VERSION',
  'LINKEDIN_SYNC_CRON',
]) {
  process.env[key] = '';
}
process.env.FRONTEND_URL = 'http://localhost:3000';
