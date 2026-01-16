// src/dashboard/user/MyProfile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Heart, Calendar, User, Sparkles, BookOpen, Edit, Loader2 } from "lucide-react";
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

  // Fetch stats & public lessons
  useEffect(() => {
    const fetchStatsAndLessons = async () => {
      try {
        // My Lessons count
        const lessonsRes = await api.get("/lessons/my-lessons");
        setLessonsCount(lessonsRes.data.lessons?.length || 0);

        // Saved count (Favorites)
        const favRes = await api.get("/lessons/my-favorites");
        setSavedCount(favRes.data.favorites?.length || 0);

        // Public lessons by this user
        const publicRes = await api.get("/lessons/my-lessons");
        setPublicLessons(publicRes.data.lessons?.filter(l => l.visibility === "Public") || []);
      } catch (error) {
        console.error("Failed to fetch profile stats:", error);
        toast.error("Failed to load profile stats");
      } finally {
        setFetchingStats(false);
      }
    };

    if (currentUser) {
      fetchStatsAndLessons();
    }
  }, [currentUser]);

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10 bg-white rounded-3xl shadow-2xl mt-10 border border-indigo-100">
      <h2 className="text-4xl md:text-5xl font-bold text-indigo-700 text-center mb-12 flex items-center justify-center gap-3">
        <User className="w-10 h-10 text-indigo-600" />
        My Profile
      </h2>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 lg:gap-16 mb-16">
        {/* Profile Photo & Info */}
        <div className="text-center md:text-left flex-shrink-0">
          <div className="relative mx-auto md:mx-0">
            <img
              src={currentUser?.photoURL || "https://i.ibb.co/9yK7qfM/user.png"}
              alt="Profile"
              className="w-40 h-40 md:w-48 md:h-48 rounded-full border-8 border-indigo-600 shadow-xl object-cover ring-4 ring-indigo-200"
            />
            {userData?.isPremium && (
              <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-indigo-900 p-3 rounded-full shadow-lg">
                <Star className="w-6 h-6 fill-amber-900" />
              </div>
            )}
          </div>
          <p className="mt-6 text-2xl font-bold text-gray-900">
            {currentUser?.displayName || "User"}
          </p>
          <p className="text-lg text-gray-600 mt-1 break-all">{currentUser?.email}</p>
        </div>

        {/* Update Form */}
        <div className="flex-1 w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="block text-xl font-medium text-gray-700 mb-3 flex items-center gap-2">
                <User className="w-6 h-6 text-indigo-600" />
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
                placeholder="Your display name"
              />
            </div>

            <div className="relative">
              <label className="block text-xl font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Image className="w-6 h-6 text-indigo-600" />
                Photo URL
              </label>
              <input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div className="text-center md:text-left">
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl py-4 px-12 rounded-xl shadow-2xl transition transform hover:scale-105 disabled:opacity-70 flex items-center justify-center gap-3 mx-auto md:mx-0 min-w-[220px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Profile"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-indigo-50 p-8 rounded-2xl text-center shadow-md hover:shadow-xl transition-all">
          <BookOpen className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <p className="text-5xl font-bold text-indigo-700">{lessonsCount}</p>
          <p className="text-xl text-gray-600 mt-3">Lessons Created</p>
        </div>

        <div className="bg-indigo-50 p-8 rounded-2xl text-center shadow-md hover:shadow-xl transition-all">
          <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-5xl font-bold text-indigo-700">{savedCount}</p>
          <p className="text-xl text-gray-600 mt-3">Lessons Saved</p>
        </div>

        {userData?.isPremium && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl text-center shadow-md hover:shadow-xl transition-all flex items-center justify-center">
            <div className="flex items-center gap-4">
              <Star className="w-12 h-12 text-amber-600 fill-amber-500" />
              <span className="text-4xl font-bold text-amber-800">Premium Member</span>
            </div>
          </div>
        )}
      </div>

      {/* Public Lessons Section */}
      <div className="mt-16">
        <h3 className="text-4xl font-bold text-indigo-700 text-center mb-10 flex items-center justify-center gap-3">
          <BookOpen className="w-10 h-10 text-indigo-600" />
          My Public Lessons
        </h3>

        {fetchingStats ? (
          <div className="text-center py-10">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
            <p className="text-xl text-gray-600">Loading public lessons...</p>
          </div>
        ) : publicLessons.length === 0 ? (
          <div className="text-center py-16 bg-indigo-50 rounded-2xl shadow-md">
            <p className="text-2xl text-gray-700">You haven't published any public lessons yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publicLessons.map((lesson) => (
              <div
                key={lesson._id}
                className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-indigo-100 hover:border-indigo-300"
              >
                {lesson.imageURL ? (
                  <img
                    src={lesson.imageURL}
                    alt={lesson.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-indigo-200 to-purple-300 flex items-center justify-center">
                    <BookOpen className="w-20 h-20 text-indigo-600 opacity-50" />
                  </div>
                )}

                <div className="p-6">
                  <h4 className="text-xl font-bold text-indigo-800 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {lesson.title}
                  </h4>
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {lesson.description}
                  </p>
                  <Link
                    to={`/lessons/${lesson._id}`}
                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                    View Details
                  </Link>
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