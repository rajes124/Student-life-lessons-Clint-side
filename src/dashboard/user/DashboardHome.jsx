// src/dashboard/DashboardHome.jsx

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // পাথ ঠিক আছে (contexts ফোল্ডার src-এর ভিতরে)

const DashboardHome = () => {
  const { currentUser, userData } = useAuth(); // userData থাকলে premium দেখাবে

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      {/* Welcome Banner */}
      <div className="max-w-7xl mx-auto text-center bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-16 mb-20">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-8">
          স্বাগতম, {currentUser?.displayName || "User"}! 🌟
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-10">
          তোমার জীবনের শিক্ষাগুলো এখানে সংরক্ষণ করো, বড় করো এবং বিশ্বের সাথে শেয়ার করো
        </p>

        {userData?.isPremium && (
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-indigo-900 px-10 py-5 rounded-full text-2xl font-bold shadow-xl">
            <span>Premium Member ⭐</span>
            <span className="text-lg font-normal">Lifetime Access</span>
          </div>
        )}
      </div>

      {/* Action Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <Link
          to="/dashboard/add-lesson"
          className="group bg-white rounded-3xl shadow-2xl p-12 text-center hover:shadow-3xl hover:-translate-y-8 transition-all duration-500 border-4 border-indigo-200"
        >
          <div className="text-8xl mb-8 group-hover:scale-125 transition-transform">✨</div>
          <h3 className="text-4xl font-bold text-indigo-700 mb-4">নতুন লেসন যোগ করো</h3>
          <p className="text-xl text-gray-600">তোমার অভিজ্ঞতা থেকে শেখা জ্ঞান শেয়ার করো</p>
        </Link>

        <Link
          to="/dashboard/my-lessons"
          className="group bg-white rounded-3xl shadow-2xl p-12 text-center hover:shadow-3xl hover:-translate-y-8 transition-all duration-500 border-4 border-purple-200"
        >
          <div className="text-8xl mb-8 group-hover:scale-125 transition-transform">📚</div>
          <h3 className="text-4xl font-bold text-purple-700 mb-4">আমার লেসনসমূহ</h3>
          <p className="text-xl text-gray-600">তোমার তৈরি লেসন দেখো ও ম্যানেজ করো</p>
        </Link>

        <Link
          to="/dashboard/my-favorites"
          className="group bg-white rounded-3xl shadow-2xl p-12 text-center hover:shadow-3xl hover:-translate-y-8 transition-all duration-500 border-4 border-teal-200"
        >
          <div className="text-8xl mb-8 group-hover:scale-125 transition-transform">❤️</div>
          <h3 className="text-4xl font-bold text-teal-700 mb-4">পছন্দের লেসন</h3>
          <p className="text-xl text-gray-600">সেভ করা প্রিয় লেসনগুলো দেখো</p>
        </Link>

        <Link
          to="/public-lessons"
          className="group bg-white rounded-3xl shadow-2xl p-12 text-center hover:shadow-3xl hover:-translate-y-8 transition-all duration-500 border-4 border-orange-200"
        >
          <div className="text-8xl mb-8 group-hover:scale-125 transition-transform">🔍</div>
          <h3 className="text-4xl font-bold text-orange-700 mb-4">পাবলিক লেসন</h3>
          <p className="text-xl text-gray-600">অন্যদের শিক্ষা থেকে নতুন কিছু শেখো</p>
        </Link>

        <Link
          to="/dashboard/profile"
          className="group bg-white rounded-3xl shadow-2xl p-12 text-center hover:shadow-3xl hover:-translate-y-8 transition-all duration-500 border-4 border-cyan-200"
        >
          <div className="text-8xl mb-8 group-hover:scale-125 transition-transform">👤</div>
          <h3 className="text-4xl font-bold text-cyan-700 mb-4">প্রোফাইল</h3>
          <p className="text-xl text-gray-600">প্রোফাইল আপডেট করো</p>
        </Link>

        {!userData?.isPremium && (
          <Link
            to="/pricing"
            className="group bg-gradient-to-r from-amber-500 to-red-600 text-white rounded-3xl shadow-2xl p-12 text-center hover:shadow-3xl hover:-translate-y-8 transition-all duration-500"
          >
            <div className="text-8xl mb-8 group-hover:scale-125 transition-transform">⭐</div>
            <h3 className="text-4xl font-bold mb-4">প্রিমিয়ামে আপগ্রেড করো</h3>
            <p className="text-xl">লাইফটাইম অ্যাক্সেস পাও – একবার পে করো!</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;