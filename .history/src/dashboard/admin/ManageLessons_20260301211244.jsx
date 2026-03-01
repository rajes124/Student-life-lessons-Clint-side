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
  Filter,
  ArrowUpRight,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const ManageLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
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
      toast.success(currentFeatured ? "Unfeatured successfully" : "Lesson featured!");
      setLessons(lessons.map(l => l._id === lessonId ? { ...l, isFeatured: !currentFeatured } : l));
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    if (!window.confirm("Are you sure? This is permanent!")) return;
    try {
      await api.delete(`/admin/lessons/${lessonId}`);
      toast.success("Lesson purged successfully");
      setLessons(lessons.filter(l => l._id !== lessonId));
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // Filter Logic
  const filteredLessons = lessons.filter(l => 
    l.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <BookOpen className="w-8 h-8 text-indigo-600 absolute inset-0 m-auto" />
        </div>
        <p className="mt-4 font-black text-indigo-900 tracking-widest uppercase text-xs">Syncing Content...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfd] py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header & Search --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12" data-aos="fade-down">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-[2px] bg-indigo-600"></span>
                <p className="text-indigo-600 font-black uppercase tracking-[0.2em] text-[10px]">Content Moderator</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">
              LESSONS<span className="text-indigo-600">.</span>DB
            </h1>
          </div>

          <div className="relative group w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text"
              placeholder="Search database..."
              className="w-full bg-white border border-slate-100 py-4 pl-12 pr-4 rounded-2xl shadow-xl shadow-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium text-slate-700"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* --- Lesson Counter --- */}
        <div className="flex items-center gap-4 mb-8 overflow-hidden" data-aos="fade-right">
             <div className="bg-slate-900 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-3 h-3 text-indigo-400" />
                Live Assets: {filteredLessons.length}
             </div>
             <div className="h-[1px] flex-1 bg-slate-100"></div>
        </div>

        {filteredLessons.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-slate-50 shadow-2xl shadow-slate-100" data-aos="zoom-in">
            <AlertCircle className="w-20 h-20 text-slate-200 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-slate-900 uppercase">No Data Records</h3>
            <p className="text-slate-400 font-medium mt-2">Adjust your search or wait for user activity.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {filteredLessons.map((lesson, i) => (
                <motion.div
                  key={lesson._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative bg-white rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
                  data-aos="fade-up"
                  data-aos-delay={i * 50}
                >
                  {/* Card Top: Gradient Banner */}
                  <div className={`h-24 p-6 relative flex justify-between items-start transition-colors duration-500 bg-gradient-to-br ${lesson.isFeatured ? 'from-indigo-600 to-indigo-800' : 'from-slate-800 to-slate-900'}`}>
                    <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl text-white">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    {lesson.isFeatured && (
                      <div className="flex items-center gap-1 bg-amber-400 text-slate-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-lg">
                        <Star className="w-3 h-3 fill-current" /> Featured
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-8 pt-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-black text-slate-900 mb-6 line-clamp-2 leading-[1.1] group-hover:text-indigo-600 transition-colors">
                      {lesson.title || "Record #UNDEF"}
                    </h3>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center"><User className="w-4 h-4" /></div>
                        <span className="text-xs font-bold text-slate-600 truncate">{lesson.creatorName || "Anonymous"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center"><Tag className="w-4 h-4" /></div>
                        <span className="text-xs font-bold text-slate-600">{lesson.category || "General"}</span>
                      </div>
                      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-50">
                         <div className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-rose-500 fill-rose-50" /> <span className="text-[10px] font-black text-slate-900">{lesson.likesCount || 0}</span></div>
                         <div className="flex items-center gap-1.5">
                            <Eye className={`w-4 h-4 ${lesson.visibility === "public" ? "text-green-500" : "text-amber-500"}`} /> 
                            <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{lesson.visibility}</span>
                         </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-auto flex gap-3">
                      <button
                        onClick={() => handleFeatureToggle(lesson._id, lesson.isFeatured)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-sm ${
                          lesson.isFeatured
                            ? "bg-slate-100 text-slate-400 hover:bg-slate-200"
                            : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100"
                        }`}
                      >
                        {lesson.isFeatured ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                        {lesson.isFeatured ? "Revoke" : "Feature"}
                      </button>

                      <button
                        onClick={() => handleDeleteLesson(lesson._id)}
                        className="w-12 h-12 flex items-center justify-center bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white transition-all duration-300 shadow-sm"
                        title="Delete Asset"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-white/5 rounded-bl-[2rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Tailwind Helpers */}
      <div className="hidden bg-indigo-50 bg-purple-50 bg-rose-50 text-indigo-600 text-purple-600 text-rose-600"></div>
    </div>
  );
};

// Activity icon missing in original imports
const Activity = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
)

export default ManageLessons;