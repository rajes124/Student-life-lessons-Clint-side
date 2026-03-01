// src/pages/LessonDetails.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; 
import api from "../../utils/api"; 
import toast from "react-hot-toast";
import { motion, useScroll, useSpring } from "framer-motion"; 
import { 
  Lock, Heart, Bookmark, Share2, Calendar, Clock, Eye, 
  ChevronLeft, Sparkles, Layout, ArrowRight, ShieldAlert, AlertCircle,
  User, ExternalLink // Added User and ExternalLink
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const LessonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [similarLessons, setSimilarLessons] = useState([]);

  const defaultImage = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop";

  const fetchSimilarLessons = useCallback(async (category, tone, currentId) => {
    try {
      const res = await api.get("/lessons/public");
      const allLessons = res.data.lessons || [];
      const filtered = allLessons
        .filter(l => l._id !== currentId && (l.category === category || l.emotionalTone === tone))
        .slice(0, 3);
      setSimilarLessons(filtered);
    } catch (err) { console.error(err); }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchLesson = async () => {
      try {
        const res = await api.get(`/lessons/details/${id}`);
        const data = res.data.lesson || res.data;
        if (!data) throw new Error("Lesson not found");
        
        setLesson(data);

        if (currentUser) {
          setLiked(data.likes?.includes(currentUser.uid) || false);
          setSaved(data.savedBy?.includes(currentUser.uid) || false);
        }
        fetchSimilarLessons(data.category, data.emotionalTone, data._id);
      } catch (error) {
        toast.error("Error loading story");
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [id, currentUser, fetchSimilarLessons]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBFCFE]">
      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!lesson) return null;

  const isPremiumLocked = lesson.accessLevel === "Premium" && !userData?.isPremium;

  return (
    <div className="bg-[#FBFCFE] min-h-screen pb-24 font-sans">
      {/* Scroll Progress Bar - Highest Z-Index */}
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-indigo-600 z-[9999] origin-left" style={{ scaleX }} />

      {/* 1. FIXED NAVBAR: z-index বাড়িয়ে এবং টপ মার্জিন ঠিক করা হয়েছে */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-white/70 backdrop-blur-md border-b border-gray-100 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-all">
            <ChevronLeft size={22} className="text-slate-700" />
          </button>
          
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-indigo-200">S</div>
             <p className="text-sm font-black text-slate-800 hidden sm:block truncate max-w-[200px]">{lesson.title}</p>
          </div>

          <div className="flex items-center gap-2">
             <button className="p-2 hover:bg-slate-100 rounded-full text-slate-600"><Share2 size={18} /></button>
             <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-gray-200">
               <img src={currentUser?.photoURL || "https://i.pravatar.cc/100"} alt="User" />
             </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 pt-24 md:pt-32">
        {/* HERO SECTION */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
           className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[400px] md:h-[550px]"
        >
          <img src={lesson.imageURL || defaultImage} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-16">
            <div className="flex gap-2 mb-4">
               <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/30">{lesson.category}</span>
               {lesson.accessLevel === "Premium" && (
                 <span className="bg-amber-400 text-amber-950 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg shadow-amber-400/30">
                   <Sparkles size={12} /> Premium
                 </span>
               )}
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-tight tracking-tighter drop-shadow-2xl">{lesson.title}</h1>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12">
          {/* LEFT: CONTENT */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 md:p-14 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="prose prose-xl max-w-none relative z-10">
                <p className="text-slate-600 leading-[1.8] font-serif italic text-xl md:text-2xl first-letter:text-7xl first-letter:font-black first-letter:text-indigo-600 first-letter:mr-3 first-letter:float-left whitespace-pre-line">
                  {lesson.description}
                </p>
              </div>

              {isPremiumLocked && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-xl z-20 flex items-center justify-center p-8">
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-10 rounded-[3rem] shadow-2xl text-center max-w-sm border border-slate-50">
                    <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <Lock size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Locked Wisdom</h3>
                    <p className="text-slate-500 text-sm mb-8">This experience is reserved for premium students. Join the elite circle to unlock.</p>
                    <button onClick={() => navigate("/pricing")} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">
                      Upgrade to Unlock
                    </button>
                  </motion.div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: SIDEBAR */}
          <div className="lg:col-span-4 space-y-8">
            {/* 2. PORTFOLIO SECTION: লিঙ্ক ঠিক করা হয়েছে */}
            <div className="bg-[#0B0F1A] rounded-[3rem] p-10 text-white text-center shadow-2xl shadow-slate-200">
               <div className="relative w-28 h-28 mx-auto mb-6">
                 <img src={lesson.creatorPhoto || "https://i.pravatar.cc/150"} className="w-full h-full rounded-[2.5rem] object-cover ring-4 ring-white/10" alt="" />
                 <div className="absolute -bottom-2 -right-2 bg-indigo-500 p-2.5 rounded-2xl border-4 border-[#0B0F1A]">
                    <User size={18} /> 
                 </div>
               </div>
               <h3 className="text-2xl font-black tracking-tight">{lesson.creatorName || "Elite Student"}</h3>
               <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2 mb-8">THE MASTERMIND</p>
               
               {/* Portfolio Button Link */}
               <Link 
                to={`/profile/${lesson.creatorId}`} 
                className="flex items-center justify-center gap-2 w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-sm font-black transition-all group"
               >
                 View Portfolio <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>

            {/* Global Interaction Card */}
            <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm">
               <div className="flex items-center gap-3 mb-6">
                 <div className="bg-indigo-50 p-2 rounded-xl text-indigo-600"><Layout size={20} /></div>
                 <h4 className="font-black text-slate-800 uppercase text-[10px] tracking-widest">Global Interaction</h4>
               </div>
               <div className="flex justify-between text-xs font-bold text-slate-500 mb-3">
                 <span>Popularity Index</span>
                 <span className="text-indigo-600">88%</span>
               </div>
               <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                 <motion.div initial={{ width: 0 }} animate={{ width: '88%' }} className="h-full bg-indigo-500" />
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* FIXED BOTTOM ACTION BAR */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[1000] w-[90%] sm:w-auto">
        <div className="bg-slate-900/95 backdrop-blur-xl text-white px-8 py-5 rounded-[2.5rem] flex items-center gap-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10">
          <button onClick={handleLike} className={`group flex flex-col items-center gap-1 transition-all ${liked ? 'text-rose-400' : 'text-slate-400 hover:text-rose-400'}`}>
            <Heart size={24} fill={liked ? "currentColor" : "none"} className="group-active:scale-150 transition-transform" />
            <span className="text-[10px] font-black">{lesson.likesCount || 0}</span>
          </button>
          <div className="w-px h-8 bg-white/10" />
          <button onClick={handleSave} className={`group transition-all ${saved ? 'text-indigo-400 scale-125' : 'text-slate-400 hover:text-indigo-400'}`}>
            <Bookmark size={24} fill={saved ? "currentColor" : "none"} />
          </button>
          <div className="w-px h-8 bg-white/10" />
          <button className="text-slate-400 hover:text-indigo-400 transition-colors">
            <Share2 size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;