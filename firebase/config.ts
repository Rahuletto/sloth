import { initializeApp, getApps } from "firebase/app";
import { CACHE_SIZE_UNLIMITED, FirestoreSettings, initializeFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getInstallations } from "firebase/installations";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const firestoreSettings: FirestoreSettings & { useFetchStreams: boolean} ={
  useFetchStreams: false,
  experimentalForceLongPolling: true,
  localCache: {
    kind: 'persistent'
  },
}

let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const analytics =
  firebase_app.name && typeof window !== "undefined"
    ? getAnalytics(firebase_app)
    : null;
export const auth = getAuth(firebase_app);
export const db = initializeFirestore(firebase_app, firestoreSettings)

export const installations = getInstallations(firebase_app);
export const storage = getStorage(firebase_app);
export default firebase_app;

