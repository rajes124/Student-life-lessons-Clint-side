// src/dashboard/admin/AdminProfile.jsx
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  User,
  Mail,
  ShieldCheck,
  Star,
  Users,
  BookOpen,
  AlertTriangle,
  Settings,
  Crown,
  CheckCircle2,
  BarChart,          // ← এটা যোগ করা হয়েছে (BarChart3 এর বদলে)
} from "lucide-react";

const AdminProfile = () => {
  const { currentUser, userData } = useAuth();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-10">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 border border-indigo-100">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100 mb-6">
            <ShieldCheck className="w-10 h-10 text-indigo-700" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700">
            Admin Profile
          </h1>
        </div>

        {/* Profile Card */}
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12 mb-12 lg:mb-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-inner">
          <div className="relative">
            <img
              src={currentUser?.photoURL || "https://i.pravatar.cc/300"}
              alt="Profile"
              className="w-40 h-40 sm:w-44 sm:h-44 lg:w-48 lg:h-48 rounded-full border-8 border-white shadow-2xl object-cover ring-4 ring-indigo-300"
            />
            <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-full shadow-lg">
              <Crown className="w-6 h-6" />
            </div>
          </div>

          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              {userData?.name || currentUser?.displayName || "Admin"}
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-3 text-xl text-gray-700 mb-6">
              <Mail className="w-6 h-6 text-indigo-600" />
              <span className="break-all">{currentUser?.email}</span>
            </div>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="flex items-center gap-2 bg-red-50 text-red-800 px-5 py-2.5 rounded-full text-base font-semibold border border-red-200 shadow-sm">
                <ShieldCheck className="w-5 h-5" />
                Admin Role
              </div>
              {userData?.isPremium && (
                <div className="flex items-center gap-2 bg-amber-50 text-amber-800 px-5 py-2.5 rounded-full text-base font-semibold border border-amber-200 shadow-sm">
                  <Star className="w-5 h-5 fill-amber-500" />
                  Premium Member
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <h3 className="text-3xl font-bold text-indigo-800 text-center mb-10 flex items-center justify-center gap-3">
          <BarChart className="w-8 h-8 text-indigo-600" />
          Platform Overview
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-indigo-200">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Users className="w-10 h-10 text-indigo-600" />
              <p className="text-5xl font-extrabold text-indigo-700">12</p>
            </div>
            <p className="text-xl font-semibold text-center text-gray-800">Total Users</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-green-200">
            <div className="flex items-center justify-center gap-4 mb-4">
              <BookOpen className="w-10 h-10 text-green-600" />
              <p className="text-5xl font-extrabold text-green-700">48</p>
            </div>
            <p className="text-xl font-semibold text-center text-gray-800">Lessons Moderated</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-200 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-center gap-4 mb-4">
              <AlertTriangle className="w-10 h-10 text-purple-600" />
              <p className="text-5xl font-extrabold text-purple-700">15</p>
            </div>
            <p className="text-xl font-semibold text-center text-gray-800">Reports Handled</p>
          </div>
        </div>

        {/* Status Message */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-green-100 text-green-800 px-8 py-4 rounded-full shadow-lg border border-green-200">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold">Full Admin Access Active</span>
          </div>
          <p className="text-xl text-gray-700 mt-6 font-medium">
            You have complete control over users, content, and moderation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;