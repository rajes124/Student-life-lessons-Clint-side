// src/utils/requireAuth.js

import { redirect } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export const requireAuth = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (!user) {
        reject(redirect("/login"));
      } else {
        resolve(null);
      }
    });
  });
};