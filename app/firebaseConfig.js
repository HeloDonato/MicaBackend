// Import the functions you need from the SDKs you need
import Firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAAfAWVfTf6UamoPVkp-1DNaXNa6ZsfI8",
  authDomain: "mica2021.firebaseapp.com",
  projectId: "mica2021",
  storageBucket: "mica2021.appspot.com",
  messagingSenderId: "1054449588479",
  appId: "1:1054449588479:web:9583c8b3fecacc7e5994ca"
};

// Initialize Firebase
const app = Firebase.initializeApp(firebaseConfig);

export const db = app.database();
export const auth = app.auth();