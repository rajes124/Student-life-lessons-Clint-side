// src/pages/Dashboard/DashboardHome.jsx

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  PlusCircle,
  BookOpen,
  Heart,
  Search,
  User,
  Star
} from "lucide-react";

const DashboardHome = () => {
  const { currentUser, userData } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 py-12 px-4">

      {/* Welcome Section */}
      <div className="max-w-7xl mx-auto text-center bg-white rounded-3xl shadow-2xl p-16 mb-16">
        <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
          Welcome back, {currentUser?.displayName || "User"}!
        </h2>

        <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto">
          Start sharing your life lessons or explore what you've already created.
        </p>

        {userData?.isPremium && (
          <div className="mt-10 inline-flex items-center gap-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-indigo-900 px-10 py-5 rounded-full text-2xl font-bold shadow-xl">
            <Star className="w-7 h-7" />
            <span>Premium Member</span>
            <span className="text-lg font-normal">Lifetime Access</span>
          </div>
        )}
      </div>

      {/* Action Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

        {/* Add Lesson */}
        <Link
          to="/dashboard/add-lesson"
          className="group bg-white rounded-3xl shadow-xl p-12 text-center hover:-translate-y-4 transition-all duration-500 border border-indigo-100"
        >
          <div className="mx-auto mb-8 w-20 h-20 rounded-2xl flex items-center justify-center bg-indigo-100 text-indigo-600 group-hover:scale-110 transition">
            <PlusCircle size={42} />
          </div>
          <h3 className="text-3xl font-bold mb-3 text-indigo-700">
            Add New Lesson
          </h3>
          <p className="text-gray-600 text-lg">
            Share your wisdom with the community
          </p>
        </Link>

        {/* My Lessons */}
        <Link
          to="/dashboard/my-lessons"
          className="group bg-white rounded-3xl shadow-xl p-12 text-center hover:-translate-y-4 transition-all duration-500 border border-teal-100"
        >
          <div className="mx-auto mb-8 w-20 h-20 rounded-2xl flex items-center justify-center bg-teal-100 text-teal-600 group-hover:scale-110 transition">
            <BookOpen size={42} />
          </div>
          <h3 className="text-3xl font-bold mb-3 text-teal-700">
            My Lessons
          </h3>
          <p className="text-gray-600 text-lg">
            View and manage your created lessons
          </p>
        </Link>

        {/* Favorites */}
        <Link
          to="/dashboard/my-favorites"
          className="group bg-white rounded-3xl shadow-xl p-12 text-center hover:-translate-y-4 transition-all duration-500 border border-pink-100"
        >
          <div className="mx-auto mb-8 w-20 h-20 rounded-2xl flex items-center justify-center bg-pink-100 text-pink-600 group-hover:scale-110 transition">
            <Heart size={42} />
          </div>
          <h3 className="text-3xl font-bold mb-3 text-pink-700">
            My Favorites
          </h3>
          <p className="text-gray-600 text-lg">
            Lessons you've saved for later
          </p>
        </Link>

        {/* Public Lessons */}
        <Link
          to="/public-lessons"
          className="group bg-white rounded-3xl shadow-xl p-12 text-center hover:-translate-y-4 transition-all duration-500 border border-orange-100"
        >
          <div className="mx-auto mb-8 w-20 h-20 rounded-2xl flex items-center justify-center bg-orange-100 text-orange-600 group-hover:scale-110 transition">
            <Search size={42} />
          </div>
          <h3 className="text-3xl font-bold mb-3 text-orange-700">
            Explore Public Lessons
          </h3>
          <p className="text-gray-600 text-lg">
            Learn from others' experiences
          </p>
        </Link>

        {/* Profile */}
        <Link
          to="/dashboard/profile"
          className="group bg-white rounded-3xl shadow-xl p-12 text-center hover:-translate-y-4 transition-all duration-500 border border-blue-100"
        >
          <div className="mx-auto mb-8 w-20 h-20 rounded-2xl flex items-center justify-center bg-blue-100 text-blue-600 group-hover:scale-110 transition">
            <User size={42} />
          </div>
          <h3 className="text-3xl font-bold mb-3 text-blue-700">
            My Profile
          </h3>
          <p className="text-gray-600 text-lg">
            Update your information
          </p>
        </Link>

        {/* Upgrade */}
        {!userData?.isPremium && (
          <Link
            to="/pricing"
            className="group bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-3xl shadow-2xl p-12 text-center hover:-translate-y-4 transition-all duration-500"
          >
            <div className="mx-auto mb-8 w-20 h-20 rounded-2xl flex items-center justify-center bg-white/20 group-hover:scale-110 transition">
              <Star size={42} />
            </div>
            <h3 className="text-3xl font-bold mb-3">
              Upgrade to Premium
            </h3>
            <p className="text-lg opacity-90">
              Unlock exclusive features
            </p>
          </Link>
        )}

      </div>
    </div>
  );
};

export default DashboardHome;
