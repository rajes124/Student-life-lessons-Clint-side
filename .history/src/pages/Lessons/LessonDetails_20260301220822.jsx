// src/pages/LessonDetails.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; 
import api from "../../utils/api"; 
import toast from "react-hot-toast";
import { motion, useScroll, useSpring } from "framer-motion"; 
import { 
  Lock, Heart, Bookmark, Share2, Calendar, Clock, Eye, 
  ChevronLeft, Sparkles, Layout, ArrowRight, ShieldAlert, AlertCircle,User
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const LessonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();
  
  // Scroll animation
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [similarLessons, setSimilarLessons] = useState([]);
  const [views, setViews] = useState(0);

  const defaultImage = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop";

  // Optimized Similar Lessons Fetcher
  const fetchSimilarLessons = useCallback(async (category, tone, currentId) => {
    try {
      const res = await api.get("/lessons/public");
      const allLessons = res.data.lessons || [];
      const filtered = allLessons
        .filter(l => l._id !== currentId && (l.category === category || l.emotionalTone === tone))
        .slice(0, 3);
      setSimilarLessons(filtered);
    } catch (err) { console.error("Similar fetch error:", err); }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchLesson = async () => {
      try {
        const res = await api.get(`/lessons/details/${id}`);
        const data = res.data.lesson || res.data;
        
        if (!data) throw new Error("No data received");

        setLesson(data);

        if (currentUser) {
          setLiked(data.likes?.includes(currentUser.uid) || false);
          setSaved(data.savedBy?.includes(currentUser.uid) || false);
        }
        
        setViews(Math.floor(Math.random() * 5000) + 1200); // Realistic placeholder
        fetchSimilarLessons(data.category, data.emotionalTone, data._id);
      } catch (error) {
        console.error("500 Error details:", error.response?.data || error.message);
        toast.error("Internal Server Error (500). Please check backend.");
        // navigate("/404"); // Optional
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id, currentUser, fetchSimilarLessons]);

  // --- Actions ---
  const handleLike = async () => {
    if (!currentUser) return toast.error("Please login first");
    try {
      await api.post(`/lessons/like/${id}`);
      setLiked(!liked);
      setLesson(prev => ({ 
        ...prev, 
        likesCount: liked ? (prev.likesCount || 1) - 1 : (prev.likesCount || 0) + 1 
      }));
      toast.success(liked ? "Unliked" : "Loved it!", { icon: '❤️' });
    } catch (err) { toast.error("Server connection failed"); }
  };

  const handleSave = async () => {
    if (!currentUser) return toast.error("Please login first");
    try {
      await api.post(`/lessons/favorite/${id}`);
      setSaved(!saved);
      toast.success(saved ? "Removed" : "Saved to Library");
    } catch (err) { toast.error("Could not save"); }
  };

  const handleReport = () => {
    toast("Report feature coming soon!", { icon: '⚠️' });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FBFCFE]">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full mb-4"
      />
      <p className="text-indigo-900/40 font-black tracking-widest text-[10px] uppercase italic">Crafting Wisdom...</p>
    </div>
  );

  if (!lesson) return <div className="p-20 text-center">Lesson not found.</div>;

  const isPremiumLocked = lesson.accessLevel === "Premium" && !userData?.isPremium;

  return (
    <div className="bg-[#FBFCFE] min-h-screen pb-24 selection:bg-indigo-600 selection:text-white font-sans">
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-indigo-600 z-[100] origin-left" style={{ scaleX }} />

      {/* Modern Floating Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[94%] max-w-6xl z-50 bg-white/70 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.05)] rounded-[2rem] px-6 py-3 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="p-2.5 hover:bg-slate-100 rounded-2xl transition-all active:scale-90">
          <ChevronLeft size={22} className="text-slate-700" />
        </button>
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="hidden md:flex h-8 w-8 bg-indigo-50 rounded-lg items-center justify-center text-indigo-600 italic font-serif">W</div>
          <p className="text-sm font-black text-slate-800 truncate max-w-[120px] md:max-w-xs">{lesson.title}</p>
        </div>
        <button onClick={handleShare} className="p-2.5 bg-slate-900 text-white rounded-2xl hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-200">
          <Share2 size={18} />
        </button>
      </nav>

      <div className="max-w-6xl mx-auto px-4 pt-32">
        {/* HERO */}
        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[450px] md:h-[600px] group">
          <motion.img 
            initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 2 }}
            src={lesson.imageURL || defaultImage} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-2 mb-6">
              <span className="bg-indigo-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">{lesson.category}</span>
              {lesson.accessLevel === "Premium" && (
                <span className="bg-amber-400 text-amber-950 px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-xl shadow-amber-400/20">
                  <Sparkles size={12} /> Gold Access
                </span>
              )}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-8xl font-black text-white leading-none tracking-tighter"
            >
              {lesson.title}
            </motion.h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16">
          {/* LEFT: CONTENT */}
          <div className="lg:col-span-8">
            <div className="flex flex-wrap gap-4 mb-12">
               {[
                 { label: "Views", val: views, icon: Eye, color: "bg-emerald-50 text-emerald-600" },
                 { label: "Published", val: new Date(lesson.createdAt).toLocaleDateString(), icon: Calendar, color: "bg-blue-50 text-blue-600" },
                 { label: "Mood", val: lesson.emotionalTone, icon: AlertCircle, color: "bg-rose-50 text-rose-600" }
               ].map((stat, i) => (
                 <div key={i} className="flex-1 min-w-[120px] bg-white border border-slate-100 p-5 rounded-[2rem] shadow-sm flex flex-col items-center">
                    <div className={`${stat.color} p-3 rounded-2xl mb-3`}><stat.icon size={20} /></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                    <span className="text-sm font-bold text-slate-800 mt-1">{stat.val}</span>
                 </div>
               ))}
            </div>

            <div className="bg-white p-10 md:p-16 rounded-[4rem] border border-slate-50 shadow-sm relative">
              <div className="prose prose-indigo prose-xl max-w-none relative z-10">
                <p className="text-slate-600 leading-[2] font-serif italic text-xl md:text-2xl first-letter:text-7xl first-letter:font-black first-letter:text-indigo-600 first-letter:mr-3 first-letter:float-left">
                  {lesson.description}
                </p>
              </div>

              {isPremiumLocked && (
                <div className="absolute inset-4 bg-white/40 backdrop-blur-2xl z-20 rounded-[3.5rem] flex items-center justify-center border border-white/50">
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-10 rounded-[3rem] shadow-2xl text-center max-w-sm border border-slate-100">
                    <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
                      <Lock size={40} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">Masterpiece Locked</h3>
                    <p className="text-slate-400 text-sm mb-10 font-medium">This content is reserved for our Premium members only.</p>
                    <button onClick={() => navigate("/pricing")} className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-200 hover:bg-slate-900 transition-all">
                      Unlock Now
                    </button>
                  </motion.div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: SIDEBAR */}
          <div className="lg:col-span-4 space-y-10">
            <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white text-center shadow-2xl shadow-slate-200">
               <div className="relative w-32 h-32 mx-auto mb-6">
                 <img src={lesson.creatorPhoto || "https://i.pravatar.cc/150"} className="w-full h-full rounded-[2.5rem] object-cover ring-8 ring-white/5 shadow-2xl" alt="" />
                 <div className="absolute -bottom-2 -right-2 bg-indigo-500 p-3 rounded-2xl border-4 border-slate-900"><User size={20} /></div>
               </div>
               <h3 className="text-2xl font-black">{lesson.creatorName || "Elite Contributor"}</h3>
               <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2 mb-8 italic">The Mastermind</p>
               <button onClick={() => navigate(`/profile/${lesson.creatorId}`)} className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-black transition-all border border-white/5">
                 View Portfolio
               </button>
            </div>

            <div className="bg-indigo-50/50 rounded-[3.5rem] p-10 border border-indigo-100/50">
               <div className="flex items-center gap-4 mb-8">
                 <div className="bg-white p-3 rounded-2xl shadow-sm text-indigo-600"><Layout size={24} /></div>
                 <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Global Interaction</h4>
               </div>
               <div className="space-y-6">
                  <div className="flex justify-between text-sm font-bold text-slate-600">
                    <span>Popularity Index</span>
                    <span className="text-indigo-600">88%</span>
                  </div>
                  <div className="h-3 w-full bg-white rounded-full overflow-hidden border border-indigo-100">
                    <motion.div initial={{ width: 0 }} animate={{ width: '88%' }} className="h-full bg-indigo-500" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* SMART ACTION PILL (MOBILE OPTIMIZED) */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-slate-900/95 backdrop-blur-2xl text-white px-8 py-5 rounded-[2.5rem] flex items-center gap-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10">
          <button onClick={handleLike} className={`group flex flex-col items-center gap-1 transition-all ${liked ? 'text-rose-400' : 'text-slate-400 hover:text-rose-400'}`}>
            <Heart size={24} fill={liked ? "currentColor" : "none"} className="group-active:scale-150 transition-transform" />
            <span className="text-[10px] font-black">{lesson.likesCount || 0}</span>
          </button>
          <div className="w-px h-8 bg-white/10" />
          <button onClick={handleSave} className={`group transition-all ${saved ? 'text-indigo-400 scale-125' : 'text-slate-400 hover:text-indigo-400'}`}>
            <Bookmark size={24} fill={saved ? "currentColor" : "none"} />
          </button>
          <div className="w-px h-8 bg-white/10" />
          <button onClick={handleReport} className="text-slate-400 hover:text-amber-500 transition-colors">
            <ShieldAlert size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;