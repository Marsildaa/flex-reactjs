import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdiwtfFjYITECa9T6pbnZemansYpB-_5A",
  authDomain: "flextest-a8af8.firebaseapp.com",
  projectId: "flextest-a8af8",
  storageBucket: "flextest-a8af8.appspot.com",
  messagingSenderId: "975871404281",
  appId: "1:975871404281:web:8ce426f4f7d9a3babf5a28",
  measurementId: "G-XJKBLRB2YT",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
