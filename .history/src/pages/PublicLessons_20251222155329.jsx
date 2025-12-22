// src/pages/PublicLessons.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Lock, Calendar, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { motion } from "framer-motion";

const PublicLessons = () => {
  const { userData } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTone, setSelectedTone] = useState("");
  const [selectedAccessLevel, setSelectedAccessLevel] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  const queryParams = new URLSearchParams({
    page: currentPage.toString(),
    limit: limit.toString(),
    search: searchTerm,
    category: selectedCategory,
    emotionalTone: selectedTone,
    accessLevel: selectedAccessLevel,
    sort: sortBy,
  }).toString();

  const { data: response, loading, error } = useAxiosPublic(`/public?${queryParams}`);

  const lessons = response?.lessons || [];
  const totalPages = response?.totalPages || 1;

  const categories = [
    "Personal Growth",
    "Career",
    "Relationships",
    "Mindset",
    "Mistakes Learned",
  ];

  const tones = ["Motivational", "Sad", "Realization", "Gratitude"];

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedTone, selectedAccessLevel, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-8 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-2xl font-bold text-indigo-700">
            Loading Public Lessons...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    toast.error("Failed to load public lessons");
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl font-bold">
        Something went wrong! Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
          Public Life Lessons
        </h1>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search lessons..."
                className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-300 outline-none"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border rounded-xl outline-none"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value)}
              className="px-4 py-3 border rounded-xl outline-none"
            >
              <option value="">All Tones</option>
              {tones.map((tone) => (
                <option key={tone} value={tone}>
                  {tone}
                </option>
              ))}
            </select>

            <select
              value={selectedAccessLevel}
              onChange={(e) => setSelectedAccessLevel(e.target.value)}
              className="px-4 py-3 border rounded-xl outline-none"
            >
              <option value="">All Access</option>
              <option value="free">Free</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          <div className="mt-6 flex justify-end">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-3 border rounded-xl bg-indigo-50 text-indigo-700 font-medium outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="mostSaved">Most Saved</option>
              <option value="mostLiked">Most Liked</option>
            </select>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson) => {
            const isPremiumLocked =
              lesson.accessLevel?.toLowerCase() === "premium" && !userData?.isPremium;

            return (
              <motion.div
                key={lesson._id}
                className="group relative h-full perspective-1000"
                whileHover={{ scale: isPremiumLocked ? 1 : 1.03 }}
              >
                {/* Premium Lock Overlay */}
                {isPremiumLocked && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 z-20 bg-black/60 rounded-2xl flex flex-col items-center justify-center text-white transition-all duration-500"
                  >
                    <Lock className="w-12 h-12 mb-3 animate-bounce" />
                    <p className="text-lg font-bold mb-2">Premium Lesson</p>
                    <Link
                      to="/pricing"
                      className="px-6 py-2 bg-amber-500 hover:bg-amber-600 rounded-full font-semibold transition"
                    >
                      Upgrade Now
                    </Link>
                  </motion.div>
                )}

                {/* Lesson Card */}
                <div
                  className={`bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col transform-gpu transition-all duration-500 ease-out group-hover:rotate-1 group-hover:-translate-y-2 group-hover:shadow-2xl preserve-3d ${
                    isPremiumLocked ? "blur-sm" : ""
                  }`}
                >
                  {lesson.imageURL ? (
                    <img
                      src={lesson.imageURL}
                      alt={lesson.title}
                      className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                   <div className="flex flex-col items-center justify-center">
  <Lock className="w-16 h-16 text-indigo-700 mb-2" />
  <span className="text-sm font-semibold text-indigo-700">
    Premium
  </span>
</div>
                  )}

                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-indigo-800 mb-2 line-clamp-2">
                      {lesson.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {lesson.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {lesson.category}
                      </span>
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {lesson.emotionalTone}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          lesson.accessLevel === "premium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {lesson.accessLevel || "free"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={lesson.creatorPhoto || "https://i.pravatar.cc/150"}
                        alt={lesson.creatorName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <p className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {lesson.creatorName || "Anonymous"}
                      </p>
                    </div>

                    <p className="text-xs text-gray-500 flex items-center gap-1 mb-4">
                      <Calendar className="w-4 h-4" />
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </p>

                    <Link
                      to={`/lessons/${lesson._id}`}
                      className="mt-auto block text-center bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
                    >
                      See Details →
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-14">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-3 rounded-lg font-bold flex items-center gap-2 transition ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              <ChevronLeft className="w-5 h-5" /> Previous
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg font-bold transition ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-3 rounded-lg font-bold flex items-center gap-2 transition ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              Next <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicLessons;
