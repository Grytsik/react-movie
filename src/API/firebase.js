// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyAzSQLvXZbA3BWll-ZcxVNcOYOikmfwWUU",
  authDomain: "movielogin-78113.firebaseapp.com",
  projectId: "movielogin-78113",
  storageBucket: "movielogin-78113.appspot.com",
  messagingSenderId: "768972692452",
  appId: "1:768972692452:web:7526b64ce6102c821005f1",
  measurementId: "G-J99H28WY85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);