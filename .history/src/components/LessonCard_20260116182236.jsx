// src/components/LessonCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Lock, Star, BookOpen, Clock, User, Tag, Heart } from "lucide-react";

const LessonCard = ({ lesson, isPremiumUser }) => {
  const isPremiumLesson = lesson.accessLevel === "Premium";

  // Premium lock overlay (non-premium user sees this)
  if (isPremiumLesson && !isPremiumUser) {
    return (
      <div className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">
        <img
          src={lesson.image || "https://thumbs.dreamstime.com/b/stack-books-cozy-chair-sunlit-window-self-improvement-391352127.jpg"}
          alt={lesson.title}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end items-center text-white text-center p-6">
          <Lock className="w-12 h-12 mb-4 text-amber-400 animate-pulse" />
          <h3 className="text-xl font-bold mb-2">Premium Lesson</h3>
          <p className="text-sm opacity-90 mb-4 max-w-xs">
            Unlock this exclusive lesson with a premium subscription
          </p>
          <Link
            to="/pricing"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-indigo-900 font-semibold rounded-full transition transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <Star className="w-5 h-5 fill-current" />
            Upgrade Now
          </Link>
        </div>
      </div>
    );
  }

  // Normal lesson card (accessible)
  return (
    <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
      {/* Image with overlay gradient */}
      <div className="relative overflow-hidden">
        <img
          src={lesson.image || "https://thumbs.dreamstime.com/b/stack-books-cozy-chair-sunlit-window-self-improvement-391352127.jpg"}
          alt={lesson.title}
          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-indigo-800 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {lesson.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-5 text-sm line-clamp-3 leading-relaxed">
          {lesson.description}
        </p>

        {/* Tags / Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-flex items-center px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium border border-indigo-100">
            <Tag className="w-3.5 h-3.5 mr-1" />
            {lesson.category}
          </span>
          <span className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium border border-emerald-100">
            <Heart className="w-3.5 h-3.5 mr-1" />
            {lesson.emotionalTone}
          </span>
          {isPremiumLesson && (
            <span className="inline-flex items-center px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium border border-amber-100">
              <Star className="w-3.5 h-3.5 mr-1 fill-amber-500" />
              Premium
            </span>
          )}
        </div>

        {/* Footer info */}
        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <User className="w-4 h-4" />
            <span>By {lesson.creatorName}</span>
          </div>

          <Link
            to={`/lesson/${lesson._id}`}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition transform hover:scale-105 shadow-md text-sm"
          >
            <BookOpen className="w-4 h-4" />
            View Lesson
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;