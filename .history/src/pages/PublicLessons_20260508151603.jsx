// src/pages/PublicLessons.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Lock,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  ArrowRight,
  BookOpen,
  Filter,
  Sparkles,
  Trophy,
  Layers,
  SortAsc
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const PublicLessons = () => {
  const { userData } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTone, setSelectedTone] = useState("");
  const [selectedAccessLevel, setSelectedAccessLevel] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  // AOS Initialization
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-quad",
    });
  }, []);

  const queryParams = new URLSearchParams({
    page: currentPage,
    limit,
    search: searchTerm,
    category: selectedCategory,
    emotionalTone: selectedTone,
    accessLevel: selectedAccessLevel,
    sort: sortBy,
  }).toString();

  const { data: response, loading, error } = useAxiosPublic(`/public?${queryParams}`);

  const lessons = response?.lessons || [];
  const totalPages = response?.totalPages || 1;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedTone, selectedAccessLevel, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-20 h-20 border-t-4 border-indigo-600 rounded-full shadow-xl"
        />
        <p className="mt-8 text-indigo-600 font-black tracking-widest uppercase text-xs animate-pulse">Syncing Lessons...</p>
      </div>
    );
  }

  if (error) {
    toast.error("Failed to load lessons");
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 p-6">
        <AlertCircle className="w-16 h-16 text-red-500 mb-6 animate-bounce" />
        <h2 className="text-2xl font-black text-base-content mb-2 uppercase italic">Data Link Broken</h2>
        <p className="text-base-content/60 text-center max-w-md font-medium uppercase text-xs tracking-tighter">
          Please check your network mainframe or try re-authenticating.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4 sm:px-8 lg:px-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[120px] -z-10 opacity-60" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-50 rounded-full blur-[100px] -z-10 opacity-60" />

      <div className="max-w-7xl mx-auto">
        
        {/* --- Dynamic Header Section --- */}
        <header className="text-center mb-16" data-aos="fade-down">
          <motion.div 
            initial={{ y: -10 }} animate={{ y: 0 }} transition={{ repeat: Infinity, duration: 2, repeatType: "mirror" }}
            className="inline-flex items-center gap-2 bg-base-100 text-primary px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.3em] border border-base-300 mb-6 shadow-xl shadow-primary/20"
          >
             <Sparkles size={14} /> Knowledge Mainframe
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black text-base-content tracking-tighter leading-none mb-6">
            LIFE<span className="text-primary">.</span>LESSONS
          </h1>
          <p className="text-base-content/60 font-bold text-lg md:text-xl max-w-2xl mx-auto leading-relaxed uppercase tracking-tighter">
            Explore wisdom curated for the <span className="text-base-content italic underline decoration-primary underline-offset-4">next generation</span> of learners.
          </p>
        </header>

        {/* --- ADVANCED SEARCH & FILTER BAR --- */}
        <div className="bg-base-100/70 backdrop-blur-xl border border-base-300 p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] mb-12" data-aos="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Search Input */}
            <div className="relative group lg:col-span-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/60 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search by Title, Category or Keywords..." 
                className="w-full pl-12 pr-4 py-4 bg-base-200 border border-base-300 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-base-content placeholder:text-base-content/40"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/60" size={18} />
              <select 
                className="w-full pl-12 pr-4 py-4 bg-base-200 border border-base-300 rounded-2xl outline-none appearance-none font-bold text-base-content focus:border-primary transition-all"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Personal Growth">Personal Growth</option>
                <option value="Relationships">Relationships</option>
                <option value="Career">Career</option>
                <option value="Philosophy">Philosophy</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="relative">
              <SortAsc className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/60" size={18} />
              <select 
                className="w-full pl-12 pr-4 py-4 bg-base-200 border border-base-300 rounded-2xl outline-none appearance-none font-bold text-base-content focus:border-primary transition-all"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

          </div>
        </div>

        {/* --- LESSONS GRID --- */}
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {lessons.map((lesson, index) => {
              const isPremiumLocked = lesson.accessLevel === "premium" && !userData?.isPremium;

              return (
                <motion.div
                  layout
                  key={lesson._id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="relative group h-full"
                  whileHover={{ y: -10 }}
                >
                  {/* Premium Lock Overlay */}
                  {isPremiumLocked && (
                    <div className="absolute inset-0 z-30 bg-base-content/80 backdrop-blur-md rounded-[2.5rem] flex flex-col items-center justify-center text-base-100 px-8 text-center border border-base-100/10 overflow-hidden">
                      <motion.div
                        animate={{ y: [-5, 5, -5], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="mb-4 bg-primary/20 p-4 rounded-full border border-primary/30"
                      >
                        <Lock className="w-10 h-10 text-warning drop-shadow-2xl" />
                      </motion.div>

                      <p className="text-2xl font-black mb-2 tracking-tighter uppercase italic">Premium Mod</p>
                      <p className="text-[10px] font-bold text-base-content/60 mb-6 uppercase tracking-[0.2em]">Upgrade required for full access</p>
                      <Link
                        to="/pricing"
                        className="px-8 py-3 bg-base-100 text-base-content font-black rounded-full text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-content transition-all shadow-xl"
                      >
                        Unlock Entry
                      </Link>
                    </div>
                  )}

                  {/* Lesson Card */}
                  <div className={`bg-base-100 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden h-full flex flex-col border border-base-300 relative transition-all duration-500 ${isPremiumLocked ? 'blur-[2px]' : 'hover:shadow-primary/10 hover:border-primary/20'}`}>
                    
                    {/* Image Section */}
                    <div className="h-56 relative overflow-hidden group">
                      {lesson.imageURL ? (
                        <img
                          src={lesson.imageURL}
                          alt={lesson.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center bg-base-200">
                          <BookOpen className="w-12 h-12 text-base-content/20" />
                        </div>
                      )}
                      
                      {/* Access Badge */}
                      <div className={`absolute top-6 right-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
                        lesson.accessLevel === "premium" ? "bg-warning text-warning-content" : "bg-success text-success-content"
                      }`}>
                        {lesson.accessLevel}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-[10px] font-black uppercase tracking-wider border border-primary/20">
                          {lesson.category}
                        </span>
                        {lesson.emotionalTone && (
                          <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-lg text-[10px] font-black uppercase tracking-wider border border-secondary/20">
                            {lesson.emotionalTone}
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl font-black text-base-content mb-4 line-clamp-2 leading-tight tracking-tighter uppercase italic">
                        {lesson.title}
                      </h3>

                      <p className="text-base-content/60 font-medium text-sm leading-relaxed mb-8 line-clamp-3 italic">
                        "{lesson.description}"
                      </p>

                      <div className="mt-auto border-t border-base-300 pt-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden ring-4 ring-base-200">
                            <img
                              src={lesson.creatorPhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${lesson.creatorName}`}
                              alt={lesson.creatorName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-[11px] font-black text-base-content uppercase tracking-tighter">{lesson.creatorName || "Anonymous"}</p>
                            <p className="text-[9px] font-bold text-base-content/60 uppercase flex items-center gap-1">
                              <Calendar size={10} /> {new Date(lesson.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        {!isPremiumLocked && (
                          <Link to={`/lessons/${lesson._id}`}>
                            <motion.div 
                              whileHover={{ x: 5 }}
                              className="w-10 h-10 bg-primary text-primary-content rounded-xl flex items-center justify-center shadow-lg shadow-primary/20"
                            >
                              <ArrowRight size={18} />
                            </motion.div>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>

        {/* --- Empty State --- */}
        {lessons.length === 0 && (
          <div className="text-center py-24" data-aos="zoom-in">
             <Layers className="w-20 h-20 text-base-content/20 mx-auto mb-6" />
             <h3 className="text-2xl font-black text-base-content uppercase italic">No Lessons Found</h3>
             <p className="text-base-content/60 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Adjust your search parameters and try again</p>
          </div>
        )}

        {/* --- MODERN PAGINATION --- */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-20" data-aos="fade-up">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="w-14 h-14 bg-base-100 border border-base-300 text-base-content rounded-2xl disabled:opacity-30 flex items-center justify-center hover:bg-primary hover:text-primary-content transition-all shadow-xl shadow-base-300/50"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="px-8 py-4 bg-base-content text-base-100 rounded-2xl font-black text-sm uppercase tracking-[0.3em] shadow-2xl">
              Node {currentPage} <span className="text-primary mx-2">/</span> {totalPages}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="w-14 h-14 bg-base-100 border border-base-300 text-base-content rounded-2xl disabled:opacity-30 flex items-center justify-center hover:bg-primary hover:text-primary-content transition-all shadow-xl shadow-base-300/50"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

      </div>

      {/* Internal Custom Styles */}
      <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .animate-spin-slow { animation: spin 6s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default PublicLessons;