// src/components/Pricing.jsx
import React, { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, Crown, Star, Sparkles, Rocket, Gem, Trophy, Flame, 
  CheckCircle2, XCircle, ShieldCheck, creditCard, ArrowRight
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

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
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
        <p className="mt-8 text-indigo-400 font-black tracking-[0.4em] uppercase text-xs animate-pulse">Syncing Plans...</p>
      </div>
    );
  }

  // --- Not Logged In ---
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 text-center border border-slate-100"
        >
          <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-indigo-600">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Access Denied</h1>
          <p className="text-slate-500 font-medium mb-10 leading-relaxed">Please authenticate your account to unlock premium pricing and exclusive membership benefits.</p>
          <Link to="/login" className="block">
            <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
              Go to Login
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
          <h1 className="text-3xl font-black text-slate-900 mb-4 uppercase italic">Profile Desync</h1>
          <p className="text-slate-500 font-bold mb-8 uppercase tracking-tighter text-sm">Firebase UID: {user.uid}</p>
          <div className="bg-rose-50 p-6 rounded-2xl text-rose-700 font-bold text-sm leading-relaxed mb-6 italic">
            "Account found but local data records are missing. Please re-login to re-sync with the mainframe."
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
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[150px]"></div>
        </div>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full bg-white/5 backdrop-blur-3xl rounded-[4rem] p-12 md:p-20 text-center border border-white/10 shadow-[0_0_100px_rgba(16,185,129,0.1)]"
        >
          <div className="relative inline-block mb-10">
            <Trophy className="w-32 h-32 text-emerald-400 mx-auto drop-shadow-[0_0_30px_rgba(52,211,153,0.5)]" />
            <Sparkles className="absolute -top-4 -right-4 w-12 h-12 text-yellow-400 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none">ELITE<br/><span className="text-emerald-400">MEMBER</span></h1>
          <p className="text-emerald-100/60 font-bold text-lg uppercase tracking-[0.3em] mb-12 italic">Lifetime Access Confirmed</p>
          <div className="py-6 px-10 bg-emerald-500 text-[#064e3b] rounded-3xl font-black text-2xl inline-block shadow-2xl shadow-emerald-500/20">
            PREMIUM ACTIVATED
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
      toast.error("Stripe gateway interrupted.");
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
    <div className="min-h-screen bg-[#fcfcfd] py-16 lg:py-24 px-4 sm:px-10 relative overflow-hidden">
      {/* Abstract Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full blur-[120px] opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100 rounded-full blur-[150px] opacity-50 -z-10"></div>

      <div className="max-w-7xl mx-auto">
        {/* --- Header Section --- */}
        <div className="text-center mb-24" data-aos="fade-down">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.3em] border border-indigo-100 mb-6 shadow-sm">
             <Gem size={14} className="animate-bounce" /> Membership Access
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none mb-8">
            LEVEL<span className="text-indigo-600">.</span>UP
          </h1>
          <p className="text-slate-400 font-bold text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
            One small investment for a <span className="text-slate-900 underline decoration-indigo-500 underline-offset-8">lifetime</span> of knowledge and premium perks.
          </p>
        </div>

        {/* --- Pricing Table Card --- */}
        <div className="bg-white rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)] border border-slate-50 overflow-hidden" data-aos="fade-up">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-10 text-left text-2xl font-black uppercase tracking-tighter">Feature Matrix</th>
                  <th className="p-10 text-center text-xl font-black uppercase tracking-widest text-slate-400">Free</th>
                  <th className="p-10 text-center text-xl font-black uppercase tracking-widest text-indigo-400">
                    <div className="flex items-center justify-center gap-2">
                       <Crown className="fill-current" /> Premium
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {features.map((row, i) => (
                  <tr key={i} className="group hover:bg-slate-50 transition-colors duration-300">
                    <td className="p-8 text-slate-600 font-bold text-lg">{row.feature}</td>
                    <td className="p-8 text-center">
                      {row.free === "Yes" ? (
                        <CheckCircle2 className="mx-auto text-emerald-500" />
                      ) : row.free === "No" ? (
                        <XCircle className="mx-auto text-rose-300" />
                      ) : (
                        <span className="px-4 py-1.5 bg-slate-100 rounded-full text-xs font-black text-slate-500 uppercase">{row.free}</span>
                      )}
                    </td>
                    <td className="p-8 text-center">
                      <div className="flex items-center justify-center gap-2 text-indigo-600 font-black text-lg">
                        {row.premium === "Forever" ? <Flame size={18} className="text-orange-500 fill-current" /> : null}
                        {row.premium}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- CTA Section --- */}
          <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-12 md:p-24 text-center relative overflow-hidden">
            {/* Visual Accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10">
              <p className="text-indigo-200 font-black text-sm uppercase tracking-[0.5em] mb-4">Total Transparency Pricing</p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
                <h2 className="text-7xl md:text-9xl font-black text-white tracking-tighter">৳1500</h2>
                <div className="h-20 w-[2px] bg-white/10 hidden md:block"></div>
                <div className="text-left">
                  <p className="text-white/60 font-bold text-xl line-through italic">৳5000 VALUE</p>
                  <p className="text-indigo-300 font-black text-2xl uppercase tracking-tighter">One-Time Activation</p>
                </div>
              </div>

              {/* Advanced Interactive Button */}
              <button
                onClick={handleUpgrade}
                className="group relative inline-flex items-center justify-center gap-4 bg-white text-indigo-900 px-10 py-6 md:px-16 md:py-8 rounded-[2.5rem] text-2xl md:text-4xl font-black shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-white/20 hover:scale-105 transition-all duration-500 w-full md:w-auto"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                    <Gem className="group-hover:-translate-y-12 transition-transform duration-500" />
                    <Star className="absolute translate-y-12 group-hover:translate-y-0 transition-transform duration-500 text-yellow-500 fill-current" />
                </div>
                
                UPGRADE NOW
                
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                
                {/* Button Glow */}
                <span className="absolute inset-0 rounded-[2.5rem] ring-8 ring-white/10 animate-pulse"></span>
              </button>

              <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/50 font-black text-[10px] uppercase tracking-widest">
                <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-400" /> Secure Checkout</span>
                <span className="flex items-center gap-2"><Sparkles size={14} className="text-yellow-400" /> Instant Access</span>
                <span className="flex items-center gap-2"><Rocket size={14} className="text-indigo-300" /> No Monthly Sub</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Footer Branding --- */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-6 px-10">
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-ping"></div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Stripe Verified Partner</p>
           </div>
           <p className="text-slate-400 font-bold text-sm tracking-widest">© 2026 LESSONS Mainframe • All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

// Internal Components missing in code snippets
const AlertTriangle = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
)

export default Pricing;