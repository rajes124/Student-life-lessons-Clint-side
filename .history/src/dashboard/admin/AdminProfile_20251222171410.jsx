// src/dashboard/admin/AdminProfile.jsx
import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const AdminProfile = () => {
  const { currentUser, userData } = useAuth();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-10">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-800 text-center mb-8 lg:mb-10">
          Admin Profile 👑
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12 mb-10 lg:mb-12">
          <img
            src={currentUser?.photoURL || "https://i.pravatar.cc/300"}
            alt="Profile"
            className="w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full border-4 sm:border-6 lg:border-8 border-indigo-600 shadow-2xl object-cover flex-shrink-0"
          />

          <div className="text-center md:text-left flex-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 lg:mb-4">
              {userData?.name || currentUser?.displayName || "Admin"}
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-5 lg:mb-6 break-all">
              {currentUser?.email}
            </p>

            <div className="flex flex-wrap gap-3 lg:gap-4 justify-center md:justify-start">
              <span className="bg-red-100 text-red-800 px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 rounded-full text-sm sm:text-base lg:text-lg font-bold">
                Admin Role 👑
              </span>
              {userData?.isPremium && (
                <span className="bg-yellow-100 text-yellow-800 px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 rounded-full text-sm sm:text-base lg:text-lg font-bold">
                  Premium ⭐
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid - Responsive Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 text-center">
          <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-6 sm:p-7 lg:p-8 rounded-2xl">
            <p className="text-lg sm:text-xl text-gray-700 mb-2">Total Users</p>
            <p className="text-3xl sm:text-4xl font-bold text-indigo-700">12</p>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 sm:p-7 lg:p-8 rounded-2xl">
            <p className="text-lg sm:text-xl text-gray-700 mb-2">Lessons Moderated</p>
            <p className="text-3xl sm:text-4xl font-bold text-green-700">48</p>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 sm:p-7 lg:p-8 rounded-2xl sm:col-span-2 lg:col-span-1">
            <p className="text-lg sm:text-xl text-gray-700 mb-2">Reports Handled</p>
            <p className="text-3xl sm:text-4xl font-bold text-purple-700">15</p>
          </div>
        </div>

        <div className="mt-10 lg:mt-12 text-center">
          <p className="text-xl sm:text-2xl font-semibold text-green-600">
            ✅ Full Admin Access Active
          </p>
          <p className="text-base sm:text-lg text-gray-600 mt-3 lg:mt-4 px-4">
            You have complete control over the platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;