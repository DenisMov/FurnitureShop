import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "myprojectauth-16e6d.firebaseapp.com",
  projectId: "myprojectauth-16e6d",
  storageBucket: "myprojectauth-16e6d.firebasestorage.app",
  messagingSenderId: "761524286913",
  appId: "1:761524286913:web:a55c1bba5b2f4e7032ab40",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
