// src/contexts/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import api from "../utils/api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null); // MongoDB user
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        try {
          // 🔹 Step 1: Try load user
          const res = await api.get(`/users/${user.uid}`);
          setUserData(res.data);
        } catch (error) {
          if (error.response?.status === 404) {
            // 🔹 Step 2: User not found → create
            try {
              await api.post("/users/create", {
  firebaseUid: user.uid,
  name: user.displayName || "User",
  email: user.email,
  photoURL: user.photoURL || null,
});


              // 🔹 Step 3: Reload user after create
              const res = await api.get(`/users/${user.uid}`);
              setUserData(res.data);
            } catch (createError) {
              console.error("Create user failed:", createError);
              toast.error("Failed to create user profile");
            }
          } else {
            console.error("Load user failed:", error);
            toast.error("Failed to load user profile");
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

  /* =========================
     Profile Update (Firebase + MongoDB)
     ========================= */
  const updateUserProfile = async (displayName, photoURL) => {
    if (!currentUser) throw new Error("No user logged in");

    // Firebase update
    await updateProfile(currentUser, {
      displayName,
      photoURL: photoURL || null,
    });

    // MongoDB update
    await api.put(`/users/${currentUser.uid}`, {
      name: displayName,
      photoURL: photoURL || null,
    });

    // Local state sync
    setCurrentUser({ ...currentUser, displayName, photoURL });
    setUserData((prev) => ({
      ...prev,
      name: displayName,
      photoURL,
    }));
  };

  const value = {
    currentUser,
    userData,
    loading,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl font-semibold text-indigo-700">
              Loading Student Life Lessons...
            </p>
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
