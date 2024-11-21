// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// donot share config
const firebaseConfig = {
  apiKey: "AIzaSyC-LLIGy8c8v5DsFhqS1GjRZu_n0eXvAok",
  authDomain: "email-password-auth-f1d8e.firebaseapp.com",
  projectId: "email-password-auth-f1d8e",
  storageBucket: "email-password-auth-f1d8e.firebasestorage.app",
  messagingSenderId: "972607652637",
  appId: "1:972607652637:web:5d15c02647df20a4cc97f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);