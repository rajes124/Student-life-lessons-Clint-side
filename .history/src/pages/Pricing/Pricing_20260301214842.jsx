// src/components/Pricing.jsx
import React, { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, Crown, Star, Sparkles, Rocket, Gem, Trophy, Flame, 
  CheckCircle2, XCircle, ShieldCheck, CreditCard, ArrowRight, AlertTriangle,
  BadgeCheck, MousePointer2, Layers
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";

const Pricing = () => {
  const { currentUser: user, userData: dbUser, loading: authLoading } = useAuth();

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: "ease-in-out-back",
    });
  }, []);

  // --- Next Level Loading ---
  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617]">
        <div className="relative w-24 h-24">
          <motion.div 
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 border-t-4 border-indigo-500 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.5)]"
          />
          <Gem className="w-10 h-10 text-indigo-400 absolute inset-0 m-auto animate-pulse" />
        </div>
        <p className="mt-10 text-indigo-300 font-black tracking-[0.6em] uppercase text-[10px]">Accessing Database...</p>
      </div>
    );
  }

  // --- Auth & State Screens ---
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-12 text-center border border-slate-100">
          <ShieldCheck size={60} className="mx-auto text-indigo-600 mb-6" />
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Locked</h1>
          <p className="text-slate-400 font-bold mb-8 uppercase text-xs tracking-widest leading-relaxed">Identity verification required to view premium mainframe pricing.</p>
          <Link to="/login" className="block w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg active:scale-95">Secure Login</Link>
        </motion.div>
      </div>
    );
  }

  if (dbUser?.isPremium) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.5),transparent)] animate-pulse" />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-2xl w-full bg-white/5 backdrop-blur-2xl rounded-[4rem] p-16 md:p-24 text-center border border-white/10 shadow-2xl shadow-indigo-500/10">
          <Trophy className="w-32 h-32 text-amber-400 mx-auto mb-10 drop-shadow-[0_0_25px_rgba(251,191,36,0.5)]" />
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">ELITE<br/><span className="text-indigo-400">ACTIVE</span></h1>
          <p className="text-indigo-100/40 font-black text-sm uppercase tracking-[0.5em] mb-12 italic">One-Time Activation Successful</p>
          <div className="py-5 px-12 bg-indigo-500 text-white rounded-full font-black text-xl md:text-2xl inline-block shadow-2xl shadow-indigo-500/20 uppercase tracking-widest animate-bounce">Premium Member</div>
        </motion.div>
      </div>
    );
  }

  const handleUpgrade = async () => {
    try {
      const res = await axios.post("https://lessons-backend-six.vercel.app/api/stripe/create-checkout-session", { email: user.email, uid: user.uid });
      window.location.href = res.data.url;
    } catch (error) { toast.error("Gateway Link Interrupted."); }
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
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-50 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- Dynamic Header --- */}
        <header className="text-center mb-24" data-aos="fade-down">
          <div className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.3em] border border-slate-100 mb-8 shadow-xl shadow-indigo-100/30">
             <Layers size={14} className="animate-spin-slow" /> Network Node 4.0
          </div>
          <h1 className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter leading-none mb-8">
            PRICING<span className="text-indigo-600">.</span>HUB
          </h1>
          <p className="text-slate-400 font-bold text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed uppercase tracking-tighter">
            Unlock the full potential with <span className="text-slate-900 underline decoration-indigo-500 underline-offset-8">lifetime</span> premium access – one-time payment.
          </p>
        </header>

        {/* --- Feature Comparison Matrix --- */}
        <div className="bg-white/80 backdrop-blur-3xl rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] border border-white overflow-hidden" data-aos="zoom-in-up">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-10 text-left text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">Mainframe Capabilities</th>
                  <th className="p-10 text-center text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">Free Tier</th>
                  <th className="p-10 text-center text-[11px] font-black uppercase tracking-[0.5em] text-indigo-400">Premium Mod</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {features.map((row, i) => (
                  <tr key={i} className="group hover:bg-slate-50/50 transition-colors duration-300">
                    <td className="p-8 text-slate-700 font-black text-lg uppercase tracking-tighter italic flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-indigo-600 transition-colors" />
                        {row.feature}
                    </td>
                    <td className="p-8 text-center">
                      {row.free === "Yes" ? (
                        <BadgeCheck className="mx-auto text-emerald-500 drop-shadow-md" />
                      ) : row.free === "No" ? (
                        <XCircle className="mx-auto text-slate-200" />
                      ) : (
                        <span className="px-5 py-2 bg-slate-100 rounded-2xl text-[10px] font-black text-slate-500 uppercase italic">{row.free}</span>
                      )}
                    </td>
                    <td className="p-8 text-center">
                      <div className="flex items-center justify-center gap-2 text-indigo-600 font-black text-xl uppercase tracking-tighter italic">
                        {row.premium === "Forever" && <Flame size={18} className="text-orange-500 animate-pulse" />}
                        {row.premium}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- CTA High-Voltage Section --- */}
          <div className="bg-indigo-50/50 p-12 md:p-24 text-center border-t border-slate-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full" />
            
            <div className="mb-16">
               <p className="text-indigo-600 font-black text-xs uppercase tracking-[0.5em] mb-6 animate-pulse">Investment Summary</p>
               <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-4">
                  <h2 className="text-8xl md:text-[10rem] font-black text-slate-900 tracking-tighter leading-none">৳1500</h2>
                  <div className="text-left">
                    <p className="text-slate-300 font-black text-3xl line-through decoration-rose-500 decoration-4 italic">৳5,000</p>
                    <p className="text-slate-500 font-bold text-xl uppercase tracking-widest italic">One-Time Activation</p>
                  </div>
               </div>
               <p className="text-slate-400 font-bold text-lg uppercase tracking-widest italic">Lifetime Access • No Subscription • Instant Mainframe Sync</p>
            </div>

            {/* --- YOUR ORIGINAL DESIGN PREMIUM BUTTON (RETAINED) --- */}
            <button
              onClick={handleUpgrade}
              className="group relative inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-gradient-to-r from-white via-gray-50 to-white text-[#03373D] px-10 py-6 sm:px-14 md:px-16 lg:px-20 rounded-3xl text-2xl sm:text-3xl md:text-4xl font-extrabold shadow-2xl hover:shadow-[0_0_80px_rgba(79,70,229,0.5)] hover:scale-105 sm:hover:scale-110 transition-all duration-700 transform border-4 border-indigo-400/30 w-full sm:w-auto overflow-hidden active:scale-95"
            >
              {/* Left Icons */}
              <div className="flex items-center gap-3 sm:gap-4">
                <Gem className="w-10 h-10 sm:w-11 md:w-12 text-indigo-600 group-hover:scale-125 transition-all duration-500" />
                <Crown className="w-9 h-9 sm:w-10 md:w-11 text-yellow-500 group-hover:scale-150 group-hover:rotate-12 transition-all duration-700" />
              </div>

              <span className="block uppercase tracking-tighter italic">Upgrade to Premium Now</span>

              {/* Right Icons */}
              <div className="flex items-center gap-3 sm:gap-4">
                <Flame className="w-9 h-9 sm:w-10 md:w-11 text-orange-500 group-hover:translate-y-[-10px] group-hover:rotate-[-15deg] transition-all duration-700" />
                <Trophy className="w-10 h-10 sm:w-11 md:w-12 text-yellow-600 group-hover:rotate-180 group-hover:scale-125 transition-all duration-1000" />
                <Rocket className="w-10 h-10 sm:w-11 md:w-12 text-pink-500 group-hover:translate-x-3 group-hover:-translate-y-3 transition-all duration-700" />
              </div>

              {/* Advanced Glow Effects */}
              <span className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <span className="absolute inset-0 rounded-3xl bg-white/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </button>
            {/* --- END ORIGINAL BUTTON --- */}

          </div>
        </div>

        {/* --- Secure Footer --- */}
        <footer className="mt-20 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-10 opacity-60">
           <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-ping" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Stripe Verified Gateway Terminal</p>
           </div>
           <div className="flex items-center gap-10">
              <span className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest"><CreditCard size={14} /> Full Encryption</span>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">© Studio Lessons • Management Module v4.8</p>
           </div>
        </footer>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Pricing;