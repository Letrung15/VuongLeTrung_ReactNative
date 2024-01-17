// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiU9kWFHRnTNjgxaP0wCZeFW52FxbThZo",
  authDomain: "fashion-f75be.firebaseapp.com",
  projectId: "fashion-f75be",
  storageBucket: "fashion-f75be.appspot.com",
  messagingSenderId: "110783173896",
  appId: "1:110783173896:web:d6b2f6c732df235d68c8bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
export {auth,db}