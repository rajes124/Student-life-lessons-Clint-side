// src/dashboard/admin/AdminHome.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // Added for navigation
import {
  Users,
  Star,
  BookOpen,
  AlertTriangle,
  UserCog,
  ShieldCheck,
  LayoutDashboard,
  BarChart3,
  CheckCircle,
  ArrowUpRight,
  Activity,
  Zap,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

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
    AOS.init({ duration: 1000, once: true });
    
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 overflow-hidden">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-32 h-32 border-t-4 border-b-4 border-indigo-500 rounded-full"
          />
          <LayoutDashboard className="w-12 h-12 text-indigo-400 absolute inset-0 m-auto animate-pulse" />
        </div>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="mt-8 text-indigo-200 font-black tracking-[0.4em] uppercase text-sm"
        >
          Securing Admin Terminal...
        </motion.p>
      </div>
    );
  }

  const statsData = [
    {
      value: stats.totalUsers,
      label: "System Users",
      icon: <Users className="w-8 h-8" />,
      color: "from-blue-600 to-cyan-500",
      shadow: "shadow-blue-200",
    },
    {
      value: stats.premiumUsers,
      label: "Premium Tier",
      icon: <Star className="w-8 h-8" />,
      color: "from-amber-500 to-orange-400",
      shadow: "shadow-amber-200",
    },
    {
      value: stats.totalLessons,
      label: "Active Lessons",
      icon: <BookOpen className="w-8 h-8" />,
      color: "from-violet-600 to-purple-400",
      shadow: "shadow-purple-200",
    },
    {
      value: stats.reportedLessons,
      label: "Flagged Content",
      icon: <AlertTriangle className="w-8 h-8" />,
      color: "from-rose-600 to-red-400",
      shadow: "shadow-red-200",
    },
  ];

  const quickActions = [
    {
      title: "User Management",
      desc: "Control access, roles and restrictions",
      icon: <UserCog className="w-10 h-10" />,
      color: "indigo",
      link: "/dashboard/admin/manage-users",
    },
    {
      title: "Content Control",
      desc: "Approve or moderate published lessons",
      icon: <BookOpen className="w-10 h-10" />,
      color: "teal",
      link: "/dashboard/admin/manage-lessons",
    },
    {
      title: "Security Center",
      desc: "Investigate and resolve user reports",
      icon: <ShieldCheck className="w-10 h-10" />,
      color: "rose",
      link: "/dashboard/admin/reported-lessons",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd] py-10 md:py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Dynamic Header --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-20" data-aos="fade-down">
          <div className="text-center md:text-left">
             <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <span className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200">
                    <Zap className="w-6 h-6 fill-current" />
                </span>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">System Oversight</span>
             </div>
             <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none mb-4">
                ADMIN<span className="text-indigo-600">.</span>HQ
             </h1>
             <p className="text-slate-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                Operator: <span className="text-slate-900">{currentUser?.email}</span>
             </p>
          </div>
          
          <div className="bg-white p-4 rounded-[2rem] shadow-xl shadow-slate-100 border border-slate-50 flex items-center gap-6 px-10">
             <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                <div className="flex items-center gap-2 text-green-500 font-black uppercase text-xs">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span> Online
                </div>
             </div>
             <div className="h-10 w-[1px] bg-slate-100"></div>
             <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Server</p>
                <p className="text-slate-900 font-black uppercase text-xs italic">Live-DB-v4</p>
             </div>
          </div>
        </div>

        {/* --- Metrics Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {statsData.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={`bg-white rounded-[2.5rem] p-8 border border-slate-50 shadow-2xl ${stat.shadow}/10 overflow-hidden relative group`}
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700`}></div>
              
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                {stat.icon}
              </div>
              <h3 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">{stat.value}</h3>
              <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">{stat.label}</p>
              
              <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                 <span className="text-[10px] font-bold text-green-500 flex items-center gap-1 italic">
                    <Activity className="w-3 h-3" /> Real-time
                 </span>
                 <ArrowUpRight className="w-4 h-4 text-slate-200 group-hover:text-indigo-500 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Command Center (Quick Actions) --- */}
        <div className="mb-10 flex items-center gap-4" data-aos="fade-right">
            <BarChart3 className="w-8 h-8 text-indigo-600" />
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Command Center</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quickActions.map((action, i) => (
            <Link
              key={i}
              to={action.link}
              className="group relative bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center overflow-hidden"
              data-aos="zoom-in"
              data-aos-delay={i * 200}
            >
              <div className={`absolute inset-0 bg-${action.color}-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0`}></div>
              
              <div className={`relative z-10 w-24 h-24 rounded-3xl bg-${action.color}-50 text-${action.color}-600 flex items-center justify-center mb-8 group-hover:bg-white/20 group-hover:text-white transition-colors duration-500`}>
                {action.icon}
              </div>
              
              <h3 className="relative z-10 text-2xl font-black text-slate-900 mb-4 uppercase tracking-tighter group-hover:text-white transition-colors duration-500">
                {action.title}
              </h3>
              <p className="relative z-10 text-slate-500 font-medium leading-relaxed group-hover:text-white/80 transition-colors duration-500">
                {action.desc}
              </p>
              
              <div className="relative z-10 mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 group-hover:text-white transition-colors">
                Initialize Module <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        {/* --- Footer Status Bar --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-24 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">Admin Privileges: Fully Active</span>
          </div>
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            © {new Date().getFullYear()} Studio Insights • Central Control Unit
          </p>
        </motion.div>
      </div>

      {/* Tailwind Utility for dynamic colors - Don't remove */}
      <div className="hidden bg-indigo-50 text-indigo-600 bg-teal-50 text-teal-600 bg-rose-50 text-rose-600 bg-indigo-600 bg-teal-600 bg-rose-600"></div>
    </div>
  );
};

export default AdminHome;