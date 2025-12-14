// src/contexts/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"; // db export করা থাকতে হবে

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null); // role, isPremium ইত্যাদি এখানে থাকবে
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user) {
        // Firestore থেকে real-time user data নিয়ে আসো (role, isPremium ইত্যাদি)
        const userDocRef = doc(db, "users", user.uid);
        const unsubDoc = onSnapshot(
          userDocRef,
          (docSnap) => {
            if (docSnap.exists()) {
              setUserData(docSnap.data());
            } else {
              setUserData(null);
            }
            setLoading(false);
          },
          (error) => {
            console.error("Firestore error:", error);
            setLoading(false);
          }
        );

        // cleanup document snapshot
        return () => unsubDoc();
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    // cleanup auth listener
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    userData,     // { role: "admin" or "user", isPremium: true/false }
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {loading && (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-3xl font-bold text-indigo-600">Loading...</div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};