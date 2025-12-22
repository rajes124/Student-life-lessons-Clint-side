// src/dashboard/admin/AdminProfile.jsx
import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const AdminProfile = () => {
  const { currentUser, userData } = useAuth();

  return (
    <div className="max-w-4xl mx-auto p-10">
      <div className="bg-white rounded-3xl shadow-2xl p-12">
        <h1 className="text-5xl font-bold text-indigo-800 text-center mb-10">
          Admin Profile 👑
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
          <img
            src={currentUser?.photoURL || "https://i.pravatar.cc/300"}
            alt="Profile"
            className="w-40 h-40 rounded-full border-8 border-indigo-600 shadow-2xl object-cover"
          />

          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {userData?.name || currentUser?.displayName || "Admin"}
            </h2>
            <p className="text-2xl text-gray-600 mb-6">{currentUser?.email}</p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <span className="bg-red-100 text-red-800 px-6 py-3 rounded-full text-lg font-bold">
                Admin Role 👑
              </span>
              {userData?.isPremium && (
                <span className="bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-lg font-bold">
                  Premium ⭐
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-8 rounded-2xl">
            <p className="text-xl text-gray-700 mb-2">Total Users</p>
            <p className="text-4xl font-bold text-indigo-700">12</p>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-green-200 p-8 rounded-2xl">
            <p className="text-xl text-gray-700 mb-2">Lessons Moderated</p>
            <p className="text-4xl font-bold text-green-700">48</p>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-8 rounded-2xl">
            <p className="text-xl text-gray-700 mb-2">Reports Handled</p>
            <p className="text-4xl font-bold text-purple-700">15</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-2xl font-semibold text-green-600">
            ✅ Full Admin Access Active
          </p>
          <p className="text-lg text-gray-600 mt-4">
            You have complete control over the platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;