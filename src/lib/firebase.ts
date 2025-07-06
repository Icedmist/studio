// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB03DllfRq_EVM3Y1BHyZBdal-jHF6oGZM",
  authDomain: "tech-trade-hub-academy.firebaseapp.com",
  projectId: "tech-trade-hub-academy",
  storageBucket: "tech-trade-hub-academy.firebasestorage.app",
  messagingSenderId: "537073268634",
  appId: "1:537073268634:web:149f89c584bc9716692c23",
  measurementId: "G-LFC1LT8647"
};

// Initialize Firebase
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { app, auth, db };
