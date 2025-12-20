// src/dashboard/user/MyProfile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Heart, Calendar, User, Sparkles } from "lucide-react";
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

  // Profile update handler (আগের মতোই অপরিবর্তিত)
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
        const publicRes = await api.get("/lessons/my-lessons"); // অথবা আলাদা endpoint থেকে public filter করে আনতে পারেন
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
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-2xl mt-10">
      <h2 className="text-5xl font-bold text-indigo-700 text-center mb-12">
        My Profile
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
        <div className="text-center">
          <img
            src={currentUser?.photoURL || "https://i.ibb.co/9yK7qfM/user.png"}
            alt="Profile"
            className="w-48 h-48 rounded-full border-8 border-indigo-600 shadow-xl object-cover"
          />
          <p className="mt-6 text-2xl font-bold text-gray-800">
            {currentUser?.displayName || "User"}
          </p>
          <p className="text-lg text-gray-600">{currentUser?.email}</p>
        </div>

        <div className="flex-1 w-full">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-xl font-medium text-gray-700 mb-3">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-xl font-medium text-gray-700 mb-3">
                Photo URL
              </label>
              <input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-500 focus:border-transparent"
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl py-5 px-16 rounded-xl shadow-2xl transition transform hover:scale-105 disabled:opacity-70"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* নতুন যোগ করা সেকশন – Stats & Premium Badge */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-indigo-50 p-6 rounded-2xl text-center shadow-md">
          <p className="text-4xl font-bold text-indigo-700">{lessonsCount}</p>
          <p className="text-lg text-gray-600 mt-2">Lessons Created</p>
        </div>

        <div className="bg-indigo-50 p-6 rounded-2xl text-center shadow-md">
          <p className="text-4xl font-bold text-indigo-700">{savedCount}</p>
          <p className="text-lg text-gray-600 mt-2">Lessons Saved</p>
        </div>

        {userData?.isPremium && (
          <div className="bg-yellow-50 p-6 rounded-2xl text-center shadow-md flex items-center justify-center">
            <span className="text-3xl font-bold text-yellow-700 flex items-center gap-3">
              Premium Member <Sparkles className="w-8 h-8" />
            </span>
          </div>
        )}
      </div>

      {/* Public Lessons by User */}
      <div className="mt-16">
        <h3 className="text-4xl font-bold text-indigo-700 text-center mb-10">
          My Public Lessons
        </h3>

        {fetchingStats ? (
          <p className="text-center text-xl">Loading public lessons...</p>
        ) : publicLessons.length === 0 ? (
          <p className="text-center text-xl text-gray-600">
            You haven't published any public lessons yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publicLessons.map((lesson) => (
              <div
                key={lesson._id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
              >
                {lesson.imageURL ? (
                  <img
                    src={lesson.imageURL}
                    alt={lesson.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-indigo-200 to-purple-300 flex items-center justify-center">
                    <span className="text-6xl opacity-50">📖</span>
                  </div>
                )}

                <div className="p-6">
                  <h4 className="text-xl font-bold text-indigo-800 mb-3 line-clamp-2">
                    {lesson.title}
                  </h4>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {lesson.description}
                  </p>
                  <Link
                    to={`/lessons/${lesson._id}`}
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    View Details →
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