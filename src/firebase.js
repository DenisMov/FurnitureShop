import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1LbzHSLwHP1f-cYNI9FTPYxc1l8KHkpg",
  authDomain: "authavion.firebaseapp.com",
  projectId: "authavion",
  storageBucket: "authavion.firebasestorage.app",
  messagingSenderId: "541141432583",
  appId: "1:541141432583:web:13c49ecfab654cd1c32da2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Додано auth для експорту
export const googleAuthProvider = new GoogleAuthProvider();
