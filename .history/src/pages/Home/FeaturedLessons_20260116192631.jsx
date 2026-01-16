// src/components/FeaturedLessons.jsx
import { Lock, ArrowRight, Star, BookOpen, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import toast from "react-hot-toast";

const defaultImage =
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800";

const FeaturedLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get("/lessons/featured");
        setLessons(res.data);
      } catch (error) {
        toast.error("Failed to load featured lessons");
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
        <p className="mt-4 text-xl text-gray-600">Loading featured lessons...</p>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <p className="text-center py-20 text-xl text-gray-500">
        No featured lessons available yet.
      </p>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      {/* Title + Subtitle */}
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-4">
          Featured Student Life Lessons
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
          Curated wisdom that has inspired and guided thousands of students
        </p>
      </div>

      {/* Cards Grid – improved responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
        {lessons.map((lesson, index) => {
          const isPremium = lesson.accessLevel === "premium";

          return (
            <div
              key={lesson._id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full min-h-[480px]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={lesson.imageURL || defaultImage}
                  alt={lesson.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Featured Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-sm font-semibold rounded-full mb-4 shadow-md">
                  <Star className="w-4 h-4 fill-white" />
                  <span>Featured</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {lesson.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-base leading-relaxed mb-6 line-clamp-4 flex-grow">
                  {lesson.description}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {lesson.category}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    {lesson.emotionalTone}
                  </span>
                </div>

                {/* Read More Button */}
                <Link
                  to={`/lessons/${lesson._id}`}
                  className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/50 hover:translate-x-1 transition-all duration-300"
                >
                  Read More
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                </Link>
              </div>

              {/* Premium Overlay */}
              {isPremium && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <Lock className="w-14 h-14 text-amber-400 mb-4 drop-shadow-lg" />
                  <p className="text-2xl font-bold text-white drop-shadow-lg">
                    Premium Lesson
                  </p>
                  <p className="text-gray-200 mt-3 text-center px-6">
                    Upgrade your plan to unlock this content
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedLessons;