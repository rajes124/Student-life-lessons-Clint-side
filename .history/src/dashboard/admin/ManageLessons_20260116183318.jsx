// src/dashboard/admin/ManageLessons.jsx
import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import {
  BookOpen,
  User,
  Tag,
  Eye,
  Heart,
  Star,
  Trash2,
  Pin,
  PinOff,
  AlertCircle,
} from "lucide-react";

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
      toast.success(currentFeatured ? "Lesson unfeatured" : "Lesson featured successfully");
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-indigo-600 animate-pulse mx-auto mb-4" />
          <p className="text-2xl font-bold text-indigo-700">Loading Lessons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-indigo-800 mb-10 flex items-center gap-3">
        <BookOpen className="w-10 h-10 text-indigo-600" />
        Manage Lessons ({lessons.length})
      </h1>

      {lessons.length === 0 ? (
        <div className="text-center py-32 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl shadow-lg">
          <AlertCircle className="w-16 h-16 text-indigo-500 mx-auto mb-6" />
          <p className="text-3xl font-bold text-gray-700 mb-4">No lessons found</p>
          <p className="text-xl text-gray-600">Users can create new lessons from their dashboard</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-300 group"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-5 relative">
                <h3 className="text-lg font-bold text-white line-clamp-2 pr-20">
                  {lesson.title || "Untitled Lesson"}
                </h3>

                {lesson.isFeatured && (
                  <div className="absolute top-4 right-4 bg-amber-400 text-indigo-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                    <Star className="w-4 h-4 fill-amber-900" />
                    Featured
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <User className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium">
                    {lesson.creatorName || lesson.creatorEmail || "Unknown"}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Tag className="w-5 h-5 text-purple-600" />
                  <span>{lesson.category || "Uncategorized"}</span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Eye className="w-5 h-5 text-green-600" />
                  <span className={`font-medium ${lesson.visibility === "public" ? "text-green-600" : "text-orange-600"}`}>
                    {lesson.visibility === "public" ? "Public" : "Private"}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="font-medium">{lesson.likesCount || 0} Likes</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 bg-gray-50 border-t border-gray-100 flex gap-4">
                <button
                  onClick={() => handleFeatureToggle(lesson._id, lesson.isFeatured)}
                  className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
                    lesson.isFeatured
                      ? "bg-gray-600 hover:bg-gray-700 text-white"
                      : "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-indigo-900"
                  }`}
                >
                  {lesson.isFeatured ? (
                    <>
                      <PinOff className="w-4 h-4" />
                      Unfeature
                    </>
                  ) : (
                    <>
                      <Pin className="w-4 h-4" />
                      Feature
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDeleteLesson(lesson._id)}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
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