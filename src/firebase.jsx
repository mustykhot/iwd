// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYCAb2_HFzNqH7_g4xjAElhOm32Rkd2KE",
  authDomain: "arupiwd.firebaseapp.com",
  projectId: "arupiwd",
  storageBucket: "arupiwd.appspot.com",
  messagingSenderId: "169946136067",
  appId: "1:169946136067:web:4de0c19bca13712a4dd836",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
