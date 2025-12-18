// src/pages/PublicLessons.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Lock, Calendar, User } from "lucide-react"; // Icons
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxiosPublic";

const PublicLessons = () => {
  const { userData } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTone, setSelectedTone] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9; // 3 columns × 3 rows

  const { data: response, loading, error } = useAxiosPublic(
    `/lessons/public?page=${currentPage}&limit=${limit}&search=${searchTerm}&category=${selectedCategory}&emotionalTone=${selectedTone}`
  );

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
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [searchTerm, selectedCategory, selectedTone]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="w-20 h-20 border-8 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-3xl font-bold text-indigo-700">Loading Public Lessons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    toast.error("Failed to load public lessons");
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-2xl font-bold">
        Something went wrong! Please try again later.
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 px-6">
        <p className="text-4xl font-bold text-gray-700 mb-6">No public lessons found</p>
        <p className="text-xl text-gray-600 mb-10 text-center max-w-2xl">
          Be the first to share your life lesson with the community!
        </p>
        <Link
          to="/dashboard/add-lesson"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-6 rounded-full text-2xl font-bold shadow-2xl hover:shadow-3xl transition transform hover:scale-110"
        >
          Share Your Lesson
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
          Public Life Lessons
        </h1>
        <p className="text-center text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
          Explore wisdom and personal stories shared by the community
        </p>

        {/* Search + Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Search Bar with Icon */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or keywords..."
                className="w-full pl-14 pr-6 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition text-lg"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-6 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 text-lg"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Tone Filter */}
            <select
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value)}
              className="px-6 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 text-lg"
            >
              <option value="">All Tones</option>
              {tones.map((tone) => (
                <option key={tone} value={tone}>
                  {tone}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {lessons.map((lesson, index) => {
            const isPremiumLocked =
              lesson.accessLevel === "Premium" && !userData?.isPremium;

            return (
              <div
                key={lesson._id}
                className="group relative transform-gpu"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Premium Lock Overlay */}
                {isPremiumLocked && (
                  <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center text-white">
                    <Lock className="w-16 h-16 mb-4" />
                    <p className="text-2xl font-bold">Premium Lesson</p>
                    <p className="text-lg mt-2">Upgrade to view full content</p>
                    <Link
                      to="/pricing"
                      className="mt-6 px-8 py-3 bg-amber-500 hover:bg-amber-600 rounded-full font-bold text-lg shadow-lg"
                    >
                      Upgrade Now
                    </Link>
                  </div>
                )}

                <div
                  className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 group-hover:shadow-3xl group-hover:-translate-y-4 ${
                    isPremiumLocked ? "filter blur-md" : ""
                  }`}
                >
                  {/* Image */}
                  {lesson.imageURL ? (
                    <img
                      src={lesson.imageURL}
                      alt={lesson.title}
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gradient-to-br from-indigo-200 to-purple-300 flex items-center justify-center">
                      <span className="text-8xl opacity-50">📖</span>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-7">
                    <h3 className="text-2xl font-bold text-indigo-800 mb-3 line-clamp-2">
                      {lesson.title}
                    </h3>

                    <p className="text-gray-600 mb-5 line-clamp-3 leading-relaxed">
                      {lesson.description}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-3 mb-5">
                      <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
                        {lesson.category}
                      </span>
                      <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                        {lesson.emotionalTone}
                      </span>
                      {lesson.accessLevel === "Premium" && (
                        <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                          Premium ⭐
                        </span>
                      )}
                    </div>

                    {/* Creator Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={lesson.creatorPhoto || "https://i.pravatar.cc/150"}
                        alt={lesson.creatorName}
                        className="w-12 h-12 rounded-full object-cover ring-4 ring-indigo-100"
                      />
                      <div>
                        <p className="font-semibold text-gray-800 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {lesson.creatorName || "Anonymous"}
                        </p>
                      </div>
                    </div>

                    {/* Date */}
                    <p className="text-sm text-gray-500 flex items-center gap-2 mb-6">
                      <Calendar className="w-4 h-4" />
                      {new Date(lesson.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>

                    {/* See Details Button */}
                    <Link
                      to={`/lessons/${lesson._id}`}
                      className="block w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg transition transform hover:scale-105"
                    >
                      See Details →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-indigo-700 transition"
            >
              Previous
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-12 h-12 rounded-xl font-bold transition ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 hover:bg-indigo-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-indigo-700 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicLessons;