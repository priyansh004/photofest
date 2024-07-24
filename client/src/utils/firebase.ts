import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_apiKey,
    authDomain: import.meta.env.VITE_API_authDomain,
    projectId: import.meta.env.VITE_API_projectId,
    storageBucket: import.meta.env.VITE_API_storageBucket,
    messagingSenderId: import.meta.env.VITE_API_messagingSenderId,
    appId: import.meta.env.VITE_API_appId,
    measurementId: import.meta.env.VITE_API_measurementId
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();