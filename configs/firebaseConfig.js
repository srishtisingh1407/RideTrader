// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "carmarket-246bd.firebaseapp.com",
  projectId: "carmarket-246bd",
  storageBucket: "carmarket-246bd.appspot.com",
  messagingSenderId: "206001603534",
  appId: "1:206001603534:web:8eefc321dfd6c65b44219f",
  measurementId: "G-37XV84PY4H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)
// const analytics = getAnalytics(app);