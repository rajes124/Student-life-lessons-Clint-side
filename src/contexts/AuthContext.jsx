// src/contexts/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"; // নিশ্চিত করো db export করা আছে

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null); // { role: "admin"/"user", isPremium: true/false }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user) {
        // Firestore থেকে real-time user data নিয়ে আসো
        const userDocRef = doc(db, "users", user.uid);

        const unsubDoc = onSnapshot(
          userDocRef,
          (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              setUserData(data);
              console.log("User data loaded:", data); // debug এর জন্য (পরে মুছে ফেলতে পারো)
            } else {
              setUserData(null);
            }
            setLoading(false);
          },
          (error) => {
            console.error("Firestore snapshot error:", error);
            setLoading(false);
          }
        );

        // cleanup document listener
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
    userData,     // এটা দিয়ে premium badge ও admin role চেক করব
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* loading থাকলে সুন্দর spinner দেখাও */}
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl font-semibold text-indigo-700">Loading Student Life Lessons...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};