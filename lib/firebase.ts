// Firebase configuration and initialization
import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics, Analytics, logEvent as firebaseLogEvent, isSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

let analytics: Analytics | null = null;

// Initialize Analytics only on client-side
export const initAnalytics = async () => {
  if (typeof window !== 'undefined' && !analytics) {
    const supported = await isSupported();
    if (supported) {
      analytics = getAnalytics(app);
    }
  }
  return analytics;
};

// Custom event logging wrapper
export const logEvent = (eventName: string, eventParams?: { [key: string]: any }) => {
  if (analytics) {
    firebaseLogEvent(analytics, eventName, eventParams);
  }
};

// Page view tracking
export const logPageView = (pagePath: string, pageTitle: string) => {
  logEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  });
};

// Button click tracking
export const logButtonClick = (buttonName: string, location?: string) => {
  logEvent('button_click', {
    button_name: buttonName,
    location: location || 'unknown',
  });
};

// Custom conversion events
export const logConversion = (conversionType: string, value?: number) => {
  logEvent('conversion', {
    conversion_type: conversionType,
    value: value || 0,
  });
};

// Initialize Firebase Auth
export const auth = getAuth(app);

export { analytics, app };
