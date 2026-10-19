import { GoogleAuth } from 'google-auth-library';
import fs from 'fs';
import path from 'path';

let serviceAccount: any = null;
try {
  const serviceJsonPath = path.join(process.cwd(), 'src/app/api/Service.json');
  if (fs.existsSync(serviceJsonPath)) {
    serviceAccount = JSON.parse(fs.readFileSync(serviceJsonPath, 'utf8'));
  }
} catch {
  // Service.json is optional when GOOGLE_SHEETS_WEBHOOK_URL is configured
}

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
 * Sends callback lead data directly to the Google Spreadsheet.
 * Supports both:
 *  1. Google Apps Script Web App Webhook (via GOOGLE_SHEETS_WEBHOOK_URL in .env)
 *  2. Google Sheets API v4 using Service Account (Service.json)
 */
export async function appendCallbackToGoogleSheet(lead: CallbackLeadData): Promise<{ success: boolean; method?: string; error?: string }> {
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID || DEFAULT_SPREADSHEET_ID;
  
  // Resolve Webhook URL from process.env or fallback to direct .env read if needed
  let webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    try {
      const envPath = path.join(process.cwd(), '.env');
      if (fs.existsSync(envPath)) {
        const envText = fs.readFileSync(envPath, 'utf8');
        const match = envText.match(/GOOGLE_SHEETS_WEBHOOK_URL=["']?([^"'\r\n]+)["']?/);
        if (match) webhookUrl = match[1].trim();
      }
    } catch {
      // Ignore env read error
    }
  }

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

  // 1. Try Google Apps Script Webhook if configured (primary reliable method)
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        redirect: 'follow',
        signal: AbortSignal.timeout(15000),
      });

      if (response.ok) {
        console.log(`[GoogleSheet] Successfully appended callback lead for "${lead.name}" via Webhook.`);
        return { success: true, method: 'webhook' };
      } else {
        const errorText = await response.text().catch(() => '');
        console.warn(`[GoogleSheet] Webhook returned status ${response.status}: ${errorText}`);
      }
    } catch (webhookErr) {
      console.warn('[GoogleSheet] Error calling Google Sheets webhook:', webhookErr);
    }
  }

  // 2. Try Google Sheets API v4 via Service Account
  try {
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || serviceAccount.client_email;
    const privateKey = (process.env.GOOGLE_PRIVATE_KEY || serviceAccount.private_key)?.replace(/\\n/g, '\n');

    if (!clientEmail || !privateKey) {
      throw new Error('Google Service Account credentials missing.');
    }

    const auth = new GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = await auth.getClient();
    const tokenResponse = await client.getAccessToken();
    const accessToken = tokenResponse?.token;

    if (!accessToken) {
      throw new Error('Failed to retrieve access token from GoogleAuth.');
    }

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
      console.log(`[GoogleSheet] Successfully appended callback lead for "${lead.name}" via Google Sheets API.`);
      return { success: true, method: 'sheets_api' };
    }

    const apiErr = await apiRes.json().catch(() => null);
    const errMsg = apiErr?.error?.message || apiRes.statusText;
    console.warn(`[GoogleSheet] Sheets API returned ${apiRes.status}:`, errMsg);
    return { success: false, method: 'sheets_api', error: errMsg };
  } catch (apiErr: any) {
    const msg = apiErr?.message || String(apiErr);
    console.warn('[GoogleSheet] Google Sheets direct API sync encountered an issue:', msg);
    return { success: false, error: msg };
  }
}
