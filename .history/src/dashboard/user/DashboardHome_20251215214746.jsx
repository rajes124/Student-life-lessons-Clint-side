// src/pages/Dashboard/DashboardHome.jsx

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";


const DashboardHome = () => {
  const { currentUser, userData } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 py-12 px-4">
      {/* Welcome Section */}
      <div className="max-w-7xl mx-auto text-center bg-white rounded-3xl shadow-2xl p-16 mb-16">
        <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
          Welcome back, {currentUser?.displayName || "User"}! 🎉
        </h2>
        <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto">
          Start sharing your life lessons or explore what you've already created.
        </p>

        {/* Premium Badge */}
        {userData?.isPremium && (
          <div className="mt-10 inline-flex items-center gap-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-indigo-900 px-10 py-5 rounded-full text-2xl font-bold shadow-xl">
            <span>Premium Member ⭐</span>
            <span className="text-lg font-normal">Lifetime Access</span>
          </div>
        )}
      </div>

      {/* Quick Action Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <Link
          to="/dashboard/add-lesson"
          className="group bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-3xl shadow-2xl p-12 text-center hover:shadow-3xl hover:-translate-y-6 transition-all duration-500"
        >
          <div className="text-8xl mb-8 group-hover:scale-125 transition-transform">✨</div>
          <h3 className="text-4xl font-bold mb-4">Add New Lesson</h3>
          <p className="text-xl opacity-90">Share your wisdom with the community</p>
        </Link>

        <Link
          to="/dashboard/my-lessons"
          className="group bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-3xl shadow-2xl p-12 text-center hover:shadow-3xl hover:-translate-y-6 transition-all duration-500"
        >
          <div className="text-8xl mb-8 group-hover:scale-125 transition-transform">📚</div>
          <h3 className="text-4xl font-bold mb-4">My Lessons</h3>
          <p className="text-xl opacity-90">View and manage your created lessons</p>
        </Link>

        <Link
          to="/dashboard/my-favorites"
          className="group bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-3xl shadow-2xl p-12 text-center hover:shadow-3xl hover:-translate-y-6 transition-all duration-500"
        >
          <div className="text-8xl mb-8 group-hover:scale-125 transition-transform">❤️</div>
          <h3 className="text-4xl font-bold mb-4">My Favorites</h3>
          <p className="text-xl opacity-90">Lessons you've saved for later</p>
        </Link>

        <Link
          to="/public-lessons"
          className="group bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-3xl shadow-2xl p-12 text-center hover:shadow-3xl hover:-translate-y-6 transition-all duration-500"
        >
          <div className="text-8xl mb-8 group-hover:scale-125 transition-transform">🔍</div>
          <h3 className="text-4xl font-bold mb-4">Explore Public Lessons</h3>
          <p className="text-xl opacity-90">Learn from others' experiences</p>
        </Link>

        <Link
          to="/dashboard/profile"
          className="group bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-3xl shadow-2xl p-12 text-center hover:shadow-3xl hover:-translate-y-6 transition-all duration-500"
        >
          <div className="text-8xl mb-8 group-hover:scale-125 transition-transform">👤</div>
          <h3 className="text-4xl font-bold mb-4">My Profile</h3>
          <p className="text-xl opacity-90">Update your information</p>
        </Link>

        {!userData?.isPremium && (
          <Link
            to="/pricing"
            className="group bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-3xl shadow-2xl p-12 text-center hover:shadow-3xl hover:-translate-y-6 transition-all duration-500"
          >
            <div className="text-8xl mb-8 group-hover:scale-125 transition-transform">⭐</div>
            <h3 className="text-4xl font-bold mb-4">Upgrade to Premium</h3>
            <p className="text-xl opacity-90">Unlock exclusive features</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;