// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg_drPWg2MX_1En8hQ5jwCXsG1DLJvvvE",
  authDomain: "cinevault-d8f70.firebaseapp.com",
  projectId: "cinevault-d8f70",
  storageBucket: "cinevault-d8f70.firebasestorage.app",
  messagingSenderId: "661673654147",
  appId: "1:661673654147:web:91c8653ffd23218b2728b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)