// src/dashboard/user/MyProfile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  Heart,
  User,
  Sparkles,
  BookOpen,
  Loader2,
  Link as LinkIcon,
  Eye,
  Camera,
  ArrowUpRight
} from "lucide-react";
import api from "../../utils/api";
import AOS from 'aos';
import 'aos/dist/aos.css';

const MyProfile = () => {
  const { currentUser, updateUserProfile, userData } = useAuth();
  
  // State for Form & Live Preview
  const [name, setName] = useState(currentUser?.displayName || "");
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || "");
  
  const [loading, setLoading] = useState(false);
  const [publicLessons, setPublicLessons] = useState([]);
  const [lessonsCount, setLessonsCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [fetchingStats, setFetchingStats] = useState(true);
  const [isFocused, setIsFocused] = useState(null);

  // Fallback Image for 404 error fix
  const defaultAvatar = "https://ui-avatars.com/api/?name=" + (name || "User") + "&background=6366f1&color=fff";

  useEffect(() => {
    // Initialize AOS Animation
    AOS.init({ duration: 1000, once: true });

    const fetchStatsAndLessons = async () => {
      try {
        const [lessonsRes, favRes] = await Promise.all([
          api.get("/lessons/my-lessons"),
          api.get("/lessons/my-favorites")
        ]);
        setLessonsCount(lessonsRes.data.lessons?.length || 0);
        setSavedCount(favRes.data.favorites?.length || 0);
        setPublicLessons(lessonsRes.data.lessons?.filter(l => l.visibility === "Public") || []);
      } catch (error) {
        console.error("Stats error:", error);
      } finally {
        setFetchingStats(false);
      }
    };
    if (currentUser) fetchStatsAndLessons();
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === currentUser?.displayName && photoURL === currentUser?.photoURL) {
      toast("No changes detected");
      return;
    }
    setLoading(true);
    try {
      await updateUserProfile(name, photoURL);
      toast.success("Identity updated successfully!");
    } catch (error) {
      toast.error("Update failed. Check connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10 overflow-hidden">
      
      {/* --- HEADER --- */}
      <div className="text-center mb-16" data-aos="fade-down">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-6">
          <Sparkles className="w-3 h-3" /> Digital Identity Card
        </div>
        <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">
          My <span className="text-indigo-600">Profile</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* --- LEFT: LIVE PREVIEW CARD --- */}
        <div className="lg:col-span-4" data-aos="fade-right">
          <div className="sticky top-10 bg-white border border-slate-100 p-8 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col items-center text-center group">
            
            <div className="relative">
              {/* Animated Rings */}
              <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity duration-700"></div>
              
              <div className="relative z-10 p-2 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full">
                <img
                  src={photoURL || defaultAvatar}
                  alt="Live Preview"
                  className="w-40 h-40 md:w-48 md:h-48 rounded-full border-8 border-white object-cover transition-all duration-700 group-hover:rotate-3 group-hover:scale-105"
                  onError={(e) => { e.target.src = defaultAvatar }}
                />
              </div>
              
              <div className="absolute bottom-4 right-4 z-20 bg-slate-900 p-3 rounded-full border-4 border-white text-white shadow-xl">
                <Camera className="w-5 h-5" />
              </div>
            </div>
            
            <div className="mt-8 space-y-2">
              <h3 className="text-3xl font-black text-slate-800 tracking-tight">{name || "Your Name"}</h3>
              <p className="text-slate-400 font-medium text-sm truncate max-w-[200px]">{currentUser?.email}</p>
              
              <div className="pt-4">
                 {userData?.isPremium ? (
                   <div className="px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-black uppercase rounded-full shadow-lg shadow-orange-200 animate-bounce">
                     Premium Account
                   </div>
                 ) : (
                   <div className="px-6 py-2 bg-slate-100 text-slate-500 text-[10px] font-black uppercase rounded-full">
                     Standard Member
                   </div>
                 )}
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT: FORM --- */}
        <div className="lg:col-span-8" data-aos="fade-left">
          <div className="bg-slate-50/50 border border-white p-8 md:p-12 rounded-[3.5rem] shadow-inner">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 gap-6">
                
                {/* Name Input */}
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Full Name</label>
                  <div className={`relative transition-all duration-300 ${isFocused === 'name' ? 'scale-[1.02]' : ''}`}>
                    <User className={`absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isFocused === 'name' ? 'text-indigo-600' : 'text-slate-300'}`} />
                    <input
                      type="text"
                      value={name}
                      onFocus={() => setIsFocused('name')}
                      onBlur={() => setIsFocused(null)}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-16 pr-8 py-5 bg-white border-none rounded-3xl shadow-sm focus:ring-4 focus:ring-indigo-500/10 outline-none font-bold text-slate-700"
                      placeholder="e.g. Alex Karev"
                    />
                  </div>
                </div>

                {/* Photo URL Input (LIVE SYNC) */}
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Avatar Image URL</label>
                  <div className={`relative transition-all duration-300 ${isFocused === 'photo' ? 'scale-[1.02]' : ''}`}>
                    <LinkIcon className={`absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isFocused === 'photo' ? 'text-purple-600' : 'text-slate-300'}`} />
                    <input
                      type="url"
                      value={photoURL}
                      onFocus={() => setIsFocused('photo')}
                      onBlur={() => setIsFocused(null)}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      className="w-full pl-16 pr-8 py-5 bg-white border-none rounded-3xl shadow-sm focus:ring-4 focus:ring-purple-500/10 outline-none font-bold text-slate-700"
                      placeholder="https://images.com/my-photo.jpg"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 ml-4 italic">* Paste an image link to see live preview on the left</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group w-full py-6 bg-slate-900 hover:bg-indigo-600 text-white font-black rounded-3xl shadow-2xl transition-all duration-500 flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                  <>
                    <span className="uppercase tracking-[0.2em] text-sm">Save Changes</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* --- STATS SECTION --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20" data-aos="zoom-in-up">
        <StatCard count={lessonsCount} label="Lessons" icon={<BookOpen />} color="indigo" />
        <StatCard count={savedCount} label="Favorites" icon={<Heart />} color="rose" />
        <StatCard count={publicLessons.length} label="Public" icon={<Eye />} color="blue" />
        <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white flex flex-col items-center justify-center shadow-xl">
            <Sparkles className="w-8 h-8 mb-2 text-indigo-200 fill-current" />
            <span className="text-2xl font-black tracking-tighter uppercase leading-none">Pro</span>
            <span className="text-[10px] font-bold opacity-60 uppercase mt-1">Status</span>
        </div>
      </div>
    </div>
  );
};

// Helper Component for Stats
const StatCard = ({ count, label, icon, color }) => {
  const colors = {
    indigo: "text-indigo-600 bg-indigo-50",
    rose: "text-rose-600 bg-rose-50",
    blue: "text-blue-600 bg-blue-50"
  };
  return (
    <div className="bg-white border border-slate-50 p-8 rounded-[2.5rem] shadow-sm flex flex-col items-center group hover:shadow-xl transition-all duration-500">
      <div className={`p-4 rounded-2xl ${colors[color]} mb-4 transition-transform group-hover:scale-110 group-hover:rotate-12`}>
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <span className="text-4xl font-black text-slate-900 tracking-tighter">{count}</span>
      <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">{label}</span>
    </div>
  );
};

export default MyProfile;