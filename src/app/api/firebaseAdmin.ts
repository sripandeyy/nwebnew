import admin from 'firebase-admin';

// Initialize Firebase Admin dynamically from environment variables
function getFirebaseCredentials(): admin.ServiceAccount | null {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON || process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;

  try {
    let jsonStr = raw.trim();
    if (!jsonStr.startsWith('{')) {
      try {
        const decoded = Buffer.from(jsonStr, 'base64').toString('utf8');
        if (decoded.trim().startsWith('{')) {
          jsonStr = decoded.trim();
        }
      } catch {
        // use raw
      }
    }
    const parsed = JSON.parse(jsonStr);
    if (parsed.private_key) {
      parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');
    }
    return parsed as admin.ServiceAccount;
  } catch (err) {
    console.warn('[FirebaseAdmin] Failed to parse credentials from env:', (err as Error).message);
    return null;
  }
}

if (!admin.apps.length) {
  const creds = getFirebaseCredentials();
  if (creds) {
    admin.initializeApp({
      credential: admin.credential.cert(creds),
    });
  } else {
    // Initialize with default or mock if unconfigured to prevent build/startup crashes
    try {
      admin.initializeApp();
    } catch {
      // Ignored if project ID is not set in environment
    }
  }
}

let db: any = null;
let auth: any = null;

try {
  if (admin.apps.length) {
    db = admin.firestore();
    auth = admin.auth();
  }
} catch {
  // Graceful fallback if firestore is not initialized
}

export { admin, db, auth };
