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

  // Profile update handler
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchStatsAndLessons = async () => {
      try {
        const lessonsRes = await api.get("/lessons/my-lessons");
        setLessonsCount(lessonsRes.data.lessons?.length || 0);

        const favRes = await api.get("/lessons/my-favorites");
        setSavedCount(favRes.data.favorites?.length || 0);

        setPublicLessons(lessonsRes.data.lessons?.filter(l => l.visibility === "Public") || []);
      } catch (error) {
        console.error("Failed to fetch profile stats:", error);
      } finally {
        setFetchingStats(false);
      }
    };

    if (currentUser) fetchStatsAndLessons();
  }, [currentUser]);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 lg:p-12 bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] mt-10 border border-white/20">
      
      {/* Header Section */}
      <div className="relative text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-indigo-900 flex items-center justify-center gap-4 tracking-tight">
          <User className="w-10 h-10 text-indigo-600" />
          Edit Profile
        </h2>
        <p className="text-gray-500 font-medium mt-2 italic">Update your public identity and profile picture</p>
        <div className="h-1.5 w-24 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Full Name Input */}
          <div className="relative group">
            <label className="block text-sm font-bold text-indigo-900 uppercase tracking-widest mb-3 ml-1">Full Name</label>
            <div className="relative">
              <User className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isFocused === 'name' ? 'text-indigo-500' : 'text-gray-400'}`} />
              <input
                type="text"
                value={name}
                onFocus={() => setIsFocused('name')}
                onBlur={() => setIsFocused(null)}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white transition-all duration-300 shadow-sm"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>

          {/* Profile Picture URL Input (Register Style) */}
          <div className="relative group">
            <label className="block text-sm font-bold text-indigo-900 uppercase tracking-widest mb-3 ml-1">Profile Picture URL</label>
            <div className="relative">
              <LinkIcon className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isFocused === 'photo' ? 'text-purple-500' : 'text-gray-400'}`} />
              <input
                type="url"
                value={photoURL}
                onFocus={() => setIsFocused('photo')}
                onBlur={() => setIsFocused(null)}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white transition-all duration-300 shadow-sm"
                placeholder="https://example.com/your-profile-photo.jpg"
              />
            </div>
            <p className="text-[11px] text-gray-400 mt-3 ml-1 flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-purple-400" />
              Your profile picture will be updated across the platform instantly.
            </p>
          </div>

          {/* Update Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-black rounded-2xl shadow-xl hover:shadow-indigo-500/40 transition-all duration-500 transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <span className="uppercase tracking-widest">Update Identity</span>
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Stats Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
        <div className="bg-white border border-gray-100 p-8 rounded-[2rem] text-center shadow-lg hover:border-indigo-200 transition-all group">
          <BookOpen className="w-10 h-10 text-indigo-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
          <p className="text-4xl font-black text-indigo-900">{lessonsCount}</p>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mt-2">Lessons Created</p>
        </div>

        <div className="bg-white border border-gray-100 p-8 rounded-[2rem] text-center shadow-lg hover:border-red-200 transition-all group">
          <Heart className="w-10 h-10 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
          <p className="text-4xl font-black text-indigo-900">{savedCount}</p>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mt-2">Lessons Saved</p>
        </div>

        <div className={`p-8 rounded-[2rem] text-center shadow-lg transition-all flex flex-col items-center justify-center ${userData?.isPremium ? 'bg-gradient-to-br from-amber-500 to-yellow-600 text-white' : 'bg-gray-50 border border-dashed border-gray-300'}`}>
          {userData?.isPremium ? (
            <>
              <Sparkles className="w-10 h-10 text-white fill-white mb-2" />
              <p className="text-2xl font-black uppercase tracking-tighter">Premium Active</p>
            </>
          ) : (
            <>
              <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Free Account</p>
              <Link to="/pricing" className="mt-2 text-indigo-600 font-bold hover:underline">Upgrade Now</Link>
            </>
          )}
        </div>
      </div>

      {/* Public Lessons Section */}
      <div className="mt-24">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-3xl font-black text-indigo-900 uppercase tracking-tight flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            My Public Works
          </h3>
          <div className="h-px flex-1 bg-gray-100 ml-6 hidden md:block"></div>
        </div>

        {fetchingStats ? (
          <div className="flex flex-col items-center py-20">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
          </div>
        ) : publicLessons.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
            <p className="text-xl text-gray-400 font-medium">No public lessons published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {publicLessons.map((lesson) => (
              <div key={lesson._id} className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                <div className="relative h-48 overflow-hidden">
                   <img 
                    src={lesson.imageURL || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d"} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt="" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <Link to={`/lessons/${lesson._id}`} className="text-white flex items-center gap-2 font-bold"><Eye className="w-4 h-4"/> View Live</Link>
                   </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-black text-gray-800 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">{lesson.title}</h4>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">{lesson.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;