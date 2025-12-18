// src/components/LessonCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

const LessonCard = ({ lesson, isPremiumUser }) => {
  const isPremiumLesson = lesson.accessLevel === "Premium";

  // যদি লেসন Premium এবং user Premium না হয়
  if (isPremiumLesson && !isPremiumUser) {
    return (
      <div className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1">
        <img
          src={lesson.image || "https://thumbs.dreamstime.com/b/stack-books-cozy-chair-sunlit-window-self-improvement-391352127.jpg"}
          alt={lesson.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center p-4">
          <Lock className="w-10 h-10 mb-2" />
          <p className="font-bold text-lg">Premium Lesson</p>
          <p className="text-sm opacity-90">Upgrade to view</p>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 overflow-hidden">
      {lesson.image && (
        <img
          src={lesson.image}
          alt={lesson.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}

      <div className="p-5">
        <h3 className="text-xl font-bold text-indigo-700 mb-2 line-clamp-2">{lesson.title}</h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{lesson.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">{lesson.category}</span>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">{lesson.emotionalTone}</span>
          {isPremiumLesson && (
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs flex items-center gap-1">
              ⭐ Premium
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">By {lesson.creatorName}</p>
          <Link
            to={`/lesson/${lesson._id}`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
