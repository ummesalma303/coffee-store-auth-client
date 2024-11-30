// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbqJrctV5vSeYqkAsJdATg5R5R8ZbGBvY",
  authDomain: "coffee-master-4820f.firebaseapp.com",
  projectId: "coffee-master-4820f",
  storageBucket: "coffee-master-4820f.firebasestorage.app",
  messagingSenderId: "1048030454637",
  appId: "1:1048030454637:web:f6e0aa0311dfef8275b064"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth