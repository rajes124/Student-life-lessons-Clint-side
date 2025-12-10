// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import axios from "axios";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        try {
          // MongoDB থেকে isPremium + role নিয়ে আসি
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/users/role/${firebaseUser.email}`
          );
          setIsPremium(res.data.isPremium || false);
        } catch (err) {
          console.log("User not in MongoDB yet");
          setIsPremium(false);
        }
      } else {
        setUser(null);
        setIsPremium(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, isPremium };
};

export default useAuth;