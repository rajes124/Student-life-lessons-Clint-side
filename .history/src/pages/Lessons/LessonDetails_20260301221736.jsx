// src/pages/LessonDetails.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; 
import api from "../../utils/api"; 
import toast from "react-hot-toast";
import { motion, useScroll, useSpring } from "framer-motion"; 
import { 
  Lock, Heart, Bookmark, Share2, Calendar, Clock, Eye, 
  ChevronLeft, Sparkles, Layout, ArrowRight, ShieldAlert, AlertCircle,
  User, ExternalLink, Quote 
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

  // --- Logic Functions (Keeping your core same) ---
  const handleLike = async () => {
    if (!currentUser) return navigate("/login");
    try {
      await api.post(`/lessons/like/${id}`);
      setLiked(!liked);
      setLesson(prev => ({ 
        ...prev, 
        likesCount: liked ? (prev.likesCount || 1) - 1 : (prev.likesCount || 0) + 1 
      }));
      toast.success(liked ? "Unliked" : "Added to Favorites");
    } catch (err) { toast.error("Action failed"); }
  };

  const handleSave = async () => {
    if (!currentUser) return navigate("/login");
    try {
      await api.post(`/lessons/favorite/${id}`);
      setSaved(!saved);
      toast.success(saved ? "Removed" : "Saved to Library");
    } catch (err) { toast.error("Action failed"); }
  };

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
        if (!data) throw new Error("Not found");
        setLesson(data);
        if (currentUser) {
          setLiked(data.likes?.includes(currentUser.uid) || false);
          setSaved(data.savedBy?.includes(currentUser.uid) || false);
        }
        fetchSimilarLessons(data.category, data.emotionalTone, data._id);
      } catch (error) { toast.error("Error loading"); }
      finally { setLoading(false); }
    };
    fetchLesson();
  }, [id, currentUser, fetchSimilarLessons]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-1 bg-slate-100 overflow-hidden rounded-full">
            <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ repeat: Infinity, duration: 1 }} className="h-full w-1/2 bg-indigo-600" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Story</p>
      </div>
    </div>
  );

  const isPremiumLocked = lesson.accessLevel === "Premium" && !userData?.isPremium;

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans selection:bg-indigo-600 selection:text-white">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 z-[9999]" style={{ scaleX }} />

      {/* Floating Header */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-[1000] bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-2xl px-5 py-3 flex justify-between items-center shadow-sm">
        <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-tighter">Back</span>
        </button>
        <div className="h-4 w-px bg-slate-200 mx-2 hidden sm:block"></div>
        <p className="flex-1 text-center text-sm font-black text-slate-900 truncate px-4 hidden sm:block">
            {lesson.title}
        </p>
        <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-indigo-600"><Share2 size={18} /></button>
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200"></div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: MEDIA & INFO (Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] group">
                <img src={lesson.imageURL || defaultImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                    <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                        {lesson.category}
                    </span>
                    {lesson.accessLevel === "Premium" && (
                        <span className="bg-amber-400 text-slate-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                            <Sparkles size={12} /> Premium
                        </span>
                    )}
                </div>
            </div>

            {/* Author Quick Card */}
            <div className="bg-white rounded-[1.5rem] p-6 border border-slate-200/60 shadow-sm flex items-center gap-4">
                <img src={lesson.creatorPhoto || "https://i.pravatar.cc/100"} className="w-14 h-14 rounded-2xl object-cover" alt="" />
                <div className="flex-1">
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Storyteller</p>
                    <h4 className="text-lg font-black text-slate-900 leading-tight">{lesson.creatorName}</h4>
                </div>
                <Link to={`/profile/${lesson.creatorId}`} className="p-3 bg-slate-50 hover:bg-indigo-600 hover:text-white rounded-xl transition-all">
                    <ExternalLink size={18} />
                </Link>
            </div>
          </div>

          {/* RIGHT: THE STORY CONTENT */}
          <div className="lg:col-span-7 space-y-8">
            <header className="space-y-4">
                <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                    {lesson.title}
                </h1>
                <div className="flex items-center gap-6 py-4 border-y border-slate-100">
                    <div className="flex items-center gap-2 text-slate-400">
                        <Calendar size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{new Date(lesson.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                        <Clock size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">5 min read</span>
                    </div>
                </div>
            </header>

            <article className="relative bg-white p-8 md:p-14 rounded-[2.5rem] border border-slate-200/50 shadow-sm">
                <Quote size={40} className="text-indigo-600/10 absolute top-8 left-8" />
                <div className="relative z-10 prose prose-slate max-w-none">
                    <p className="text-slate-700 text-lg md:text-2xl leading-[1.7] font-serif whitespace-pre-line">
                        {lesson.description}
                    </p>
                </div>

                {isPremiumLocked && (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-xl z-20 flex items-center justify-center p-6 rounded-[2.5rem]">
                        <div className="text-center max-w-sm bg-white p-10 rounded-[2rem] shadow-2xl border border-slate-100">
                            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Lock size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-2">Exclusive Insight</h3>
                            <p className="text-slate-500 text-sm mb-8 font-medium">This student's deeper experience is part of our premium community.</p>
                            <button onClick={() => navigate("/pricing")} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-indigo-200">
                                Unlock Masterclass
                            </button>
                        </div>
                    </div>
                )}
            </article>

            {/* Engagement Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-600 rounded-[2rem] p-8 text-white relative overflow-hidden group">
                    <Eye size={80} className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-transform" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-1">Global Views</p>
                    <h3 className="text-4xl font-black tracking-tighter">12.4K</h3>
                </div>
                <div className="bg-white border border-slate-200 rounded-[2rem] p-8 text-slate-900 relative overflow-hidden group">
                    <AlertCircle size={80} className="absolute -bottom-4 -right-4 opacity-5 group-hover:scale-110 transition-transform" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Emotional Tone</p>
                    <h3 className="text-4xl font-black tracking-tighter text-indigo-600">{lesson.emotionalTone}</h3>
                </div>
            </div>
          </div>
        </div>
      </main>

      {/* DYNAMIC FLOATING ACTION BAR */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[1000] w-auto">
        <motion.div 
            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="bg-slate-900/90 backdrop-blur-xl text-white px-8 py-5 rounded-full flex items-center gap-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10"
        >
          <button onClick={handleLike} className={`group flex items-center gap-2 transition-all ${liked ? 'text-rose-400 scale-110' : 'text-slate-400 hover:text-rose-400'}`}>
            <Heart size={22} fill={liked ? "currentColor" : "none"} className="group-active:scale-150 transition-transform" />
            <span className="text-sm font-black tracking-tighter">{lesson.likesCount || 0}</span>
          </button>
          
          <div className="w-px h-6 bg-white/10" />
          
          <button onClick={handleSave} className={`group transition-all ${saved ? 'text-indigo-400 scale-110' : 'text-slate-400 hover:text-indigo-400'}`}>
            <Bookmark size={22} fill={saved ? "currentColor" : "none"} />
          </button>

          <div className="w-px h-6 bg-white/10" />

          <button className="text-slate-400 hover:text-amber-500 transition-colors">
            <ShieldAlert size={22} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default LessonDetails;