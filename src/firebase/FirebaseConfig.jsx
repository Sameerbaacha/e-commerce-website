import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBm4Aei_P-WZS1fiHwlKD2AvHjawWELXyM",
    authDomain: "ecommerce-app2k24.firebaseapp.com",
    projectId: "ecommerce-app2k24",
    storageBucket: "ecommerce-app2k24.appspot.com",
    messagingSenderId: "740928581226",
    appId: "1:740928581226:web:3c182b01254084f9f3a413"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const fireDB = getFirestore(app);
const auth = getAuth(app);
export { auth, fireDB }