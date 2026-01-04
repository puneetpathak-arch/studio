// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCGmsGTSkJsLrQdNZ4r7k5Rwbs7GOJL3TA",
  authDomain: "edufinance-8cfcc.firebaseapp.com",
  projectId: "edufinance-8cfcc",
  storageBucket: "edufinance-8cfcc.firebasestorage.app",
  messagingSenderId: "472942658146",
  appId: "1:472942658146:web:957e9fa5a38d97f24c473b",
  measurementId: "G-V68TG3VCQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
