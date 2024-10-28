import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAagehqY9nd1ZJkMUpgyEocSCIyB20hG-0",
    authDomain: "e-commerce-2k25.firebaseapp.com",
    projectId: "e-commerce-2k25",
    storageBucket: "e-commerce-2k25.appspot.com",
    messagingSenderId: "823640120286",
    appId: "1:823640120286:web:b557d338831810ea525b4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const fireDB = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);
export { auth, fireDB, googleProvider }