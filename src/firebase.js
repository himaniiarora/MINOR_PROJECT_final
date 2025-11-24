// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-XC3Bwbzj3_q0LPPWozApbX_09LCjoBw",
  authDomain: "levelup-9104f.firebaseapp.com",
  projectId: "levelup-9104f",
  storageBucket: "levelup-9104f.firebasestorage.app",
  messagingSenderId: "603205029598",
  appId: "1:603205029598:web:fc4512783bdc7f548c7c4f",
  measurementId: "G-9XRC1VT1FG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);