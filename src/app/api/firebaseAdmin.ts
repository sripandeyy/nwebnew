import admin from 'firebase-admin';
import serviceAccount from './Service.json'; 
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount), 
    // databaseURL: 'https://your-database-url.firebaseio.com' // Uncomment if using Realtime Database
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { admin, db, auth };
