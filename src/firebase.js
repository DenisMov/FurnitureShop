import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "authavion.firebaseapp.com",
  projectId: "authavion",
  storageBucket: "authavion.firebasestorage.app",
  messagingSenderId: "541141432583",
  appId: "1:541141432583:web:13c49ecfab654cd1c32da2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
