// src/pages/LessonDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; 
import api from "../../utils/api"; 
import toast from "react-hot-toast";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"; 
import { 
  Lock, Heart, Bookmark, Share2, Flag, Calendar, Clock, User, Eye, 
  ChevronLeft, Sparkles, Layout, ArrowRight, ShieldAlert
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
  const [views, setViews] = useState(0);

  const defaultImage = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop";

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchLesson = async () => {
      try {
        const res = await api.get(`/lessons/details/${id}`);
        const data = res.data.lesson || res.data;
        setLesson(data);

        if (data.accessLevel === "Premium" && !userData?.isPremium) {
          // Keep navigation but show the lock UI below
        }

        if (currentUser) {
          setLiked(data.likes?.includes(currentUser.uid) || false);
          setSaved(data.savedBy?.includes(currentUser.uid) || false);
        }
        setViews(Math.floor(Math.random() * 9000) + 1500);
        fetchSimilarLessons(data.category, data.emotionalTone, data._id);
      } catch (error) {
        toast.error("Lesson not found.");
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };

    const fetchSimilarLessons = async (category, tone, currentId) => {
      try {
        const res = await api.get("/lessons/public");
        const allLessons = res.data.lessons || [];
        const filtered = allLessons
          .filter(l => l._id !== currentId && (l.category === category || l.emotionalTone === tone))
          .slice(0, 3);
        setSimilarLessons(filtered);
      } catch (err) { console.error(err); }
    };

    fetchLesson();
  }, [id, navigate, currentUser, userData]);

  // Actions (Same logic as yours)
  const handleLike = async () => {
    if (!currentUser) return navigate("/login");
    try {
      await api.post(`/lessons/like/${id}`);
      setLiked(!liked);
      setLesson(prev => ({ ...prev, likesCount: liked ? (prev.likesCount || 1) - 1 : (prev.likesCount || 0) + 1 }));
      toast.success(liked ? "Like removed" : "Added to favorites!", { position: 'bottom-center' });
    } catch (err) { toast.error("Action failed"); }
  };

  const handleSave = async () => {
    if (!currentUser) return navigate("/login");
    try {
      await api.post(`/lessons/favorite/${id}`);
      setSaved(!saved);
      toast.success(saved ? "Removed from Library" : "Saved to Library", { position: 'bottom-center' });
    } catch (err) { toast.error("Action failed"); }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full" />
        <span className="text-slate-400 font-bold tracking-widest text-xs uppercase">Preparing Experience</span>
      </div>
    </div>
  );

  const isPremiumLocked = lesson.accessLevel === "Premium" && !userData?.isPremium;

  return (
    <div className="bg-[#FBFCFE] min-h-screen pb-24 selection:bg-indigo-600 selection:text-white">
      {/* Scroll Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 z-[100] origin-left" style={{ scaleX }} />

      {/* Floating Header */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl z-50 bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg rounded-3xl px-6 py-3 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-all">
          <ChevronLeft size={24} className="text-slate-700" />
        </button>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-[10px] font-black uppercase text-slate-400 tracking-widest">Currently Viewing</span>
          <div className="h-4 w-[1px] bg-slate-200 hidden sm:block"></div>
          <p className="text-sm font-bold text-slate-800 truncate max-w-[150px]">{lesson.title}</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-slate-100 rounded-full"><Share2 size={18} /></button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 pt-28">
        {/* HERO SECTION */}
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[400px] md:h-[550px]">
          <motion.img 
            initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }}
            src={lesson.imageURL || defaultImage} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 mb-4 flex-wrap">
              <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">{lesson.category}</span>
              <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">{lesson.emotionalTone}</span>
              {lesson.accessLevel === "Premium" && (
                <span className="bg-amber-400 text-amber-950 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={12} /> Premium
                </span>
              )}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-4xl md:text-7xl font-black text-white leading-[1.1] tracking-tight"
            >
              {lesson.title}
            </motion.h1>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          
          {/* CONTENT AREA */}
          <div className="lg:col-span-8">
            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { label: "Published", val: new Date(lesson.createdAt).toLocaleDateString(), icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
                { label: "Read Time", val: "~5 Min", icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
                { label: "Total Views", val: views.toLocaleString(), icon: Eye, color: "text-teal-600", bg: "bg-teal-50" },
              ].map((item, idx) => (
                <div key={idx} className={`${item.bg} p-4 rounded-3xl border border-white flex flex-col items-center text-center`}>
                  <item.icon className={`${item.color} mb-2`} size={20} />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{item.label}</span>
                  <span className="text-xs md:text-sm font-black text-slate-800">{item.val}</span>
                </div>
              ))}
            </div>

            {/* DESCRIPTION */}
            <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden min-h-[400px]">
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] rotate-12">
                 <Layout size={200} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                The Story
              </h2>
              <div className="relative z-10">
                <p className="text-slate-600 text-lg md:text-xl leading-[1.8] whitespace-pre-line font-medium italic">
                  "{lesson.description}"
                </p>
              </div>

              {/* PREMIUM LOCK OVERLAY */}
              {isPremiumLocked && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-md z-20 flex items-center justify-center p-8">
                  <div className="bg-white border border-slate-100 shadow-2xl rounded-[2.5rem] p-8 text-center max-w-sm">
                    <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Lock size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Premium Content</h3>
                    <p className="text-slate-500 text-sm mb-8 font-medium">This student's wisdom is exclusive. Upgrade to unlock full details.</p>
                    <button onClick={() => navigate("/pricing")} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all">
                      Upgrade Now <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4 space-y-8">
            {/* Author Section */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm text-center">
               <div className="relative inline-block mb-4">
                  <img src={lesson.creatorPhoto || "https://i.pravatar.cc/150"} className="w-24 h-24 rounded-full object-cover ring-4 ring-slate-50 shadow-inner" alt="" />
                  <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 border-4 border-white rounded-full"></div>
               </div>
               <h3 className="text-xl font-black text-slate-900">{lesson.creatorName || "Anonymous Student"}</h3>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Wisdom Contributor</p>
               <div className="h-[1px] w-full bg-slate-100 my-6"></div>
               <button onClick={() => navigate(`/profile/${lesson.creatorId}`)} className="w-full py-4 rounded-2xl bg-slate-50 text-slate-700 font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
                 Browse All Stories
               </button>
            </div>

            {/* Interaction Stats */}
            <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white">
              <div className="flex justify-between items-center mb-6">
                 <div>
                   <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Global Rank</p>
                   <p className="text-2xl font-black">#12 Top Lesson</p>
                 </div>
                 <Sparkles className="text-indigo-400" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-bold">
                  <span>Engagement Score</span>
                  <span>92%</span>
                </div>
                <div className="w-full bg-indigo-950 h-2 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} className="h-full bg-indigo-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SIMILAR LESSONS */}
        {similarLessons.length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl font-black text-slate-900 mb-12 flex items-center gap-4">
              Similar Journeys <div className="h-px flex-1 bg-slate-100" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarLessons.map(sim => (
                <Link key={sim._id} to={`/lessons/${sim._id}`} className="group bg-white rounded-[2.5rem] p-4 border border-slate-50 hover:shadow-xl transition-all duration-500">
                  <div className="aspect-[4/3] rounded-[2rem] overflow-hidden mb-6">
                    <img src={sim.imageURL || defaultImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  </div>
                  <div className="px-2 pb-2">
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{sim.category}</span>
                    <h4 className="text-lg font-black text-slate-900 mt-1 leading-tight group-hover:text-indigo-600 transition-colors">{sim.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM MOBILE ACTION BAR */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] sm:w-auto z-50">
        <div className="bg-slate-900/95 backdrop-blur-xl text-white px-6 py-4 rounded-[2rem] flex items-center gap-8 shadow-2xl border border-white/10">
          <button onClick={handleLike} className={`flex items-center gap-2 transition-all ${liked ? 'text-red-400 scale-110' : 'hover:text-red-400'}`}>
            <Heart size={22} fill={liked ? "currentColor" : "none"} />
            <span className="text-sm font-black tracking-tighter">{lesson.likesCount || 0}</span>
          </button>
          
          <div className="w-px h-6 bg-white/10"></div>
          
          <button onClick={handleSave} className={`transition-all ${saved ? 'text-indigo-400 scale-110' : 'hover:text-indigo-400'}`}>
            <Bookmark size={22} fill={saved ? "currentColor" : "none"} />
          </button>

          <div className="w-px h-6 bg-white/10"></div>

          <button onClick={handleReport} className="text-slate-400 hover:text-orange-400 transition-colors">
            <ShieldAlert size={22} />
          </button>

          <div className="w-px h-6 bg-white/10"></div>

          <button className="bg-indigo-600 p-2.5 rounded-2xl hover:bg-indigo-500 transition-all">
             <Share2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;