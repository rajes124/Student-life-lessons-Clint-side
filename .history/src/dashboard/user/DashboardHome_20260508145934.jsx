// src/pages/Dashboard/DashboardHome.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  PlusCircle,
  BookOpen,
  Heart,
  Search,
  User,
  Star,
  Sparkles,
  BookMarked,
  ArrowRight,
  ShieldCheck,
  Zap,
  LayoutDashboard
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const DashboardHome = () => {
  const { currentUser, userData } = useAuth();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  // Card Data Array for cleaner code and mapping
  const actions = [
    {
      to: "/dashboard/add-lesson",
      title: "Add New Lesson",
      desc: "Share your wisdom with the community",
      icon: <PlusCircle className="w-8 h-8 md:w-10 md:h-10" />,
      color: "indigo",
      delay: "100"
    },
    {
      to: "/dashboard/my-lessons",
      title: "My Lessons",
      desc: "View and manage your created lessons",
      icon: <BookMarked className="w-8 h-8 md:w-10 md:h-10" />,
      color: "teal",
      delay: "200"
    },
    {
      to: "/dashboard/my-favorites",
      title: "My Favorites",
      desc: "Lessons you've saved for later",
      icon: <Heart className="w-8 h-8 md:w-10 md:h-10" />,
      color: "rose",
      delay: "300"
    },
    {
      to: "/public-lessons",
      title: "Explore Public",
      desc: "Learn from others' experiences",
      icon: <Search className="w-8 h-8 md:w-10 md:h-10" />,
      color: "orange",
      delay: "400"
    },
    {
      to: "/dashboard/profile",
      title: "My Profile",
      desc: "Update your personal information",
      icon: <User className="w-8 h-8 md:w-10 md:h-10" />,
      color: "blue",
      delay: "500"
    }
  ];

  return (
    <div className="min-h-screen bg-base-100 py-8 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Hero Welcome Section --- */}
        <div 
          className="relative overflow-hidden bg-base-100 rounded-[2.5rem] md:rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-base-300 p-8 md:p-20 mb-12 md:mb-20"
          data-aos="fade-down"
        >
          {/* Abstract Background Shapes */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 md:w-96 h-64 md:h-96 bg-secondary/10 rounded-full blur-3xl opacity-50"></div>

          <div className="relative z-10 text-center md:text-left flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                <Zap className="w-4 h-4 fill-current" /> Creator Dashboard
              </div>
              <h1 className="text-4xl md:text-7xl font-black text-base-content tracking-tighter leading-[0.9] mb-6">
                Welcome back, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                  {currentUser?.displayName?.split(' ')[0] || "Explorer"}!
                </span>
              </h1>
              <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl leading-relaxed mb-8">
                Your journey of sharing wisdom continues here. Ready to impact the world with your next lesson?
              </p>
              
              {/* Premium Status Badge */}
              {userData?.isPremium ? (
                <div className="inline-flex items-center gap-3 bg-base-content text-warning px-6 py-3 rounded-2xl shadow-xl border border-base-100/10 animate-pulse">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-xs font-black uppercase tracking-[0.2em]">Premium Member Lifetime</span>
                </div>
              ) : (
                <Link to="/pricing" className="text-indigo-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                  Upgrade to unlock pro tools <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>

            {/* Profile Summary Visual */}
            <div className="hidden lg:flex flex-col items-center p-8 bg-slate-50 rounded-[3rem] border border-white shadow-inner">
               <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl mb-4">
                  <img 
                    src={currentUser?.photoURL || `https://ui-avatars.com/api/?name=${currentUser?.displayName}&background=6366f1&color=fff&size=256`} 
                    alt="profile" 
                    className="w-full h-full object-cover"
                  />
               </div>
               <p className="font-black text-slate-900 uppercase tracking-tighter text-center">{currentUser?.displayName}</p>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 italic">{currentUser?.email}</p>
            </div>
          </div>
        </div>

        {/* --- Dynamic Action Cards Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {actions.map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              data-aos="fade-up"
              data-aos-delay={item.delay}
              className="group relative bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-4 overflow-hidden flex flex-col items-center text-center"
            >
              {/* Animated Background Decor */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${item.color}-50 rounded-full translate-x-16 -translate-y-16 group-hover:scale-[3] transition-transform duration-700`}></div>
              
              <div className={`relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center mb-8 shadow-inner group-hover:rotate-6 transition-transform`}>
                {item.icon}
              </div>

              <div className="relative z-10">
                <h3 className={`text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tighter group-hover:text-${item.color}-600 transition-colors`}>
                  {item.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-6">
                  {item.desc}
                </p>
                <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-slate-900 transition-colors">
                  Open Module <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}

          {/* Special Premium Upgrade Card (Only if not premium) */}
          {!userData?.isPremium && (
            <Link
              to="/pricing"
              data-aos="fade-up"
              data-aos-delay="600"
              className="group relative bg-gradient-to-br from-indigo-600 via-purple-600 to-rose-500 rounded-[2.5rem] p-8 md:p-10 shadow-2xl hover:shadow-indigo-200 transition-all duration-500 hover:-translate-y-4 overflow-hidden flex flex-col items-center text-center text-white"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform">
                <Sparkles className="w-10 h-10 text-amber-300" />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tighter">
                  Go Premium
                </h3>
                <p className="text-white/80 font-medium leading-relaxed mb-8">
                  Unlock monetization and exclusive HD resources.
                </p>
                <span className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl group-hover:bg-slate-900 group-hover:text-white transition-all">
                  Explore Plans
                </span>
              </div>
            </Link>
          )}
        </div>

        {/* --- Minimalist Footer --- */}
        <div 
          className="mt-20 py-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6"
          data-aos="fade-up"
        >
          <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
             <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Secure Hub</span>
             <span className="flex items-center gap-2"><LayoutDashboard className="w-4 h-4" /> v2.0 Studio</span>
          </div>
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            © {new Date().getFullYear()} Studio Insights Engine
          </p>
        </div>
      </div>

      {/* Tailwind Specific Dynamic Color Handling (Important for JIT) */}
      <div className="hidden bg-indigo-50 text-indigo-600 bg-teal-50 text-teal-600 bg-rose-50 text-rose-600 bg-orange-50 text-orange-600 bg-blue-50 text-blue-600 hover:text-indigo-600 hover:text-teal-600 hover:text-rose-600 hover:text-orange-600 hover:text-blue-600"></div>
    </div>
  );
};

export default DashboardHome;