import { redirect } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export const requireAuth = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();

      if (!user) {
        resolve(redirect("/login"));
      } else {
        resolve(null);
      }
    });
  });
};
