// src/dashboard/admin/ManageLessons.jsx
import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, User, Tag, Eye, Heart, Star, Trash2, Pin, PinOff,
  AlertCircle, Search, Zap, Layers, ShieldAlert, ChevronRight,
  Database, LayoutGrid, List, Sparkles, X, AlertTriangle
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const ManageLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState(null); // Custom Delete Modal State

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-out-back' });
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const res = await api.get("/admin/lessons");
      setLessons(res.data);
    } catch (error) {
      toast.error("Cloud Sync Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFeatureToggle = async (lessonId, currentFeatured) => {
    try {
      await api.put(`/admin/lessons/${lessonId}/feature`);
      toast.success(currentFeatured ? "Removed from Spotlight" : "Featured on Home!", {
        style: { borderRadius: '15px', background: '#333', color: '#fff' }
      });
      setLessons(lessons.map(l => l._id === lessonId ? { ...l, isFeatured: !currentFeatured } : l));
    } catch (error) {
      toast.error("Update Interrupted");
    }
  };

  // --- Next Level Delete Handler (Custom Modal) ---
  const confirmDelete = async () => {
    try {
      await api.delete(`/admin/lessons/${deleteId}`);
      toast.success("Asset Purged from Mainframe");
      setLessons(lessons.filter(l => l._id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      toast.error("Decline: Authorization Failure");
    }
  };

  const filtered = lessons.filter(l => l.title?.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617]">
        <div className="relative w-32 h-32">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-t-4 border-b-4 border-indigo-500 rounded-full"
          ></motion.div>
          <BookOpen className="w-10 h-10 text-indigo-400 absolute inset-0 m-auto animate-pulse" />
        </div>
        <p className="mt-8 text-indigo-300 font-black tracking-[0.6em] uppercase text-[10px]">Accessing Core Data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] py-8 px-4 md:px-10 lg:px-16 relative overflow-hidden">
      {/* Mesh Gradient Backgrounds */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-200/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* --- Dynamic Hero Header --- */}
        <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-16" data-aos="fade-down">
          <div className="space-y-4">
            <motion.div 
              initial={{ x: -20, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 bg-indigo-600/10 text-indigo-600 px-4 py-1.5 rounded-full border border-indigo-100 shadow-sm"
            >
              <Database className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">System Administrator Terminal</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-none">
              CONTROL<span className="text-indigo-600">.</span>HUB
            </h1>
            <div className="flex items-center gap-6">
               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                 Active Records: <span className="text-indigo-600 text-lg">{lessons.length}</span>
               </p>
            </div>
          </div>

          {/* Smart Search Bar */}
          <div className="relative group w-full xl:w-[450px]">
            <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-0 group-focus-within:opacity-20 transition-opacity"></div>
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-all" />
            <input 
              type="text"
              placeholder="Search by title, author, or category..."
              className="w-full bg-white border-0 py-6 pl-16 pr-8 rounded-[2.5rem] shadow-2xl shadow-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold text-slate-700 placeholder:text-slate-300"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filtered.map((lesson, i) => (
              <motion.div
                key={lesson._id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative bg-white/80 backdrop-blur-md rounded-[3.5rem] p-4 border border-white shadow-xl hover:shadow-[0_40px_100px_-20px_rgba(99,102,241,0.2)] transition-all duration-700 overflow-hidden flex flex-col"
              >
                {/* Visual Cover Layer */}
                <div className={`h-52 rounded-[3rem] relative overflow-hidden transition-all duration-1000 ${lesson.isFeatured ? 'bg-indigo-600 shadow-indigo-200 shadow-2xl' : 'bg-slate-900'}`}>
                  {/* Glowing Orbs in Background */}
                  <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 blur-2xl rounded-full"></div>
                  
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                    <div className="bg-white/10 backdrop-blur-xl px-4 py-2 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2 border border-white/10">
                      <Sparkles className="w-3 h-3 text-amber-300" /> {lesson.category || "Uncategorized"}
                    </div>
                    {lesson.isFeatured && (
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }} 
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="bg-amber-400 text-slate-900 p-3 rounded-2xl shadow-xl shadow-amber-400/30"
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </motion.div>
                    )}
                  </div>

                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-2xl font-black text-white leading-tight tracking-tighter line-clamp-2 group-hover:tracking-normal transition-all duration-500">
                      {lesson.title || "UNTITLED ASSET"}
                    </h3>
                  </div>
                </div>

                {/* Data Matrix Section */}
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50/50 p-4 rounded-[2rem] border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-all duration-500">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Creator</span>
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-[8px]">{lesson.creatorName?.charAt(0) || "S"}</div>
                         <span className="text-[11px] font-black text-slate-700 truncate">{lesson.creatorName || "System"}</span>
                      </div>
                    </div>
                    <div className="bg-slate-50/50 p-4 rounded-[2rem] border border-slate-100 group-hover:bg-rose-50 group-hover:border-rose-100 transition-all duration-500">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Popularity</span>
                      <div className="flex items-center gap-2">
                         <Heart className="w-4 h-4 text-rose-500 fill-current animate-pulse" />
                         <span className="text-[11px] font-black text-slate-700">{lesson.likesCount || 0} Likes</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-4">
                     <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${lesson.visibility === 'public' ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]' : 'bg-amber-500'}`}></div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{lesson.visibility}</span>
                     </div>
                     <Eye className="w-4 h-4 text-slate-200 group-hover:text-indigo-400 transition-colors" />
                  </div>
                </div>

                {/* Bottom Actions Suite */}
                <div className="mt-auto p-4 flex gap-4 border-t border-slate-50">
                  <button
                    onClick={() => handleFeatureToggle(lesson._id, lesson.isFeatured)}
                    className={`flex-[3] flex items-center justify-center gap-3 py-5 rounded-[2.5rem] text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 relative overflow-hidden group/btn ${
                      lesson.isFeatured
                        ? "bg-slate-100 text-slate-400 hover:bg-slate-200"
                        : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-200"
                    }`}
                  >
                    {lesson.isFeatured ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                    <span>{lesson.isFeatured ? "Revoke" : "Feature"}</span>
                  </button>

                  <button
                    onClick={() => setDeleteId(lesson._id)} // Open Custom Modal
                    className="flex-1 flex items-center justify-center bg-white text-rose-500 border-2 border-rose-50 rounded-[2.5rem] hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all duration-500"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- Custom Next-Level Delete Confirmation Modal --- */}
        <AnimatePresence>
          {deleteId && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-2xl bg-slate-900/60"
            >
              <motion.div 
                initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 50 }}
                className="bg-white rounded-[4rem] p-10 md:p-16 max-w-lg w-full shadow-[0_50px_100px_rgba(0,0,0,0.3)] text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-rose-500"></div>
                <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-8">
                  <AlertTriangle className="w-12 h-12" />
                </div>
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-4 uppercase">Critical Alert</h3>
                <p className="text-slate-500 font-bold text-lg mb-10 leading-relaxed">
                  Are you sure you want to purge this asset from the database? This action is <span className="text-rose-600 underline">irreversible</span>.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                   <button 
                    onClick={confirmDelete}
                    className="flex-1 bg-rose-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-widest hover:bg-rose-700 shadow-2xl shadow-rose-200 transition-all"
                   >
                     Confirm Purge
                   </button>
                   <button 
                    onClick={() => setDeleteId(null)}
                    className="flex-1 bg-slate-100 text-slate-500 py-6 rounded-[2rem] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                   >
                     Abort System
                   </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Advanced Footer --- */}
        <footer className="mt-32 pt-16 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-10" data-aos="fade-up">
           <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                 {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200"></div>)}
              </div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Connected Administrators: 04</p>
           </div>
           <div className="flex items-center gap-10">
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.5em] animate-pulse">System Secured & Active</p>
              <div className="h-10 w-[1px] bg-slate-200 hidden md:block"></div>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">v4.8.0.0 Mainframe</p>
           </div>
        </footer>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ManageLessons;