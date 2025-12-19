// src/pages/PublicLessons.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Lock, Calendar, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxiosPublic";

const PublicLessons = () => {
  const { userData } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTone, setSelectedTone] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  const { data: response, loading, error } = useAxiosPublic(
    `/public?page=${currentPage}&limit=${limit}&search=${searchTerm}&category=${selectedCategory}&emotionalTone=${selectedTone}`
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
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedTone]);

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

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search lessons..."
                className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-300"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border rounded-xl"
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
              className="px-4 py-3 border rounded-xl"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson) => {
            const isPremiumLocked =
              lesson.accessLevel?.toLowerCase() === "premium" &&
              !userData?.isPremium;

            return (
              <div key={lesson._id} className="relative h-full">
                {isPremiumLocked && (
                  <div className="absolute inset-0 z-20 bg-black/60 rounded-2xl flex flex-col items-center justify-center text-white">
                    <Lock className="w-12 h-12 mb-3" />
                    <p className="text-lg font-bold">Premium Lesson</p>
                    <Link
                      to="/pricing"
                      className="mt-4 px-6 py-2 bg-amber-500 rounded-full font-semibold"
                    >
                      Upgrade Now
                    </Link>
                  </div>
                )}

                <div
                  className={`bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col ${
                    isPremiumLocked ? "blur-sm" : ""
                  }`}
                >
                  {/* Image (smaller height) */}
                  {lesson.imageURL ? (
                    <img
                      src={lesson.imageURL}
                      alt={lesson.title}
                      className="h-44 w-full object-cover"
                    />
                  ) : (
                    <div className="h-44 bg-gradient-to-br from-indigo-200 to-purple-300 flex items-center justify-center">
                      <span className="text-6xl opacity-50">📖</span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-indigo-800 mb-2 line-clamp-2">
                      {lesson.title}
                    </h3>

                    {/* 🔥 Description fixed height */}
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

                        {/* ✅ Access Level */}
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold
    ${lesson.accessLevel === "premium"
      ? "bg-amber-100 text-amber-700"
      : "bg-green-100 text-green-700"}`}
  >
    {lesson.accessLevel || "free"}
  </span>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={lesson.creatorPhoto || "https://i.pravatar.cc/150"}
                        alt=""
                        className="w-10 h-10 rounded-full"
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

                    {/* Button always bottom */}
                    <Link
                      to={`/lessons/${lesson._id}`}
                      className="mt-auto block text-center bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700"
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
          <div className="flex justify-center gap-3 mt-14">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-lg font-bold ${
                  currentPage === i + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicLessons;
