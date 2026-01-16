// src/dashboard/admin/AdminHome.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Users,
  Star,
  BookOpen,
  AlertTriangle,
  UserCog,
  ShieldCheck,
  LayoutDashboard,
  Settings,
  BarChart3,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

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
          premiumUsers: users.filter((u) => u.isPremium).length,
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
          className="text-6xl md:text-8xl text-indigo-600"
        >
          <LayoutDashboard className="w-24 h-24 animate-spin" />
        </motion.div>
        <p className="text-2xl md:text-4xl font-bold text-indigo-700 mt-6 text-center">
          Loading Admin Dashboard...
        </p>
      </div>
    );
  }

  const cardVariants = {
    hidden: { y: 80, opacity: 0, scale: 0.92 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.7,
        ease: "easeOut",
      },
    }),
  };

  const actionVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        type: "spring",
        stiffness: 120,
      },
    }),
  };

  const statsData = [
    {
      value: stats.totalUsers,
      label: "Total Users",
      icon: <Users className="w-12 h-12" />,
      color: "from-blue-500 to-indigo-600",
      bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
    },
    {
      value: stats.premiumUsers,
      label: "Premium Users",
      icon: <Star className="w-12 h-12" />,
      color: "from-amber-500 to-yellow-600",
      bg: "bg-gradient-to-br from-amber-50 to-yellow-50",
    },
    {
      value: stats.totalLessons,
      label: "Total Lessons",
      icon: <BookOpen className="w-12 h-12" />,
      color: "from-purple-500 to-violet-600",
      bg: "bg-gradient-to-br from-purple-50 to-violet-50",
    },
    {
      value: stats.reportedLessons,
      label: "Reported Lessons",
      icon: <AlertTriangle className="w-12 h-12" />,
      color: "from-red-500 to-rose-600",
      bg: "bg-gradient-to-br from-red-50 to-rose-50",
    },
  ];

  const quickActions = [
    {
      title: "Manage Users",
      desc: "Update roles, view premium status, ban users",
      icon: <UserCog className="w-16 h-16" />,
      color: "from-indigo-500 to-indigo-700",
      link: "/dashboard/admin/manage-users",
    },
    {
      title: "Manage Lessons",
      desc: "Moderate, feature, delete, or approve content",
      icon: <BookOpen className="w-16 h-16" />,
      color: "from-teal-500 to-teal-700",
      link: "/dashboard/admin/manage-lessons",
    },
    {
      title: "Reported Lessons",
      desc: "Review reports and take immediate action",
      icon: <AlertTriangle className="w-16 h-16" />,
      color: "from-orange-500 to-red-600",
      link: "/dashboard/admin/reported-lessons",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100 mb-6">
            <ShieldCheck className="w-12 h-12 text-indigo-700" />
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-medium">
            Welcome back,{" "}
            <span className="text-indigo-700 font-bold">{currentUser?.email}</span>
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {statsData.map((stat, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.06, y: -8 }}
              className={`rounded-3xl overflow-hidden shadow-xl ${stat.bg} border border-gray-100`}
            >
              <div className={`bg-gradient-to-br ${stat.color} p-8 text-white text-center`}>
                {stat.icon}
                <div className="text-5xl font-extrabold mt-4">{stat.value}</div>
              </div>
              <div className="p-6 text-center">
                <p className="text-2xl font-semibold text-gray-800">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-indigo-800 mb-12 flex items-center justify-center gap-3">
          <BarChart3 className="w-10 h-10 text-indigo-600" />
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {quickActions.map((action, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={actionVariants}
              whileHover={{ y: -12, scale: 1.04 }}
              className="bg-white rounded-3xl shadow-2xl p-10 text-center border border-gray-100 hover:border-indigo-300 transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br ${action.color} text-white mb-6 shadow-lg`}
              >
                {action.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">{action.title}</h3>
              <p className="text-lg text-gray-600 leading-relaxed">{action.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Status Message */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1 }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-3 bg-green-100 text-green-800 px-8 py-4 rounded-full shadow-md">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold">Full Admin Privileges Active</span>
          </div>
          <p className="text-xl text-gray-600 mt-6">
            You have complete control over users, lessons, and reports.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminHome;