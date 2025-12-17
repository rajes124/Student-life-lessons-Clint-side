// src/dashboard/user/MyProfile.jsx

import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const MyProfile = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const [name, setName] = useState(currentUser?.displayName || "");
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || "");
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (name === currentUser?.displayName && photoURL === currentUser?.photoURL) {
    toast("No changes made"); // toast.info → toast() করো
    return;
  }

  setLoading(true);
  try {
    await updateUserProfile(name, photoURL);
    toast.success("Profile updated successfully!");
  } catch (error) {
    toast.error("Failed to update profile");
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-2xl mt-10">
      <h2 className="text-5xl font-bold text-indigo-700 text-center mb-12">
        My Profile
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
        <div className="text-center">
          <img
            src={currentUser?.photoURL || "https://i.ibb.co/9yK7qfM/user.png"}
            alt="Profile"
            className="w-48 h-48 rounded-full border-8 border-indigo-600 shadow-xl object-cover"
          />
          <p className="mt-6 text-2xl font-bold text-gray-800">
            {currentUser?.displayName || "User"}
          </p>
          <p className="text-lg text-gray-600">{currentUser?.email}</p>
        </div>

        <div className="flex-1 w-full">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-xl font-medium text-gray-700 mb-3">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-xl font-medium text-gray-700 mb-3">
                Photo URL 
              </label>
              <input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-500 focus:border-transparent"
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl py-5 px-16 rounded-xl shadow-2xl transition transform hover:scale-105 disabled:opacity-70"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;