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
} from "lucide-react";
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
    page: currentPage,
    limit,
    search: searchTerm,
    category: selectedCategory,
    emotionalTone: selectedTone,
    accessLevel: selectedAccessLevel,
    sort: sortBy,
  }).toString();

  const { data: response, loading, error } =
    useAxiosPublic(`/public?${queryParams}`);

  const lessons = response?.lessons || [];
  const totalPages = response?.totalPages || 1;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedTone, selectedAccessLevel, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-8 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6" />
        <p className="text-xl font-medium text-gray-700">Loading public lessons...</p>
      </div>
    );
  }

  if (error) {
    toast.error("Failed to load lessons");
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <AlertCircle className="w-16 h-16 text-red-500 mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h2>
        <p className="text-gray-600 text-center max-w-md">
          We couldn't load the lessons. Please try again later or check your connection.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-10 md:mb-16">
          Public Life Lessons
        </h1>

        {/* Filters & Search – তোমার কোডে এটা ছিল না, কিন্তু assignment-এ filtering বলা আছে। যদি না চাও তাহলে comment করে দিও */}
        {/* <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>
          {/* Category, Tone, Access, Sort dropdowns – add if needed */}
        {/* </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {lessons.map((lesson) => {
            const isPremiumLocked =
              lesson.accessLevel === "premium" && !userData?.isPremium;

            return (
              <motion.div
                key={lesson._id}
                className="relative h-full"
                whileHover={{ scale: isPremiumLocked ? 1 : 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Premium Lock Overlay */}
                {isPremiumLocked && (
                  <div className="absolute inset-0 z-30 bg-black/70 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center text-white">
                    <Lock className="w-14 h-14 mb-4 text-amber-400" />
                    <p className="text-xl font-bold mb-3">Premium Lesson</p>
                    <p className="text-base text-gray-200 mb-6 text-center px-6">
                      Upgrade to unlock this exclusive content
                    </p>
                    <Link
                      to="/pricing"
                      className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-full shadow-lg transition-all hover:scale-105"
                    >
                      Upgrade Now
                    </Link>
                  </div>
                )}

                {/* Lesson Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col relative z-10 border border-gray-100">
                  <div
                    className={`flex flex-col flex-grow ${
                      isPremiumLocked ? "blur-sm pointer-events-none" : ""
                    }`}
                  >
                    {/* Image */}
                    <div className="h-48 overflow-hidden">
                      {lesson.imageURL ? (
                        <img
                          src={lesson.imageURL}
                          alt={lesson.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
                          <BookOpen className="w-16 h-16 text-indigo-400" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {lesson.title}
                      </h3>

                      <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                        {lesson.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                          {lesson.category}
                        </span>
                        {lesson.emotionalTone && (
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                            {lesson.emotionalTone}
                          </span>
                        )}
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            lesson.accessLevel === "premium"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {lesson.accessLevel.charAt(0).toUpperCase() + lesson.accessLevel.slice(1)}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-100">
                          <img
                            src={
                              lesson.creatorPhoto ||
                              "https://i.pravatar.cc/150?img=" + Math.floor(Math.random() * 70)
                            }
                            alt={lesson.creatorName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                          <User className="w-4 h-4 text-gray-500" />
                          {lesson.creatorName || "Anonymous"}
                        </p>
                      </div>

                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {new Date(lesson.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {!isPremiumLocked && (
                    <Link
                      to={`/lessons/${lesson._id}`}
                      className="mt-auto bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-center py-4 font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      See Details
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12 md:mt-16">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="p-3 bg-indigo-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition shadow-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <span className="text-lg font-bold px-6 py-3 bg-white border border-gray-200 rounded-lg shadow-sm">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-3 bg-indigo-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition shadow-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicLessons;