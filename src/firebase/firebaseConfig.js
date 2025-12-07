// Firebase initialization
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvV_JFOIPC8Oq5ojELsMsD0jgDf2LwP0g",
  authDomain: "student-life-lessons.firebaseapp.com",
  projectId: "student-life-lessons",
  storageBucket: "student-life-lessons.appspot.com",
  messagingSenderId: "597037631212",
  appId: "1:597037631212:web:924f39edb7fd52088bc7c9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
