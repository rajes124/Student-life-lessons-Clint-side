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

const MyProfile = () => {
  const { currentUser, updateUserProfile, userData } = useAuth();
  const [name, setName] = useState(currentUser?.displayName || "");
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [publicLessons, setPublicLessons] = useState([]);
  const [lessonsCount, setLessonsCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [fetchingStats, setFetchingStats] = useState(true);
  const [isFocused, setIsFocused] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === currentUser?.displayName && photoURL === currentUser?.photoURL) {
      toast("No changes made");
      return;
    }
    setLoading(true);
    try {
      await updateUserProfile(name, photoURL);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10">
      
      {/* Header Section */}
      <div className="text-center mb-16" data-aos="fade-down">
        <h2 className="text-5xl font-black text-indigo-900 tracking-tight flex items-center justify-center gap-4">
          <div className="p-3 bg-indigo-100 rounded-2xl">
            <User className="w-10 h-10 text-indigo-600" />
          </div>
          My Identity
        </h2>
        <p className="mt-4 text-gray-500 font-medium">Manage your profile and public presence</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Dynamic Profile Card */}
        <div className="lg:col-span-4" data-aos="fade-right">
          <div className="sticky top-10 bg-white/70 backdrop-blur-2xl border border-white p-8 rounded-[3rem] shadow-2xl flex flex-col items-center text-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-indigo-400 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <img
                src={photoURL || "https://i.ibb.co/9yK7qfM/user.png"}
                alt="Live Preview"
                className="relative w-48 h-48 rounded-full border-[8px] border-white shadow-xl object-cover z-10 transition-transform duration-700 group-hover:scale-105"
                onError={(e) => { e.target.src = "https://i.ibb.co/9yK7qfM/user.png" }}
              />
              <div className="absolute bottom-2 right-2 z-20 bg-indigo-600 p-3 rounded-full border-4 border-white text-white shadow-lg animate-pulse">
                <Camera className="w-5 h-5" />
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-2xl font-black text-gray-800 tracking-tight">{name || "Anonymous"}</h3>
              <p className="text-indigo-600 font-semibold text-sm mt-1">{currentUser?.email}</p>
              {userData?.isPremium && (
                <span className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-black uppercase rounded-full shadow-lg">
                  <Sparkles className="w-3 h-3 fill-current" /> Premium Member
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Settings Form */}
        <div className="lg:col-span-8" data-aos="fade-left">
          <div className="bg-white/40 backdrop-blur-xl border border-white/50 p-8 md:p-12 rounded-[3rem] shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-indigo-900 ml-2">Display Name</label>
                  <div className="relative group">
                    <User className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isFocused === 'name' ? 'text-indigo-500' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      value={name}
                      onFocus={() => setIsFocused('name')}
                      onBlur={() => setIsFocused(null)}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-[1.5rem] focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all shadow-sm"
                      placeholder="Your Full Name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-indigo-900 ml-2">Profile Picture URL (Live)</label>
                  <div className="relative group">
                    <LinkIcon className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isFocused === 'photo' ? 'text-purple-500' : 'text-gray-400'}`} />
                    <input
                      type="url"
                      value={photoURL}
                      onFocus={() => setIsFocused('photo')}
                      onBlur={() => setIsFocused(null)}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-[1.5rem] focus:ring-4 focus:ring-purple-500/10 outline-none transition-all shadow-sm"
                      placeholder="https://image-link.com/photo.jpg"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 group"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                  <>
                    <span className="uppercase tracking-widest">Update Profile</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Dynamic Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20" data-aos="zoom-in-up">
        <StatCard icon={<BookOpen />} count={lessonsCount} label="Lessons Created" color="bg-blue-500" />
        <StatCard icon={<Heart />} count={savedCount} label="Favorites" color="bg-rose-500" />
        <div className={`p-10 rounded-[2.5rem] shadow-xl flex flex-col items-center justify-center transition-all ${userData?.isPremium ? 'bg-indigo-900 text-white' : 'bg-gray-100 text-gray-400 border-2 border-dashed'}`}>
            {userData?.isPremium ? <Sparkles className="w-10 h-10 mb-4 text-amber-400 fill-current" /> : <User className="w-10 h-10 mb-4 opacity-20" />}
            <p className="text-xl font-black uppercase tracking-tighter">{userData?.isPremium ? 'Premium Plan' : 'Standard Plan'}</p>
        </div>
      </div>

      {/* Public Works Section */}
      <div className="mt-32" data-aos="fade-up">
        <h3 className="text-3xl font-black text-gray-800 mb-10 flex items-center gap-4">
          <div className="w-2 h-10 bg-indigo-600 rounded-full"></div>
          Public Lessons
        </h3>
        
        {fetchingStats ? (
          <div className="flex justify-center py-20"><Loader2 className="w-12 h-12 text-indigo-500 animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {publicLessons.map((lesson, idx) => (
              <div key={lesson._id} data-aos="fade-up" data-aos-delay={idx * 100} className="group bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-50">
                <div className="relative h-56 overflow-hidden">
                  <img src={lesson.imageURL || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <Link to={`/lessons/${lesson._id}`} className="bg-white text-indigo-900 p-4 rounded-full shadow-xl transform scale-50 group-hover:scale-100 transition-transform"><Eye /></Link>
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">{lesson.title}</h4>
                  <p className="text-gray-500 mt-2 text-sm line-clamp-2">{lesson.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper Stat Card Component
const StatCard = ({ icon, count, label, color }) => (
  <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-50 flex flex-col items-center group hover:-translate-y-2 transition-all">
    <div className={`p-4 rounded-2xl ${color} text-white mb-6 shadow-lg group-hover:rotate-12 transition-transform`}>
      {React.cloneElement(icon, { size: 32 })}
    </div>
    <span className="text-5xl font-black text-gray-900 tracking-tighter">{count}</span>
    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">{label}</span>
  </div>
);

export default MyProfile;