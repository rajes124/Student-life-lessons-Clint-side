// src/dashboard/admin/AdminHome.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// Recharts components import
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
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
  TrendingUp,
  PieChart as PieIcon
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

  // Chart Data Preparation
  const pieData = [
    { name: 'Premium', value: stats.premiumUsers },
    { name: 'Regular', value: stats.totalUsers - stats.premiumUsers },
  ];

  const barData = [
    { name: 'Lessons', count: stats.totalLessons },
    { name: 'Reports', count: stats.reportedLessons },
    { name: 'Total Users', count: stats.totalUsers },
  ];

  const COLORS = ['#6366f1', '#e2e8f0'];

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
        <p className="mt-8 text-indigo-200 font-black tracking-[0.4em] uppercase text-sm">Securing Admin Terminal...</p>
      </div>
    );
  }

  const statsData = [
    { value: stats.totalUsers, label: "System Users", icon: <Users />, color: "from-blue-600 to-cyan-500", shadow: "shadow-blue-200" },
    { value: stats.premiumUsers, label: "Premium Tier", icon: <Star />, color: "from-amber-500 to-orange-400", shadow: "shadow-amber-200" },
    { value: stats.totalLessons, label: "Active Lessons", icon: <BookOpen />, color: "from-violet-600 to-purple-400", shadow: "shadow-purple-200" },
    { value: stats.reportedLessons, label: "Flagged Content", icon: <AlertTriangle />, color: "from-rose-600 to-red-400", shadow: "shadow-red-200" },
  ];

  const quickActions = [
    { title: "User Management", desc: "Control access and roles", icon: <UserCog className="w-10 h-10" />, color: "indigo", link: "/dashboard/admin/manage-users" },
    { title: "Content Control", desc: "Approve or moderate lessons", icon: <BookOpen className="w-10 h-10" />, color: "teal", link: "/dashboard/admin/manage-lessons" },
    { title: "Security Center", desc: "Resolve user reports", icon: <ShieldCheck className="w-10 h-10" />, color: "rose", link: "/dashboard/admin/reported-lessons" },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd] py-10 md:py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16" data-aos="fade-down">
          <div className="text-center md:text-left">
             <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <span className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg"><Zap className="w-5 h-5 fill-current" /></span>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Control Panel</span>
             </div>
             <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">ADMIN<span className="text-indigo-600">.</span>HQ</h1>
          </div>
          <div className="bg-white p-4 rounded-3xl shadow-xl border border-slate-50 flex items-center gap-6 px-8 italic font-bold text-slate-700">
             {currentUser?.email}
          </div>
        </div>

        {/* --- Metrics --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsData.map((stat, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className={`bg-white rounded-[2rem] p-6 border border-slate-50 shadow-xl relative overflow-hidden group`} data-aos="fade-up" data-aos-delay={i * 100}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-lg`}>{stat.icon}</div>
              <h3 className="text-3xl font-black text-slate-900 leading-none">{stat.value}</h3>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* --- Charts Section (New Next Level UI) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Bar Chart */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-50" data-aos="fade-right">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="text-indigo-600 w-6 h-6" />
              <h3 className="font-black text-slate-800 uppercase tracking-tighter text-xl">Platform Growth</h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} dy={10} />
                  <YAxis hide />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                  <Bar dataKey="count" fill="#6366f1" radius={[10, 10, 10, 10]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-50" data-aos="fade-left">
            <div className="flex items-center gap-3 mb-8">
              <PieIcon className="text-amber-500 w-6 h-6" />
              <h3 className="font-black text-slate-800 uppercase tracking-tighter text-xl">User Segmentation</h3>
            </div>
            <div className="h-[300px] w-full flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{borderRadius: '15px', border: 'none'}} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-4 pr-4">
                 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-600"></div><span className="text-xs font-black text-slate-600 uppercase">Premium</span></div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-200"></div><span className="text-xs font-black text-slate-600 uppercase">Regular</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Quick Actions --- */}
        <div className="mb-8 flex items-center gap-4" data-aos="fade-right">
            <BarChart3 className="w-8 h-8 text-indigo-600" />
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Command Center</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {quickActions.map((action, i) => (
            <Link key={i} to={action.link} className="group relative bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col items-center text-center" data-aos="zoom-in" data-aos-delay={i * 200}>
              <div className={`absolute inset-0 bg-${action.color}-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0`}></div>
              <div className={`relative z-10 w-20 h-20 rounded-2xl bg-${action.color}-50 text-${action.color}-600 flex items-center justify-center mb-6 group-hover:bg-white/20 group-hover:text-white transition-colors`}>{action.icon}</div>
              <h3 className="relative z-10 text-xl font-black text-slate-900 mb-2 uppercase group-hover:text-white transition-colors tracking-tighter">{action.title}</h3>
              <p className="relative z-10 text-slate-500 text-sm group-hover:text-white/80 transition-colors">{action.desc}</p>
            </Link>
          ))}
        </div>

        {/* --- Footer Status --- */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 opacity-70">
          <div className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
            <CheckCircle className="w-3 h-3 text-green-400" /> System Active
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">© {new Date().getFullYear()} Admin Studio</p>
        </div>
      </div>
      <div className="hidden bg-indigo-50 text-indigo-600 bg-teal-50 text-teal-600 bg-rose-50 text-rose-600 bg-indigo-600 bg-teal-600 bg-rose-600"></div>
    </div>
  );
};

export default AdminHome;