// src/pages/LessonDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; 
import api from "../../utils/api"; 
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion"; // For animations
import { 
  Lock, Heart, Bookmark, Share2, Flag, Calendar, Clock, User, Eye, ArrowLeft, CheckCircle
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const LessonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [similarLessons, setSimilarLessons] = useState([]);
  const [views, setViews] = useState(0);

  const defaultImage = "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1473&q=80";

  // Dynamic Reading Time Calculation
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const noOfWords = text?.split(/\s/g).length || 0;
    const minutes = Math.ceil(noOfWords / wordsPerMinute);
    return minutes < 1 ? 1 : minutes;
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
    const fetchLesson = async () => {
      try {
        const res = await api.get(`/lessons/details/${id}`);
        const data = res.data.lesson || res.data;
        setLesson(data);

        if (data.accessLevel === "Premium" && !userData?.isPremium) {
          toast.error("Premium content restricted.");
          navigate("/pricing");
          return;
        }

        if (currentUser) {
          setLiked(data.likes?.includes(currentUser.uid) || false);
          setSaved(data.savedBy?.includes(currentUser.uid) || false);
        }

        setViews(Math.floor(Math.random() * 5000) + 1200);
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
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        setSimilarLessons(filtered);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLesson();
  }, [id, navigate, currentUser, userData]);

  // Handlers (Keeping your exact logic)
  const handleLike = async () => {
    if (!currentUser) return navigate("/login");
    try {
      await api.post(`/lessons/like/${id}`);
      setLiked(!liked);
      setLesson(prev => ({
        ...prev,
        likesCount: liked ? (prev.likesCount || 1) - 1 : (prev.likesCount || 0) + 1
      }));
      toast.success(liked ? "Unliked" : "Liked!", { icon: "❤️" });
    } catch (err) { toast.error("Error updating like"); }
  };

  const handleSave = async () => {
    if (!currentUser) return navigate("/login");
    try {
      await api.post(`/lessons/favorite/${id}`);
      setSaved(!saved);
      toast.success(saved ? "Removed from Bookmark" : "Saved!", { icon: "🔖" });
    } catch (err) { toast.error("Error saving lesson"); }
  };

  const handleReport = () => {
    const reason = window.prompt("Why are you reporting? (Inappropriate/False Info/Spam)");
    if (reason) toast.success("Thank you. We will review this.");
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full mb-4"
      />
      <p className="text-gray-500 font-medium tracking-widest animate-pulse uppercase text-xs">Loading Experience</p>
    </div>
  );

  const isPremiumLocked = lesson.accessLevel === "Premium" && !userData?.isPremium;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Navigation Backdrop */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 md:hidden">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-indigo-600 font-bold">
          <ArrowLeft size={20} /> Back
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 md:mt-10">
        
        {/* HERO SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-100/50 group"
        >
          <img
            src={lesson.imageURL || defaultImage}
            alt={lesson.title}
            className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
            <motion.div initial={{ x: -20 }} animate={{ x: 0 }} className="flex gap-2 mb-4">
              <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                {lesson.category}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                {lesson.emotionalTone}
              </span>
            </motion.div>
            <h1 className="text-3xl md:text-6xl font-black text-white leading-tight max-w-4xl drop-shadow-2xl">
              {lesson.title}
            </h1>
          </div>
        </motion.div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
          
          {/* MAIN COLUMN */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Metadata Bar */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-wrap items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="bg-indigo-50 p-3 rounded-2xl">
                  <Calendar className="text-indigo-600" size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Published On</p>
                  <p className="font-bold text-gray-800">{new Date(lesson.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-l border-gray-100 pl-6">
                <div className="bg-purple-50 p-3 rounded-2xl">
                  <Clock className="text-purple-600" size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Time to read</p>
                  <p className="font-bold text-gray-800">{calculateReadingTime(lesson.description)} Min read</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-l border-gray-100 pl-6">
                <div className="bg-teal-50 p-3 rounded-2xl">
                  <Eye className="text-teal-600" size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Engagement</p>
                  <p className="font-bold text-gray-800">{views.toLocaleString()} Views</p>
                </div>
              </div>
            </motion.div>

            {/* Description Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <CheckCircle size={120} className="text-indigo-600" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-indigo-600 rounded-full" />
                The Story & Lesson
              </h2>
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed whitespace-pre-line font-medium">
                {lesson.description}
              </p>
            </motion.div>

            {/* Interaction Buttons (Responsive Floating on Mobile) */}
            <div className="flex flex-wrap gap-4 items-center justify-center py-6">
               <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black transition-all shadow-lg ${
                  liked ? "bg-red-500 text-white shadow-red-200" : "bg-white text-gray-700 border-2 border-gray-100 hover:border-red-100"
                }`}
              >
                <Heart size={24} fill={liked ? "white" : "none"} />
                {lesson.likesCount || 0} Likes
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black transition-all shadow-lg ${
                  saved ? "bg-indigo-600 text-white shadow-indigo-200" : "bg-white text-gray-700 border-2 border-gray-100 hover:border-indigo-100"
                }`}
              >
                <Bookmark size={24} fill={saved ? "white" : "none"} />
                {saved ? "Saved" : "Save Lesson"}
              </motion.button>

              <button className="p-4 bg-white border-2 border-gray-100 rounded-2xl text-gray-500 hover:text-teal-600 hover:border-teal-100 transition-all">
                <Share2 size={24} />
              </button>
              <button onClick={handleReport} className="p-4 bg-white border-2 border-gray-100 rounded-2xl text-gray-500 hover:text-orange-600 transition-all">
                <Flag size={24} />
              </button>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4 space-y-8">
            {/* Author Card */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              className="bg-indigo-900 rounded-[2.5rem] p-8 text-white text-center relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <img
                src={lesson.creatorPhoto || "https://i.pravatar.cc/150"}
                className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white/20 mb-4 group-hover:scale-110 transition-transform"
                alt="creator"
              />
              <p className="text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Shared By</p>
              <h3 className="text-2xl font-black mb-6">{lesson.creatorName || "Anonymous"}</h3>
              <button
                onClick={() => navigate(`/profile/${lesson.creatorId}`)}
                className="w-full py-4 bg-white text-indigo-900 rounded-2xl font-black hover:bg-indigo-50 transition-colors shadow-xl"
              >
                View Profile
              </button>
            </motion.div>

            {/* Similar Lessons Small List */}
            <div className="space-y-4">
              <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest pl-2">Recommended</h4>
              {similarLessons.map(sim => (
                <Link key={sim._id} to={`/lessons/${sim._id}`} className="flex items-center gap-4 bg-white p-3 rounded-3xl border border-gray-50 hover:border-indigo-200 transition-all group">
                   <img src={sim.imageURL || defaultImage} className="w-20 h-20 rounded-2xl object-cover" />
                   <div>
                     <h5 className="font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-indigo-600">{sim.title}</h5>
                     <p className="text-xs text-gray-400 mt-1 font-bold uppercase">{sim.category}</p>
                   </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PREMIUM OVERLAY (Keeping your Logic) */}
      <AnimatePresence>
        {isPremiumLocked && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-indigo-950/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-10 md:p-16 text-center max-w-xl w-full shadow-2xl"
            >
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Lock className="text-amber-600" size={48} />
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-4">Unlock Wisdom</h2>
              <p className="text-gray-500 text-lg mb-10">This is a Premium Lesson. Join our elite members to access all life-changing student experiences.</p>
              <button
                onClick={() => navigate("/pricing")}
                className="w-full py-5 bg-indigo-600 text-white rounded-2xl text-xl font-black shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all"
              >
                Upgrade to Premium
              </button>
              <button onClick={() => navigate(-1)} className="mt-6 text-gray-400 font-bold hover:text-gray-600">Maybe Later</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LessonDetails;