// src/dashboard/admin/ManageLessons.jsx
import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  User,
  Tag,
  Eye,
  Heart,
  Star,
  Trash2,
  Pin,
  PinOff,
  AlertCircle,
  Search,
  Zap,
  Layers,
  ShieldAlert,
  ChevronRight
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const ManageLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-out-back' });
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const res = await api.get("/admin/lessons");
      setLessons(res.data);
    } catch (error) {
      toast.error("Failed to load lessons");
    } finally {
      setLoading(false);
    }
  };

  const handleFeatureToggle = async (lessonId, currentFeatured) => {
    try {
      await api.put(`/admin/lessons/${lessonId}/feature`);
      toast.success(currentFeatured ? "Removed from Spotlight" : "Featured on Home!");
      setLessons(lessons.map(l => l._id === lessonId ? { ...l, isFeatured: !currentFeatured } : l));
    } catch (error) {
      toast.error("Cloud Sync Failed");
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    if (!window.confirm("System Alert: Permanent Deletion?")) return;
    try {
      await api.delete(`/admin/lessons/${lessonId}`);
      toast.success("Asset Purged Successfully");
      setLessons(lessons.filter(l => l._id !== lessonId));
    } catch (error) {
      toast.error("Purge Failed");
    }
  };

  const filtered = lessons.filter(l => l.title?.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617] overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-24 h-24 border-t-2 border-indigo-500 rounded-full relative"
        >
          <BookOpen className="w-8 h-8 text-indigo-400 absolute inset-0 m-auto animate-pulse" />
        </motion.div>
        <p className="mt-8 text-indigo-300 font-black tracking-[0.5em] uppercase text-[10px]">Accessing Lesson Core...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4 md:px-12 lg:px-20 relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-100 rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-100 rounded-full blur-[100px] opacity-40"></div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* --- Advanced Header --- */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-20" data-aos="fade-down">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200">
                <Layers className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Central Content Hub</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">
              MANAGE<span className="text-indigo-600">.</span>LSN
            </h1>
            <p className="text-slate-500 font-bold flex items-center gap-2 text-sm uppercase tracking-widest">
              Total Managed Assets: <span className="text-indigo-600 font-black">{lessons.length}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative group flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-all" />
              <input 
                type="text"
                placeholder="Query database..."
                className="w-full sm:w-80 bg-white/70 backdrop-blur-xl border border-white p-5 pl-14 rounded-[2rem] shadow-2xl shadow-slate-200/50 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold text-slate-700 placeholder:text-slate-300"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* --- Content Grid --- */}
        {filtered.length === 0 ? (
          <div className="text-center py-40 bg-white/50 backdrop-blur-md rounded-[4rem] border border-white shadow-2xl" data-aos="zoom-in">
            <ShieldAlert className="w-20 h-20 text-indigo-100 mx-auto mb-6 animate-bounce" />
            <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Zero Records Found</h3>
            <p className="text-slate-400 font-bold text-sm tracking-widest mt-2 uppercase">Database Query Returned Empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
            <AnimatePresence>
              {filtered.map((lesson, i) => (
                <motion.div
                  key={lesson._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  className="group bg-white rounded-[3rem] p-4 border border-slate-50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(99,102,241,0.15)] transition-all duration-500 flex flex-col relative"
                >
                  {/* Visual Header */}
                  <div className={`h-48 rounded-[2.5rem] relative overflow-hidden transition-all duration-700 ${lesson.isFeatured ? 'bg-indigo-600' : 'bg-slate-900'}`}>
                    <div className="absolute inset-0 opacity-20 group-hover:scale-110 transition-transform duration-1000">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.4),transparent)]"></div>
                    </div>
                    
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                        <Zap className="w-3 h-3 text-amber-400 fill-current" /> {lesson.category || "General"}
                      </div>
                    </div>

                    {lesson.isFeatured && (
                      <div className="absolute top-6 right-6 bg-amber-400 text-slate-900 p-3 rounded-2xl shadow-xl shadow-amber-400/20 animate-pulse">
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                    )}

                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-xl font-black text-white leading-[1.1] tracking-tight line-clamp-2">
                        {lesson.title || "Record #UNDEF"}
                      </h3>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-3xl group-hover:bg-indigo-50 transition-colors">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Creator</p>
                        <div className="flex items-center gap-2">
                           <User className="w-3 h-3 text-indigo-500" />
                           <span className="text-[11px] font-bold text-slate-700 truncate">{lesson.creatorName || "System"}</span>
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-3xl group-hover:bg-purple-50 transition-colors">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Impact</p>
                        <div className="flex items-center gap-2">
                           <Heart className="w-3 h-3 text-rose-500 fill-current" />
                           <span className="text-[11px] font-bold text-slate-700">{lesson.likesCount || 0} Likes</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between px-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${lesson.visibility === 'public' ? 'bg-green-500 animate-ping' : 'bg-amber-500'}`}></div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter italic">{lesson.visibility} Status</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="mt-auto p-2 flex gap-3">
                    <button
                      onClick={() => handleFeatureToggle(lesson._id, lesson.isFeatured)}
                      className={`flex-[3] flex items-center justify-center gap-3 py-5 rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all duration-500 group/btn ${
                        lesson.isFeatured
                          ? "bg-slate-100 text-slate-400 hover:bg-slate-200"
                          : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-200"
                      }`}
                    >
                      {lesson.isFeatured ? <PinOff className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" /> : <Pin className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />}
                      <span>{lesson.isFeatured ? "Revoke" : "Feature"}</span>
                    </button>

                    <button
                      onClick={() => handleDeleteLesson(lesson._id)}
                      className="flex-1 flex items-center justify-center bg-rose-50 text-rose-500 rounded-[2rem] hover:bg-rose-600 hover:text-white transition-all duration-500 hover:rotate-6 shadow-sm"
                      title="Purge Record"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* --- Footer Signature --- */}
        <div className="mt-24 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6" data-aos="fade-up">
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Secure Database v4.0.2</p>
           </div>
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">© Studio Lessons • Management Module</p>
        </div>
      </div>

      {/* Tailwind Optimization - No dynamic strings removed */}
      <div className="hidden bg-indigo-50 bg-purple-50 bg-rose-50 text-indigo-600 text-purple-600 text-rose-600 bg-indigo-600 bg-slate-900 shadow-indigo-200 shadow-amber-400/20"></div>
    </div>
  );
};

export default ManageLessons;