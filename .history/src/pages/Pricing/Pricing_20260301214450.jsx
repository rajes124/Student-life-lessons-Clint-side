// src/components/Pricing.jsx
import React, { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, Crown, Star, Sparkles, Rocket, Gem, Trophy, Flame, 
  CheckCircle2, XCircle, ShieldCheck, CreditCard, ArrowRight, AlertTriangle
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";

const Pricing = () => {
  const { currentUser: user, userData: dbUser, loading: authLoading } = useAuth();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-quad",
    });
  }, []);

  // --- Loading State ---
  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full"
        />
        <p className="mt-8 text-indigo-400 font-black tracking-[0.4em] uppercase text-[10px] animate-pulse">Syncing Systems...</p>
      </div>
    );
  }

  // --- Not Logged In ---
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-12 text-center border border-slate-100"
        >
          <div className="w-24 h-24 bg-indigo-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-indigo-600">
            <ShieldCheck size={48} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Locked</h1>
          <p className="text-slate-500 font-bold mb-10 leading-relaxed uppercase text-xs tracking-widest">Authentication required to access premium pricing tier.</p>
          <Link to="/login" className="block">
            <button className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95">
              Secure Login
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // --- DB User Missing ---
  if (!dbUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50 px-4">
        <div className="max-w-lg w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl border border-rose-100" data-aos="zoom-in">
          <AlertTriangle className="w-20 h-20 text-rose-500 mx-auto mb-6 animate-bounce" />
          <h1 className="text-3xl font-black text-slate-900 mb-4 uppercase italic tracking-tighter">Profile Desync</h1>
          <p className="text-slate-400 font-bold mb-8 uppercase tracking-tighter text-[10px]">UID: {user.uid}</p>
          <div className="bg-rose-50 p-8 rounded-[2rem] text-rose-700 font-black text-xs leading-relaxed mb-6 uppercase tracking-widest border border-rose-100">
            Internal Error: MongoDB Record Not Found. Please Re-authenticate.
          </div>
        </div>
      </div>
    );
  }

  // --- Already Premium ---
  if (dbUser.isPremium) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[150px]"></div>
        </div>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full bg-white/5 backdrop-blur-3xl rounded-[4rem] p-12 md:p-24 text-center border border-white/10 shadow-[0_0_100px_rgba(16,185,129,0.15)]"
        >
          <div className="relative inline-block mb-10">
            <Trophy className="w-32 h-32 text-emerald-400 mx-auto drop-shadow-[0_0_40px_rgba(52,211,153,0.6)]" />
            <Sparkles className="absolute -top-4 -right-4 w-12 h-12 text-yellow-400 animate-pulse" />
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-none uppercase">ELITE<br/><span className="text-emerald-400">ACTIVE</span></h1>
          <p className="text-emerald-100/40 font-black text-sm uppercase tracking-[0.5em] mb-12">Lifetime Membership Unlocked</p>
          <div className="py-6 px-12 bg-emerald-500 text-[#064e3b] rounded-[2rem] font-black text-xl md:text-2xl inline-block shadow-2xl shadow-emerald-500/30 uppercase tracking-widest">
            Welcome, Legend
          </div>
        </motion.div>
      </div>
    );
  }

  const handleUpgrade = async () => {
    try {
      const res = await axios.post(
        "https://lessons-backend-six.vercel.app/api/stripe/create-checkout-session",
        { email: user.email, uid: user.uid }
      );
      window.location.href = res.data.url;
    } catch (error) {
      toast.error("Stripe gateway refused connection.");
    }
  };

  const features = [
    { feature: "Access to All Public Lessons", free: "Yes", premium: "Yes" },
    { feature: "Create Lessons", free: "Basic", premium: "Premium Lessons" },
    { feature: "View Premium Lessons", free: "No", premium: "Unlimited" },
    { feature: "Ad-Free Experience", free: "Ads Shown", premium: "No Ads" },
    { feature: "Priority in Featured Section", free: "No", premium: "Yes" },
    { feature: "Lifetime Access", free: "No", premium: "Forever" },
    { feature: "Premium Badge & Recognition", free: "No", premium: "Yes" },
    { feature: "Early Access to New Features", free: "No", premium: "Yes" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 lg:py-28 px-4 sm:px-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-5%] left-[-5%] w-[500px] h-[500px] bg-indigo-100 rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-100 rounded-full blur-[150px] opacity-40"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* --- Header --- */}
        <div className="text-center mb-28" data-aos="fade-down">
          <motion.div 
            initial={{ y: -10 }} animate={{ y: 0 }} transition={{ repeat: Infinity, duration: 2, repeatType: "mirror" }}
            className="inline-flex items-center gap-3 bg-white text-indigo-600 px-8 py-3 rounded-full font-black text-[11px] uppercase tracking-[0.4em] border border-slate-100 mb-8 shadow-xl shadow-indigo-100/20"
          >
             <Gem size={16} /> Exclusive Membership
          </motion.div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 tracking-tighter leading-none mb-10">
            PREMIUM<span className="text-indigo-600">.</span>MOD
          </h1>
          <p className="text-slate-400 font-bold text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed uppercase tracking-tighter">
            Stop learning with limits. Switch to <span className="text-indigo-600 italic">full-access</span> mode and own your growth forever.
          </p>
        </div>

        {/* --- Table Section --- */}
        <div className="bg-white rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] border border-slate-50 overflow-hidden" data-aos="fade-up">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-12 text-left text-2xl font-black uppercase tracking-tighter">Capabilities</th>
                  <th className="p-12 text-center text-xs font-black uppercase tracking-[0.5em] text-slate-500">Free Tier</th>
                  <th className="p-12 text-center text-xs font-black uppercase tracking-[0.5em] text-indigo-400">
                    <div className="flex items-center justify-center gap-2">
                       <Crown size={16} className="fill-current" /> Premium
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {features.map((row, i) => (
                  <tr key={i} className="group hover:bg-indigo-50/30 transition-all duration-300">
                    <td className="p-10 text-slate-700 font-black text-lg uppercase tracking-tighter">{row.feature}</td>
                    <td className="p-10 text-center">
                      {row.free === "Yes" ? (
                        <CheckCircle2 className="mx-auto text-emerald-500 shadow-emerald-100" />
                      ) : row.free === "No" ? (
                        <XCircle className="mx-auto text-slate-200" />
                      ) : (
                        <span className="px-5 py-2 bg-slate-100 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest">{row.free}</span>
                      )}
                    </td>
                    <td className="p-10 text-center">
                      <div className="flex items-center justify-center gap-3 text-indigo-600 font-black text-xl tracking-tighter uppercase italic">
                        {row.premium === "Forever" && <Flame size={20} className="text-orange-500 fill-current" />}
                        {row.premium}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- CTA Box --- */}
          <div className="bg-indigo-600 p-12 md:p-28 text-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent)] opacity-50"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <p className="text-indigo-200 font-black text-xs uppercase tracking-[0.6em] mb-6">Investment Overview</p>
              <div className="flex flex-col lg:flex-row items-center justify-center gap-10 mb-16">
                <h2 className="text-8xl md:text-[10rem] font-black text-white tracking-tighter leading-none">৳1500</h2>
                <div className="text-left bg-white/10 p-8 rounded-[2.5rem] backdrop-blur-md border border-white/10">
                  <p className="text-white/40 font-black text-2xl line-through decoration-rose-500 decoration-4 italic">৳5,000</p>
                  <p className="text-indigo-100 font-black text-3xl uppercase tracking-tighter italic">Lifetime Pass</p>
                </div>
              </div>

              {/* Master Button */}
              <button
                onClick={handleUpgrade}
                className="group relative flex items-center justify-center gap-6 bg-white text-slate-900 px-12 py-8 md:px-20 md:py-10 rounded-[3rem] text-3xl md:text-5xl font-black shadow-[0_30px_60px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-700 w-full md:w-auto overflow-hidden active:scale-95"
              >
                <div className="relative z-10 flex items-center gap-4">
                    <Rocket className="text-indigo-600 group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform duration-500" />
                    ACTIVATE PREMIUM
                    <ArrowRight className="group-hover:translate-x-3 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-indigo-50 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>

              <div className="mt-16 flex flex-wrap justify-center gap-10 text-white/40 font-black text-[10px] uppercase tracking-[0.3em]">
                <span className="flex items-center gap-2"><CreditCard size={14} className="text-indigo-300" /> Secure Payment</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> One-Time Cost</span>
                <span className="flex items-center gap-2"><Zap size={14} className="text-yellow-400" /> Global Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center opacity-50">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Node-ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">© LESSONS FRAMEWORK 2026</p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;