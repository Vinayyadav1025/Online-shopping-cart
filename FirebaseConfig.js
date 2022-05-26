// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBU48drDlh1D3kgahUPJqHeo-ijvRzqItQ",
  authDomain: "our-card-47ab2.firebaseapp.com",
  databaseURL: "https://our-card-47ab2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "our-card-47ab2",
  storageBucket: "our-card-47ab2.appspot.com",
  messagingSenderId: "834367122000",
  appId: "1:834367122000:web:613c8bb2160c8708733f55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getDatabase(app);
export const auth=getAuth();
