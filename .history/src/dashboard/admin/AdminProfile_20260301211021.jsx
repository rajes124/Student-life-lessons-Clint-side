// src/dashboard/admin/AdminProfile.jsx
import React, { useEffect } from "react";
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
  BarChart,
  ArrowRight,
  Fingerprint,
  Activity,
  Zap,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const AdminProfile = () => {
  const { currentUser, userData } = useAuth();

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: "ease-in-out-back",
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfcfd] py-10 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* --- Floating Header Section --- */}
        <div className="text-center mb-16" data-aos="zoom-in">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-sm border border-indigo-100">
            <Fingerprint className="w-4 h-4" /> Identity Verified
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none mb-4">
            ADMIN<span className="text-indigo-600">.</span>PRO
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Secure Administrative Terminal</p>
        </div>

        {/* --- Main Profile Architecture --- */}
        <div 
          className="relative bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] border border-slate-50 p-8 md:p-16 mb-12 overflow-hidden"
          data-aos="fade-up"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/4"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Avatar Section */}
            <div className="relative group" data-aos="fade-right" data-aos-delay="200">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative">
                <img
                  src={currentUser?.photoURL || `https://ui-avatars.com/api/?name=${currentUser?.displayName}&background=6366f1&color=fff&size=400`}
                  alt="Profile"
                  className="w-48 h-48 md:w-64 md:h-64 rounded-[4rem] border-8 border-white shadow-2xl object-cover rotate-3 group-hover:rotate-0 transition-transform duration-500"
                />
                <div className="absolute -bottom-4 -right-4 bg-slate-900 text-amber-400 p-5 rounded-3xl shadow-2xl border-4 border-white animate-bounce">
                  <Crown className="w-8 h-8 fill-current" />
                </div>
              </div>
            </div>

            {/* Identity Details */}
            <div className="flex-1 text-center lg:text-left" data-aos="fade-left" data-aos-delay="400">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                 <span className="h-[2px] w-12 bg-indigo-600 hidden lg:block"></span>
                 <p className="text-indigo-600 font-black uppercase tracking-[0.2em] text-xs italic">System Administrator</p>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
                {userData?.name || currentUser?.displayName || "Admin User"}
              </h2>

              <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-100 px-6 py-4 rounded-3xl mb-10 group hover:border-indigo-200 transition-colors">
                <Mail className="w-6 h-6 text-indigo-600" />
                <span className="text-slate-600 font-bold text-lg md:text-xl break-all">
                  {currentUser?.email}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-3 bg-rose-600 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-rose-100 border border-white/10">
                  <ShieldCheck className="w-5 h-5" />
                  Privileged Access
                </div>
                {userData?.isPremium && (
                  <div className="flex items-center gap-3 bg-slate-900 text-amber-400 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl">
                    <Star className="w-5 h-5 fill-current" />
                    Premium Tier
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- Stats Engine Section --- */}
        <div className="mb-12 flex items-center gap-4" data-aos="fade-right">
            <BarChart className="w-8 h-8 text-indigo-600" />
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Performance Metrics</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            { label: "Total Users", val: "12", icon: <Users />, color: "indigo", delay: "100" },
            { label: "Moderated", val: "48", icon: <BookOpen />, color: "teal", delay: "200" },
            { label: "Handled Reports", val: "15", icon: <AlertTriangle />, color: "rose", delay: "300" }
          ].map((item, idx) => (
            <div 
              key={idx}
              data-aos="fade-up" 
              data-aos-delay={item.delay}
              className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden relative"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-${item.color}-50 rounded-full translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform`}></div>
              
              <div className={`relative z-10 w-16 h-16 rounded-2xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center mb-6 shadow-inner group-hover:rotate-12 transition-transform`}>
                {item.icon}
              </div>
              <div className="relative z-10">
                <h4 className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">{item.val}</h4>
                <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">{item.label}</p>
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between text-slate-300">
                 <Activity className="w-4 h-4 group-hover:text-indigo-500 transition-colors" />
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* --- Footer Status Confirmation --- */}
        <div 
          className="mt-20 text-center flex flex-col items-center" 
          data-aos="zoom-in"
        >
          <div className="inline-flex items-center gap-4 bg-white px-10 py-6 rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-indigo-50 group hover:border-green-200 transition-all duration-700">
            <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="text-left">
                <h5 className="text-xl font-black text-slate-900 leading-none mb-1">Full Terminal Access</h5>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Operator status: Verified & Secured</p>
            </div>
          </div>
          
          <p className="text-slate-400 text-sm font-medium mt-10 max-w-lg leading-relaxed italic">
            "With great power comes great responsibility. You are currently overseeing all core platform operations."
          </p>
        </div>

      </div>

      {/* Tailwind Dynamic Classes - Don't Remove */}
      <div className="hidden bg-indigo-50 text-indigo-600 bg-teal-50 text-teal-600 bg-rose-50 text-rose-600"></div>
    </div>
  );
};

export default AdminProfile;