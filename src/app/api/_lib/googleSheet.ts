import { GoogleAuth } from 'google-auth-library';

export interface CallbackLeadData {
  name: string;
  email: string;
  phone: string;
  program?: string;
  course?: string;
  timestamp?: string;
  date?: string;
  source?: string;
  notes?: string;
}

const DEFAULT_SPREADSHEET_ID = '1j29qQWzQchQA1pFu66A7WbSs8LnvHVn1Yr4aCzXyMaE';

/**
 * Parses Google Service Account credentials from environment variables.
 * Supports:
 *  1. GOOGLE_SERVICE_ACCOUNT_JSON (raw JSON string or base64-encoded JSON)
 *  2. Individual GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY
 */
function getServiceAccountCredentials(): { client_email: string; private_key: string } | null {
  const rawJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
  if (rawJson) {
    try {
      let jsonString = rawJson;
      // If it doesn't start with '{', test if it is base64 encoded
      if (!rawJson.startsWith('{')) {
        try {
          const decoded = Buffer.from(rawJson, 'base64').toString('utf8');
          if (decoded.trim().startsWith('{')) {
            jsonString = decoded.trim();
          }
        } catch {
          // Keep rawJson as-is
        }
      }

      const parsed = JSON.parse(jsonString);
      if (parsed.client_email && parsed.private_key) {
        return {
          client_email: parsed.client_email,
          private_key: parsed.private_key.replace(/\\n/g, '\n'),
        };
      }
    } catch (parseErr) {
      console.warn('[GoogleSheet] Could not parse GOOGLE_SERVICE_ACCOUNT_JSON:', (parseErr as Error).message);
    }
  }

  // Fallback to separate env variables if set
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const rawKey = process.env.GOOGLE_PRIVATE_KEY?.trim();
  if (email && rawKey) {
    return {
      client_email: email,
      private_key: rawKey.replace(/\\n/g, '\n'),
    };
  }

  return null;
}

/**
 * Appends callback lead data directly to the Google Spreadsheet.
 * Guaranteed to never throw; a failure in Google Sheets will never block
 * database insertion or email sending.
 */
export async function appendCallbackToGoogleSheet(
  lead: CallbackLeadData
): Promise<{ success: boolean; method?: string; error?: string }> {
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID?.trim() || DEFAULT_SPREADSHEET_ID;
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();

  const now = new Date();
  const timestamp = lead.timestamp || now.toISOString();
  const date = lead.date || now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const program = lead.program || lead.course || 'Not Specified';
  const source = lead.source || 'Website Request Callback';

  const payload = {
    timestamp,
    date,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    program,
    source,
    notes: lead.notes || '',
    spreadsheetId,
  };

  // --- Method 1: Google Sheets API v4 using Service Account (No disk read) ---
  const creds = getServiceAccountCredentials();
  if (creds) {
    try {
      const auth = new GoogleAuth({
        credentials: {
          client_email: creds.client_email,
          private_key: creds.private_key,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const client = await auth.getClient();
      const tokenResponse = await client.getAccessToken();
      const accessToken = tokenResponse?.token;

      if (accessToken) {
        const rowValues = [
          timestamp,
          date,
          lead.name,
          lead.email,
          lead.phone,
          program,
          source,
          lead.notes || '',
        ];

        const sheetsApiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A:H:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
        const apiRes = await fetch(sheetsApiUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            range: 'A:H',
            majorDimension: 'ROWS',
            values: [rowValues],
          }),
          signal: AbortSignal.timeout(8000),
        });

        if (apiRes.ok) {
          console.log(`[GoogleSheet] Lead for "${lead.name}" appended via Google Sheets API v4.`);
          return { success: true, method: 'sheets_api' };
        } else {
          const apiErr = await apiRes.json().catch(() => null);
          const errMsg = apiErr?.error?.message || apiRes.statusText;
          console.warn(`[GoogleSheet] Sheets API returned HTTP ${apiRes.status}:`, errMsg);
        }
      }
    } catch (apiErr: any) {
      console.warn('[GoogleSheet] Sheets API direct sync encountered an issue:', apiErr?.message || apiErr);
    }
  }

  // --- Method 2: Google Apps Script Webhook Fallback ---
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        redirect: 'follow',
        signal: AbortSignal.timeout(10000),
      });

      if (response.ok) {
        console.log(`[GoogleSheet] Lead for "${lead.name}" appended via Apps Script Webhook.`);
        return { success: true, method: 'webhook' };
      } else {
        const errorText = await response.text().catch(() => '');
        console.warn(`[GoogleSheet] Webhook returned HTTP ${response.status}:`, errorText.slice(0, 200));
      }
    } catch (webhookErr) {
      console.warn('[GoogleSheet] Webhook call failed:', (webhookErr as Error).message);
    }
  }

  return { success: false, error: 'Google Sheets sync failed or credentials not configured.' };
}
