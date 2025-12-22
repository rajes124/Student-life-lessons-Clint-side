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
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-8 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    toast.error("Failed to load lessons");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-12">
          Public Life Lessons
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson) => {
            const isPremiumLocked =
              lesson.accessLevel === "premium" && !userData?.isPremium;

            return (
              <motion.div
                key={lesson._id}
                className="relative"
                whileHover={{ scale: isPremiumLocked ? 1 : 1.03 }}
              >
                {/* 🔒 Overlay */}
                {isPremiumLocked && (
                  <div className="absolute inset-0 z-30 bg-black/60 rounded-2xl flex flex-col items-center justify-center text-white">
                    <Lock className="w-12 h-12 mb-3 animate-bounce" />
                    <p className="font-bold mb-2">Premium Lesson</p>
                    <Link
                      to="/pricing"
                      className="px-6 py-2 bg-amber-500 rounded-full font-semibold hover:bg-amber-600"
                    >
                      Upgrade Now
                    </Link>
                  </div>
                )}

                {/* 🧊 Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col relative z-10">
                  {/* ✅ BLUR WRAPPER (image + content) */}
                  <div
                    className={`h-full ${
                      isPremiumLocked ? "blur-md pointer-events-none" : ""
                    }`}
                  >
                    {/* Image */}
                    {lesson.imageURL ? (
                      <img
                        src={lesson.imageURL}
                        alt={lesson.title}
                        className="h-44 w-full object-cover"
                      />
                    ) : (
                      <div className="h-44 flex flex-col items-center justify-center bg-indigo-50">
                        <Lock className="w-16 h-16 text-indigo-700 mb-2" />
                        <span className="font-semibold text-indigo-700">
                          Premium
                        </span>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-indigo-800 mb-2">
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
                          {lesson.accessLevel}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={
                            lesson.creatorPhoto ||
                            "https://i.pravatar.cc/150"
                          }
                          alt={lesson.creatorName}
                          className="w-10 h-10 rounded-full"
                        />
                        <p className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {lesson.creatorName}
                        </p>
                      </div>

                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(lesson.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {!isPremiumLocked && (
                    <Link
                      to={`/lessons/${lesson._id}`}
                      className="mt-auto bg-indigo-600 text-white text-center py-3 font-semibold hover:bg-indigo-700"
                    >
                      See Details →
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-14">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-40"
            >
              <ChevronLeft />
            </button>

            <span className="font-bold">{currentPage}</span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-40"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicLessons;
