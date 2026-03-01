// src/pages/LessonDetails.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; 
import api from "../../utils/api"; 
import toast from "react-hot-toast";
import { motion, useScroll, useSpring } from "framer-motion"; 
import { 
  Lock, Heart, Bookmark, Share2, Flag, Calendar, Clock, User, Eye, 
  ChevronLeft, MessageSquare, Quote, Sparkles
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const LessonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();
  const containerRef = useRef(null);

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [similarLessons, setSimilarLessons] = useState([]);
  const [views, setViews] = useState(0);

  // Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const defaultImage = "https://images.unsplash.com/photo-1506784911079-53934eaad9df?q=80&w=1468&auto=format&fit=crop";

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchLesson = async () => {
      try {
        const res = await api.get(`/lessons/details/${id}`);
        const data = res.data.lesson || res.data;
        setLesson(data);

        if (data.accessLevel === "Premium" && !userData?.isPremium) {
          navigate("/pricing");
          return;
        }

        if (currentUser) {
          setLiked(data.likes?.includes(currentUser.uid) || false);
          setSaved(data.savedBy?.includes(currentUser.uid) || false);
        }
        setViews(Math.floor(Math.random() * 8000) + 2000);
        fetchSimilarLessons(data.category, data.emotionalTone, data._id);
      } catch (error) {
        toast.error("Story not found.");
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };

    const fetchSimilarLessons = async (category, tone, currentId) => {
      try {
        const res = await api.get("/lessons/public");
        const allLessons = res.data.lessons || [];
        setSimilarLessons(allLessons.filter(l => l._id !== currentId).slice(0, 3));
      } catch (err) { console.error(err); }
    };

    fetchLesson();
  }, [id, navigate, currentUser, userData]);

  // Actions (Same Logic)
  const handleLike = async () => {
    if (!currentUser) return navigate("/login");
    try {
      await api.post(`/lessons/like/${id}`);
      setLiked(!liked);
      setLesson(prev => ({ ...prev, likesCount: liked ? (prev.likesCount || 1) - 1 : (prev.likesCount || 0) + 1 }));
      toast.success(liked ? "Removed Like" : "Loved it!", { position: 'bottom-center' });
    } catch (err) { toast.error("Error"); }
  };

  const handleSave = async () => {
    if (!currentUser) return navigate("/login");
    try {
      await api.post(`/lessons/favorite/${id}`);
      setSaved(!saved);
      toast.success(saved ? "Removed" : "Saved to Library", { position: 'bottom-center' });
    } catch (err) { toast.error("Error"); }
  };

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <div className="relative">
        <div className="w-20 h-20 border-2 border-indigo-100 rounded-full"></div>
        <div className="w-20 h-20 border-t-2 border-indigo-600 rounded-full animate-spin absolute top-0"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen selection:bg-indigo-100 selection:text-indigo-900" ref={containerRef}>
      
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-indigo-600 z-[100] origin-left" style={{ scaleX }} />

      {/* Smart Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-all group">
          <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <div className="flex items-center gap-4">
           {lesson.accessLevel === "Premium" && (
             <span className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter">
               <Sparkles size={12} /> Premium Lesson
             </span>
           )}
           <button className="text-gray-400 hover:text-indigo-600 transition-colors"><Share2 size={20} /></button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          
          {/* Header Section */}
          <header className="mb-12 text-center md:text-left">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center md:justify-start gap-3 mb-6">
               <span className="text-indigo-600 font-black text-xs uppercase tracking-widest">{lesson.category}</span>
               <span className="text-gray-300">•</span>
               <span className="text-gray-500 font-bold text-xs uppercase tracking-widest">{lesson.emotionalTone}</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif font-medium text-gray-900 leading-[1.1] mb-8"
            >
              {lesson.title}
            </motion.h1>

            {/* Author & Info Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between border-y border-gray-100 py-6 gap-6">
              <div className="flex items-center gap-4">
                <img src={lesson.creatorPhoto || "https://i.pravatar.cc/100"} className="w-12 h-12 rounded-full ring-2 ring-indigo-50" alt="" />
                <div className="text-left">
                  <h4 className="font-bold text-gray-900 leading-none">{lesson.creatorName || "Anonymous Student"}</h4>
                  <p className="text-xs text-gray-400 mt-1 font-medium italic">Contributor since 2024</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-gray-400">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-black uppercase tracking-tighter">Engagement</span>
                  <span className="text-sm font-bold text-gray-700">{views.toLocaleString()}</span>
                </div>
                <div className="w-[1px] h-6 bg-gray-100"></div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-black uppercase tracking-tighter">Published</span>
                  <span className="text-sm font-bold text-gray-700">{new Date(lesson.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl overflow-hidden mb-16 shadow-2xl shadow-indigo-100/50"
          >
            <img src={lesson.imageURL || defaultImage} className="w-full h-auto aspect-video object-cover" alt="Cover" />
          </motion.div>

          {/* Article Text Content */}
          <article className="prose prose-lg prose-indigo max-w-none">
            <div className="relative">
              <Quote className="absolute -left-12 top-0 text-indigo-100 hidden md:block" size={48} />
              <p className="text-gray-800 text-xl md:text-2xl leading-relaxed font-serif first-letter:text-6xl first-letter:font-black first-letter:text-indigo-600 first-letter:mr-3 first-letter:float-left whitespace-pre-line">
                {lesson.description}
              </p>
            </div>
          </article>

          {/* Floating Smart Actions (Visible on Scroll) */}
          <motion.div 
             initial={{ y: 100 }} animate={{ y: 0 }}
             className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur-md text-white px-6 py-3 rounded-full flex items-center gap-8 shadow-2xl z-50 border border-white/10"
          >
            <button onClick={handleLike} className={`flex items-center gap-2 transition-colors ${liked ? 'text-red-400' : 'hover:text-red-400'}`}>
              <Heart size={20} fill={liked ? "currentColor" : "none"} />
              <span className="text-sm font-bold">{lesson.likesCount || 0}</span>
            </button>
            <div className="w-[1px] h-4 bg-white/20"></div>
            <button onClick={handleSave} className={`transition-colors ${saved ? 'text-indigo-400' : 'hover:text-indigo-400'}`}>
              <Bookmark size={20} fill={saved ? "currentColor" : "none"} />
            </button>
            <div className="w-[1px] h-4 bg-white/20"></div>
            <button className="hover:text-teal-400 transition-colors"><MessageSquare size={20} /></button>
            <div className="w-[1px] h-4 bg-white/20"></div>
            <button onClick={handleReport} className="hover:text-orange-400 transition-colors"><Flag size={20} /></button>
          </motion.div>

        </div>
      </main>

      {/* Next Story / Similar Section */}
      <footer className="bg-gray-50 border-t border-gray-100 py-20 px-6 mt-10">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl font-serif font-medium mb-12">More from Student Life</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarLessons.map(item => (
              <Link key={item._id} to={`/lessons/${item._id}`} className="group text-left">
                <div className="aspect-square rounded-2xl overflow-hidden mb-4 relative">
                  <img src={item.imageURL || defaultImage} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" alt="" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <span className="bg-white text-black px-4 py-2 rounded-full text-xs font-black uppercase">Read Now</span>
                  </div>
                </div>
                <h4 className="font-bold text-gray-900 leading-snug group-hover:underline">{item.title}</h4>
                <p className="text-xs text-gray-400 mt-2 font-black uppercase tracking-widest">{item.category}</p>
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LessonDetails;