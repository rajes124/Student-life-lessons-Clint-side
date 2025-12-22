// src/dashboard/admin/ManageLessons.jsx

import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";

const ManageLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await api.get("/admin/lessons");
        setLessons(res.data);
      } catch (error) {
        toast.error("Failed to load lessons");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const handleFeatureToggle = async (lessonId, currentFeatured) => {
    try {
      await api.put(`/admin/lessons/${lessonId}/feature`);
      toast.success(currentFeatured ? "Unfeatured" : "Featured successfully ⭐");
      setLessons(lessons.map(l => l._id === lessonId ? { ...l, isFeatured: !currentFeatured } : l));
    } catch (error) {
      toast.error("Failed to update featured status");
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    if (!window.confirm("Are you sure you want to delete this lesson? This action cannot be undone.")) return;

    try {
      await api.delete(`/admin/lessons/${lessonId}`);
      toast.success("Lesson deleted successfully");
      setLessons(lessons.filter(l => l._id !== lessonId));
    } catch (error) {
      toast.error("Failed to delete lesson");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-2xl sm:text-3xl text-indigo-700">
        Loading Lessons...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-indigo-800 mb-6 sm:mb-8 flex items-center gap-3 flex-wrap">
        📚 Manage Lessons ({lessons.length})
      </h1>

      {lessons.length === 0 ? (
        <div className="text-center py-20 sm:py-32 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl">
          <p className="text-xl sm:text-2xl text-gray-600 mb-4">No lessons created yet</p>
          <p className="text-base sm:text-lg text-gray-500 px-4">
            Users can add lessons from their dashboard
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
            >
              {/* Card Header with Title & Featured Badge */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 relative">
                <h3 className="text-base sm:text-lg font-bold text-white line-clamp-2 pr-14 sm:pr-16">
                  {lesson.title || "Untitled Lesson"}
                </h3>
                {lesson.isFeatured && (
                  <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-yellow-400 text-indigo-900 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    ⭐ Featured
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 space-y-3 flex-1">
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  👤{" "}
                  <span className="font-medium text-gray-800 truncate block max-w-full">
                    {lesson.creatorName || lesson.creatorEmail || "Unknown"}
                  </span>
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  🏷️ <span>{lesson.category || "Uncategorized"}</span>
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  👁️{" "}
                  <span
                    className={
                      lesson.visibility === "public"
                        ? "text-green-600 font-medium"
                        : "text-orange-600 font-medium"
                    }
                  >
                    {lesson.visibility === "public" ? "Public 🌍" : "Private 🔒"}
                  </span>
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  ❤️ <span className="font-medium">{lesson.likesCount || 0} Likes</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-gray-50 flex gap-3 mt-auto">
                <button
                  onClick={() => handleFeatureToggle(lesson._id, lesson.isFeatured)}
                  className={`flex-1 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 sm:gap-2 ${
                    lesson.isFeatured
                      ? "bg-gray-500 hover:bg-gray-600 text-white"
                      : "bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-indigo-900"
                  }`}
                >
                  {lesson.isFeatured ? "✖ Unfeature" : "⭐ Feature"}
                </button>

                <button
                  onClick={() => handleDeleteLesson(lesson._id)}
                  className="flex-1 py-2.5 sm:py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 sm:gap-2"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageLessons;