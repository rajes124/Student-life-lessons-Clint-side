// src/contexts/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  updateProfile, // profile update-এর জন্য
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import api from "../utils/api"; // তোমার axios wrapper
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null); // MongoDB থেকে { role, isPremium, name, photoURL }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    setCurrentUser(user);

    if (user) {
      try {
        // প্রথমে user data load করার চেষ্টা করো
        const res = await api.get(`/users/${user.uid}`);
        setUserData(res.data);
      } catch (error) {
        if (error.response?.status === 404) {
          // User not found → create new user
          try {
         await api.post("/users/create", { // /api/users/create হবে
  firebaseUid: user.uid,
  name: user.displayName || "User",
  email: user.email,
  photoURL: user.photoURL || null,
});
            // Create করার পর আবার load করো
            const res = await api.get(`/users/${user.uid}`);
            setUserData(res.data);
          } catch (createError) {
            console.error("Failed to create user:", createError);
            toast.error("Failed to create profile");
          }
        } else {
          console.error("Failed to load user data:", error);
          toast.error("Failed to load profile data");
        }
      } finally {
        setLoading(false);
      }
    } else {
      setUserData(null);
      setLoading(false);
    }
  });

  return () => unsubscribe();
}, []);
  // Profile update function (Firebase Auth + MongoDB sync)
  const updateUserProfile = async (displayName, photoURL) => {
    if (!currentUser) throw new Error("No user logged in");

    // Firebase Auth update
    await updateProfile(currentUser, {
      displayName,
      photoURL: photoURL || null,
    });

    // MongoDB-এ update
    try {
      await api.put(`/users/${currentUser.uid}`, {
        name: displayName,
        photoURL: photoURL || null,
      });

      // Local state update
      setCurrentUser({ ...currentUser, displayName, photoURL });
      setUserData({ ...userData, name: displayName, photoURL });
    } catch (error) {
      console.error("MongoDB profile update failed:", error);
      throw error;
    }
  };

  const value = {
    currentUser,
    userData, // MongoDB থেকে role, isPremium
    loading,
    updateUserProfile, // profile update function
  };

  return (
    <AuthContext.Provider value={value}>
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