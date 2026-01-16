// src/pages/Dashboard/MyFavorites.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  Heart,
  Calendar,
  User,
  BookmarkX,
  Sparkles,
  Search,
  Eye,
  BookOpen,
  Star,
} from "lucide-react";

const MyFavorites = () => {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        const res = await api.get("/lessons/my-favorites");
        setFavorites(res.data.favorites || []);
      } catch (err) {
        toast.error("Failed to load your favorite lessons");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [currentUser]);

  const removeFavorite = async (lessonId) => {
    try {
      await api.post(`/lessons/favorite/${lessonId}`); // toggle favorite
      setFavorites(favorites.filter((f) => f._id !== lessonId));
      toast.success("Removed from favorites");
    } catch (err) {
      toast.error("Failed to remove from favorites");
    }
  };

  // Search filter (client-side)
  const filteredFavorites = favorites.filter(
    (lesson) =>
      lesson.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="w-20 h-20 border-8 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-3xl font-bold text-indigo-700">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <Heart className="w-32 h-32 text-pink-300 mx-auto mb-8 opacity-60" />
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 mb-6">
            No Favorite Lessons Yet
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Start exploring public lessons and save the ones that inspire you!
          </p>
          <Link
            to="/public-lessons"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white px-10 py-5 rounded-full text-2xl font-bold shadow-2xl hover:shadow-3xl transition transform hover:scale-110"
          >
            <BookOpen className="w-8 h-8" />
            Explore Lessons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 mb-4">
            My Favorite Lessons
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Your personal collection of wisdom and inspiration
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-7 h-7" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search in your favorites..."
              className="w-full pl-16 pr-8 py-5 text-lg border-0 rounded-2xl shadow-xl focus:ring-4 focus:ring-pink-300 focus:outline-none bg-white placeholder-gray-400 transition-all"
            />
          </div>
        </div>

        {/* Favorites Grid */}
        {filteredFavorites.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600">No lessons found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredFavorites.map((lesson, index) => {
              const isPremium = lesson.accessLevel?.toLowerCase() === "premium";

              return (
                <div
                  key={lesson._id}
                  className="group relative bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl hover:-translate-y-6 border border-gray-100 hover:border-pink-300 flex flex-col"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Premium Badge */}
                  {isPremium && (
                    <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-amber-400 to-yellow-500 text-indigo-900 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                      <Star className="w-5 h-5 fill-amber-900" />
                      Premium
                    </div>
                  )}

                  {/* Image */}
                  {lesson.imageURL ? (
                    <img
                      src={lesson.imageURL}
                      alt={lesson.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center">
                      <Heart className="w-24 h-24 text-white opacity-40" />
                    </div>
                  )}

                  {/* Content - flexible grow */}
                  <div className="p-8 flex-grow">
                    <h3 className="text-2xl font-bold text-indigo-800 mb-4 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {lesson.title}
                    </h3>

                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                      {lesson.description}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {lesson.category}
                      </span>
                      <span className="bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {lesson.emotionalTone}
                      </span>
                    </div>

                    {/* Creator Info */}
                    <div className="flex items-center gap-4 mb-8">
                      <img
                        src={lesson.creatorPhoto || "https://i.pravatar.cc/150"}
                        alt={lesson.creatorName}
                        className="w-12 h-12 rounded-full object-cover ring-4 ring-pink-100"
                      />
                      <div>
                        <p className="font-semibold text-gray-800 flex items-center gap-2">
                          <User className="w-5 h-5 text-indigo-600" />
                          {lesson.creatorName || "Anonymous"}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(lesson.createdAt).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Fixed Action Buttons at Bottom */}
                  <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-5 flex justify-between items-center gap-4 z-10 shadow-inner">
                    <Link
                      to={`/lessons/${lesson._id}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <Eye className="w-5 h-5" />
                      View Details
                    </Link>

                    <button
                      onClick={() => removeFavorite(lesson._id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-5 py-3 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <BookmarkX className="w-5 h-5" />
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;