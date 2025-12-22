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
    page: currentPage.toString(),
    limit: limit.toString(),
    search: searchTerm,
    category: selectedCategory,
    emotionalTone: selectedTone,
    accessLevel: selectedAccessLevel,
    sort: sortBy,
  }).toString();

  const { data: response, loading, error } = useAxiosPublic(
    `/public?${queryParams}`
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
  }, [searchTerm, selectedCategory, selectedTone, selectedAccessLevel, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-bold">Loading Public Lessons...</p>
      </div>
    );
  }

  if (error) {
    toast.error("Failed to load public lessons");
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl font-bold">
        Something went wrong!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-10">
          Public Life Lessons
        </h1>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson) => {
            // ✅ SAFE premium detection (NO BREAKING CHANGE)
            const isLessonPremium =
              lesson.isPremium === true ||
              lesson.accessLevel?.toLowerCase() === "premium";

            const isPremiumLocked =
              isLessonPremium && !userData?.isPremium;

            return (
              <motion.div
                key={lesson._id}
                className="relative"
                whileHover={{ scale: isPremiumLocked ? 1 : 1.03 }}
              >
                {/* 🔒 LOCK OVERLAY */}
                {isPremiumLocked && (
                  <div className="absolute inset-0 z-20 bg-black/60 rounded-2xl flex flex-col items-center justify-center text-white">
                    <Lock className="w-12 h-12 mb-3" />
                    <p className="font-bold mb-3">Premium Lesson</p>
                    <Link
                      to="/pricing"
                      className="px-6 py-2 bg-amber-500 rounded-full font-semibold"
                    >
                      Upgrade Now
                    </Link>
                  </div>
                )}

                {/* CARD */}
                <div
                  className={`bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col transition ${
                    isPremiumLocked ? "blur-sm" : ""
                  }`}
                >
                  {lesson.imageURL ? (
                    <img
                      src={lesson.imageURL}
                      alt={lesson.title}
                      className="h-44 w-full object-cover"
                    />
                  ) : (
                    <div className="h-44 bg-indigo-200 flex items-center justify-center text-6xl">
                      📘
                    </div>
                  )}

                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2">
                      {lesson.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4">
                      {lesson.description}
                    </p>

                    <div className="flex gap-2 mb-4">
                      <span className="bg-indigo-100 px-3 py-1 rounded-full text-xs">
                        {lesson.category}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          isLessonPremium
                            ? "bg-amber-100 text-amber-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {isLessonPremium ? "premium" : "free"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <User className="w-4 h-4" />
                      <span>{lesson.creatorName || "Anonymous"}</span>
                    </div>

                    <p className="text-xs text-gray-500 flex items-center gap-1 mb-4">
                      <Calendar className="w-4 h-4" />
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </p>

                    <Link
                      to={`/lessons/${lesson._id}`}
                      className="mt-auto block text-center bg-indigo-600 text-white py-3 rounded-xl font-semibold"
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
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={() =>
                setCurrentPage((p) => Math.max(p - 1, 1))
              }
            >
              <ChevronLeft />
            </button>
            <span>{currentPage}</span>
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
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
