// src/firebase/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // এটা যোগ করো

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCvV_JFOIPC8Oq5ojELsMsD0jgDf2LwP0g",
  authDomain: "student-life-lessons.firebaseapp.com",
  projectId: "student-life-lessons",
  storageBucket: "student-life-lessons.appspot.com",
  messagingSenderId: "597037631212",
  appId: "1:597037631212:web:924f39edb7fd52088bc7c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Google Provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// 🔥 এখানে যোগ করো 🔥
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Optional scopes
googleProvider.addScope('profile');
googleProvider.addScope('email');

const db = getFirestore(app);

export { auth, googleProvider, db };