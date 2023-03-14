// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY ,
  authDomain: "accountingapp-3e38e.firebaseapp.com",
  projectId: "accountingapp-3e38e",
  storageBucket: "accountingapp-3e38e.appspot.com",
  messagingSenderId: "481146034296",
  appId: "1:481146034296:web:cf270d1dca15e5cb03758d",
  measurementId: "G-HZ5ZY20DE4",
};

// Initialize Firebase
cosnt app = !getApps().length ? initializeApp(firebaseConfig): getApp();
const db = gitFirestore();
const storage = getStorage();
export {app, db, storage }; 

