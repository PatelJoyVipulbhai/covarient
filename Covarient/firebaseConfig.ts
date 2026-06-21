import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArLSp_cLsp2OP2y4v34NSFzi8RSZbkGKg",
  authDomain: "covarient.firebaseapp.com",
  projectId: "covarient",
  storageBucket: "covarient.firebasestorage.app",
  messagingSenderId: "521744582788",
  appId: "1:521744582788:web:125d164001c0a815f1dad1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
