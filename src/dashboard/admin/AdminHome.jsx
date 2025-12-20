// src/dashboard/admin/AdminHome.jsx

import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../utils/api"; // তোমার axios api
import toast from "react-hot-toast";

const AdminHome = () => {
  const { currentUser } = useAuth();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLessons: 0,
    reportedLessons: 0,
    premiumUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const [usersRes, lessonsRes, reportsRes] = await Promise.all([
        api.get("/admin/users"),             // ← শুধু /admin
        api.get("/admin/lessons"),           // ← শুধু /admin
        api.get("/admin/reported-lessons"),
        ]);

        const users = usersRes.data;
        const lessons = lessonsRes.data;
        const reports = reportsRes.data;

        setStats({
          totalUsers: users.length,
          totalLessons: lessons.length,
          reportedLessons: reports.length,
          premiumUsers: users.filter(u => u.isPremium).length,
        });
      } catch (error) {
        toast.error("Failed to load admin stats");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-purple-50">
        <p className="text-3xl font-bold text-indigo-700">Loading Admin Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 p-10">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-16">
        <h1 className="text-6xl font-extrabold text-red-600 text-center mb-10">
          Welcome to Admin Panel! 👑
        </h1>
        <p className="text-3xl text-center text-gray-700 mb-12">
          Logged in as <span className="font-bold text-indigo-600">{currentUser?.email}</span>
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-8 rounded-2xl text-center shadow-lg">
            <h3 className="text-5xl font-bold text-blue-700 mb-4">{stats.totalUsers}</h3>
            <p className="text-2xl text-gray-700">Total Users</p>
          </div>

          <div className="bg-gradient-to-br from-green-100 to-green-200 p-8 rounded-2xl text-center shadow-lg">
            <h3 className="text-5xl font-bold text-green-700 mb-4">{stats.premiumUsers}</h3>
            <p className="text-2xl text-gray-700">Premium Users</p>
          </div>

          <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-8 rounded-2xl text-center shadow-lg">
            <h3 className="text-5xl font-bold text-purple-700 mb-4">{stats.totalLessons}</h3>
            <p className="text-2xl text-gray-700">Total Lessons</p>
          </div>

          <div className="bg-gradient-to-br from-red-100 to-red-200 p-8 rounded-2xl text-center shadow-lg">
            <h3 className="text-5xl font-bold text-red-700 mb-4">{stats.reportedLessons}</h3>
            <p className="text-2xl text-gray-700">Reported Lessons</p>
          </div>
        </div>

        {/* Quick Links */}
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-12 rounded-2xl text-center shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 cursor-pointer">
            <div className="text-8xl mb-6">👥</div>
            <h3 className="text-4xl font-bold text-indigo-700 mb-4">Manage Users</h3>
            <p className="text-xl text-gray-700">Change roles, view premium status</p>
          </div>

          <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-12 rounded-2xl text-center shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 cursor-pointer">
            <div className="text-8xl mb-6">📚</div>
            <h3 className="text-4xl font-bold text-teal-700 mb-4">Manage Lessons</h3>
            <p className="text-xl text-gray-700">Feature, delete, moderate content</p>
          </div>

          <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-12 rounded-2xl text-center shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 cursor-pointer">
            <div className="text-8xl mb-6">⚠️</div>
            <h3 className="text-4xl font-bold text-orange-700 mb-4">Reported Lessons</h3>
            <p className="text-xl text-gray-700">Review and take action on reports</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-3xl font-bold text-green-600">
            ✅ Full Admin Access Granted
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;