import fs from 'fs';

// Read .env directly
let webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
if (!webhookUrl && fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8');
  const match = envContent.match(/GOOGLE_SHEETS_WEBHOOK_URL=["']?([^"'\r\n]+)["']?/);
  if (match) webhookUrl = match[1].trim();
}

console.log("Testing Webhook URL:", webhookUrl);

if (!webhookUrl) {
  console.error("GOOGLE_SHEETS_WEBHOOK_URL is missing in .env!");
  process.exit(1);
}

try {
  const payload = {
    timestamp: new Date().toISOString(),
    date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    name: "Test Verification Lead",
    email: "test.lead@nyeras.com",
    phone: "9876543210",
    program: "Full Stack Development",
    source: "Diagnostic Test Script",
    spreadsheetId: "1j29qQWzQchQA1pFu66A7WbSs8LnvHVn1Yr4aCzXyMaE"
  };

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    redirect: "follow",
    signal: AbortSignal.timeout(10000)
  });

  const text = await res.text();
  console.log(`HTTP Status: ${res.status}`);

  if (res.ok && text.includes('"status":"success"')) {
    console.log(" SUCCESS! Data reached your Google Sheet!");
  } else if (res.status === 401 || text.includes("ServiceLogin") || text.includes("accounts.google.com")) {
    console.log(" 401 UNAUTHORIZED: 'Who has access' in Google Apps Script is currently set to 'Only myself'.");
    console.log(" Fix: In Google Apps Script -> Deploy -> Manage deployments -> Edit (pencil) -> Change 'Who has access' to 'Anyone' -> Deploy.");
  } else if (res.status === 404) {
    console.log(" 404 NOT FOUND: The script URL or deployment ID was not found.");
  } else {
    console.log(" Response:", text.slice(0, 300));
  }
} catch (e) {
  console.error("Fetch failed:", e.message);
}
