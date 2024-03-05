import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD_JpAmxoZb98oLHtIm2WPFehParBl9Agc",
  authDomain: "domino-8fc0c.firebaseapp.com",
  databaseURL:
    "https://domino-8fc0c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "domino-8fc0c",
  storageBucket: "domino-8fc0c.appspot.com",
  messagingSenderId: "661936121959",
  appId: "1:661936121959:web:f7eac8b29b803d13214cc2",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const Provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export { signInWithPopup, signOut };
