import * as admin from "firebase-admin";

export function getFirebaseAdminApp(): admin.app.App {
  const existingApp = admin.apps[0];
  if (existingApp) {
    return existingApp;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Firebase Admin SDK environment variables not set: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY"
    );
  }

  return admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

export function getFirestoreDb() {
  const app = getFirebaseAdminApp();
  return admin.firestore(app);
}

export function getAdminStorage() {
  const app = getFirebaseAdminApp();
  return admin.storage(app);
}

export function getAdminAuth() {
  const app = getFirebaseAdminApp();
  return admin.auth(app);
}
