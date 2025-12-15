// src/dashboard/admin/AdminHome.jsx

import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const AdminHome = () => {
  const { currentUser, userData } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 p-10">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-16">
        <h1 className="text-6xl font-extrabold text-red-600 text-center mb-10">
          Welcome to Admin Panel! 👑
        </h1>
        <p className="text-3xl text-center text-gray-700 mb-12">
          You are logged in as <span className="font-bold text-indigo-600">{currentUser?.email}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
          <div className="bg-gradient-to-br from-red-100 to-red-200 p-10 rounded-2xl text-center shadow-lg">
            <h3 className="text-4xl font-bold text-red-700 mb-4">Manage Users</h3>
            <p className="text-xl text-gray-700">View and manage all users</p>
          </div>

          <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-10 rounded-2xl text-center shadow-lg">
            <h3 className="text-4xl font-bold text-blue-700 mb-4">Manage Lessons</h3>
            <p className="text-xl text-gray-700">Review and moderate lessons</p>
          </div>

          <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-10 rounded-2xl text-center shadow-lg">
            <h3 className="text-4xl font-bold text-purple-700 mb-4">Reported Lessons</h3>
            <p className="text-xl text-gray-700">Handle reported content</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-2xl font-bold text-green-600">
            ✅ Admin Access Granted Successfully
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;