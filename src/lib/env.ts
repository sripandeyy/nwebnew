// src/lib/env.ts
// Validates presence of core environment variables without ever logging secret values.

interface EnvCheckResult {
  valid: boolean;
  missingRequired: string[];
  missingOptional: string[];
}

export function validateEnv(): EnvCheckResult {
  // Required for primary production functions (Database, Mail, Admin)
  const required = [
    'MYSQL_HOST',
    'MYSQL_USER',
    'MYSQL_PASSWORD',
    'MYSQL_DATABASE',
    'SMTP_HOST',
    'SMTP_USER',
    'SMTP_PASS',
    'ADMIN_USERNAME',
    'ADMIN_PASSWORD',
    'ADMIN_SESSION_SECRET',
  ];

  // Optional or feature-specific (Google Sheets, Blob, LinkedIn)
  const optional = [
    'GOOGLE_SPREADSHEET_ID',
    'GOOGLE_SHEETS_WEBHOOK_URL',
    'GOOGLE_SERVICE_ACCOUNT_JSON',
    'BLOB_READ_WRITE_TOKEN',
    'LINKEDIN_CLIENT_ID',
    'LINKEDIN_CLIENT_SECRET',
    'CRON_SECRET',
  ];

  const missingRequired = required.filter((key) => !process.env[key] || process.env[key]?.trim() === '');
  const missingOptional = optional.filter((key) => !process.env[key] || process.env[key]?.trim() === '');

  if (missingRequired.length > 0) {
    console.warn(`[Nyeras Env Warning] Missing required production variables: ${missingRequired.join(', ')}`);
  } else {
    console.log('[Nyeras Env] All core production environment variables are configured.');
  }

  if (missingOptional.length > 0) {
    console.log(`[Nyeras Env Info] Optional feature variables not configured: ${missingOptional.join(', ')}`);
  }

  return {
    valid: missingRequired.length === 0,
    missingRequired,
    missingOptional,
  };
}
