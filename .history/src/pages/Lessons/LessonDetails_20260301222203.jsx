// src/pages/LessonDetails.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import api from "../../utils/api"; 
import toast from "react-hot-toast";
import { motion, useScroll, useSpring } from "framer-motion"; 
import { 
  Lock, Heart, Bookmark, Share2, Calendar, Clock, Eye, 
  ChevronLeft, Sparkles, Layout, ShieldAlert, 
  Zap, MessageCircle, Star, Target
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

// AOS Import
import AOS from 'aos';
import 'aos/dist/aos.css';

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

  const defaultImage = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop";

  // AOS Initialization
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Actions (Keeping your original logic)
  const handleLike = async () => {
    if (!currentUser) return navigate("/login");
    try {
      await api.post(`/lessons/like/${id}`);
      setLiked(!liked);
      setLesson(prev => ({ ...prev, likesCount: liked ? (prev.likesCount || 1) - 1 : (prev.likesCount || 0) + 1 }));
      toast.success(liked ? "Like removed" : "Added to favorites!");
    } catch (err) { toast.error("Action failed"); }
  };

  const handleSave = async () => {
    if (!currentUser) return navigate("/login");
    try {
      await api.post(`/lessons/favorite/${id}`);
      setSaved(!saved);
      toast.success(saved ? "Removed from Library" : "Saved to Library");
    } catch (err) { toast.error("Action failed"); }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchLesson = async () => {
      try {
        const res = await api.get(`/lessons/details/${id}`);
        const data = res.data.lesson || res.data;
        setLesson(data);
        if (currentUser) {
          setLiked(data.likes?.includes(currentUser.uid) || false);
          setSaved(data.savedBy?.includes(currentUser.uid) || false);
        }
      } catch (error) { toast.error("Lesson not found."); navigate("/404"); }
      finally { setLoading(false); }
    };
    fetchLesson();
  }, [id, currentUser, navigate]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#fdfdfd]">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );

  const isPremiumLocked = lesson.accessLevel === "Premium" && !userData?.isPremium;

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-32 font-sans selection:bg-indigo-600 selection:text-white overflow-x-hidden">
      {/* Scroll Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-indigo-600 z-[10000]" style={{ scaleX }} />

      {/* Floating Modern Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-[1000] bg-white/70 backdrop-blur-2xl border border-white shadow-2xl shadow-indigo-100/50 rounded-[2rem] px-6 py-4 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-indigo-50 rounded-xl transition-all active:scale-95">
          <ChevronLeft size={24} className="text-slate-800" />
        </button>
        <div className="hidden md:flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">Mindset</span>
            <div className="h-4 w-px bg-slate-200"></div>
            <p className="text-sm font-black text-slate-800 truncate max-w-[300px]">{lesson.title}</p>
        </div>
        <button className="p-2 bg-slate-900 text-white rounded-xl shadow-lg shadow-slate-200"><Share2 size={20} /></button>
      </nav>

      <div className="max-w-7xl mx-auto px-4 pt-32">
        {/* HERO - Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20">
            <div data-aos="fade-right">
                <div className="flex items-center gap-2 mb-6">
                    <Zap className="text-amber-500 fill-amber-500" size={20} />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Featured Experience</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-8">
                    {lesson.title}
                </h1>
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100">
                        <Calendar className="text-indigo-600" size={18} />
                        <span className="text-xs font-bold text-slate-600">{new Date(lesson.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100">
                        <Clock className="text-indigo-600" size={18} />
                        <span className="text-xs font-bold text-slate-600">5 Min Read</span>
                    </div>
                </div>
            </div>
            <div className="relative" data-aos="zoom-in" data-aos-delay="200">
                <div className="absolute -inset-4 bg-indigo-600/5 blur-3xl rounded-full"></div>
                <img 
                    src={lesson.imageURL || defaultImage} 
                    className="relative w-full aspect-video md:aspect-square object-cover rounded-[3rem] shadow-2xl border-8 border-white" 
                    alt="" 
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-[2rem] shadow-xl border border-slate-50 hidden md:block">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white"><Star fill="white" /></div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-slate-400">Top Rated</p>
                            <p className="text-sm font-black text-slate-800">Community Choice</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* MAIN BODY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* CONTENT AREA */}
            <div className="lg:col-span-8" data-aos="fade-up">
                <div className="bg-white p-8 md:p-16 rounded-[4rem] border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03]"><Layout size={200} /></div>
                    <div className="relative z-10 prose prose-indigo prose-2xl max-w-none">
                        <p className="text-slate-600 leading-[1.8] font-serif italic text-xl md:text-3xl first-letter:text-8xl first-letter:font-black first-letter:text-indigo-600 first-letter:mr-4 first-letter:float-left whitespace-pre-line">
                            {lesson.description}
                        </p>
                    </div>

                    {isPremiumLocked && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-2xl z-20 flex items-center justify-center p-8">
                            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-10 rounded-[3rem] shadow-2xl text-center max-w-sm border border-slate-100">
                                <Lock size={48} className="mx-auto text-amber-500 mb-6" />
                                <h3 className="text-2xl font-black text-slate-900 mb-4">Premium Membership Required</h3>
                                <button onClick={() => navigate("/pricing")} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100">
                                    Unlock Now
                                </button>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>

            {/* SIDEBAR - Removed Profile, Added Wisdom Cards */}
            <div className="lg:col-span-4 space-y-8">
                {/* Wisdom Insight Card */}
                <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden" data-aos="fade-left">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 blur-3xl"></div>
                    <Target className="text-indigo-400 mb-6" size={40} />
                    <h3 className="text-2xl font-black mb-4 leading-tight">Key Takeaway from this Lesson</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8">
                        Small habits lead to big transformations. Focus on 1% improvement every single day.
                    </p>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center"><MessageCircle size={20} /></div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">92% Student Success Rate</p>
                    </div>
                </div>

                {/* Engagement Stats Card */}
                <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm" data-aos="fade-left" data-aos-delay="200">
                    <div className="flex justify-between items-center mb-8">
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Lesson Reach</h4>
                        <Eye className="text-indigo-600" size={20} />
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-end gap-2">
                            <span className="text-5xl font-black text-slate-900 leading-none">14.8K</span>
                            <span className="text-xs font-bold text-emerald-500 mb-1">+12%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: '75%' }} className="h-full bg-indigo-600" />
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Global Community Interaction</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* FLOATING ACTION PILL */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[5000]">
        <motion.div 
            initial={{ y: 100 }} animate={{ y: 0 }}
            className="bg-slate-900/90 backdrop-blur-2xl text-white px-10 py-6 rounded-full flex items-center gap-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] border border-white/10"
        >
          <button onClick={handleLike} className={`group flex flex-col items-center gap-1 transition-all ${liked ? 'text-rose-400 scale-110' : 'text-slate-400 hover:text-rose-400'}`}>
            <Heart size={26} fill={liked ? "currentColor" : "none"} className="group-active:scale-150 transition-all" />
            <span className="text-[10px] font-black">{lesson.likesCount || 0}</span>
          </button>
          
          <div className="w-px h-8 bg-white/10"></div>
          
          <button onClick={handleSave} className={`group transition-all ${saved ? 'text-indigo-400 scale-125' : 'text-slate-400 hover:text-indigo-400'}`}>
            <Bookmark size={26} fill={saved ? "currentColor" : "none"} />
          </button>

          <div className="w-px h-8 bg-white/10"></div>

          <button className="text-slate-400 hover:text-orange-400 transition-colors">
            <ShieldAlert size={26} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default LessonDetails;