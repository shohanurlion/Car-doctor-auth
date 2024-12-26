// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgJSawitznn6XDsfqAyju16KMuMSS8EX8",
  authDomain: "my-react-project-ac44e.firebaseapp.com",
  projectId: "my-react-project-ac44e",
  storageBucket: "my-react-project-ac44e.firebasestorage.app",
  messagingSenderId: "746293669086",
  appId: "1:746293669086:web:670bf18d5094f4d50d664f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);