// src/dashboard/admin/AdminHome.jsx

import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion"; 

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
          api.get("/admin/users"),
          api.get("/admin/lessons"),
          api.get("/admin/reported-lessons"),
        ]);

        const users = usersRes.data;
        const lessons = lessonsRes.data;
        const reports = reportsRes.data || [];

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-5xl md:text-6xl"
        >
          ⚙️
        </motion.div>
        <p className="text-xl md:text-3xl font-bold text-indigo-700 mt-4 text-center">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  const cardVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  const quickActionVariants = {
    hidden: { scale: 0.85, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-4">
            Admin Panel 👑
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 break-all">
            Logged in as{" "}
            <span className="font-bold text-indigo-700">
              {currentUser?.email}
            </span>
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { value: stats.totalUsers, label: "Total Users", color: "from-blue-400 to-blue-600", icon: "👥" },
            { value: stats.premiumUsers, label: "Premium Users", color: "from-yellow-400 to-amber-500", icon: "⭐" },
            { value: stats.totalLessons, label: "Total Lessons", color: "from-purple-400 to-purple-600", icon: "📚" },
            { value: stats.reportedLessons, label: "Reported Lessons", color: "from-red-400 to-red-600", icon: "⚠️" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              <div className={`bg-gradient-to-br ${stat.color} p-6 sm:p-8 text-white text-center`}>
                <div className="text-5xl sm:text-6xl mb-3">{stat.icon}</div>
                <div className="text-4xl sm:text-5xl font-extrabold">{stat.value}</div>
              </div>
              <div className="p-4 sm:p-6 text-center">
                <p className="text-xl sm:text-2xl font-semibold text-gray-800">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-indigo-800 mb-10">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Manage Users", desc: "Change roles, view premium status", icon: "👥", color: "from-indigo-500 to-indigo-700" },
            { title: "Manage Lessons", desc: "Feature, delete, moderate content", icon: "📚", color: "from-teal-500 to-teal-700" },
            { title: "Reported Lessons", desc: "Review and take action on reports", icon: "⚠️", color: "from-orange-500 to-red-600" },
          ].map((action, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={quickActionVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 text-center cursor-pointer"
            >
              <div className={`text-6xl sm:text-7xl mb-5 bg-gradient-to-br ${action.color} bg-clip-text text-transparent`}>
                {action.icon}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                {action.title}
              </h3>
              <p className="text-lg sm:text-xl text-gray-600">
                {action.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-center mt-16"
        >
          <p className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
            ✅ Full Admin Access Granted
          </p>
          <p className="text-lg sm:text-xl text-gray-600 mt-3">
            You have complete control over the platform.
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default AdminHome;
