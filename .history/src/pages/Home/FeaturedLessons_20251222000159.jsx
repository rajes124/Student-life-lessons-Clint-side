// src/components/FeaturedLessons.jsx
import { Lock, ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import toast from "react-hot-toast";

const defaultImage =
  "https://thumbs.dreamstime.com/b/stack-books-cozy-chair-sunlit-window-nature-outside-view-self-improvement-reading-journal-evoking-placed-cushioned-391352127.jpg";

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
    return <p className="text-center py-20 text-xl text-gray-600">Loading featured lessons...</p>;
  }

  if (lessons.length === 0) {
    return <p className="text-center py-20 text-gray-500">No featured lessons available yet.</p>;
  }

  return (
    <section className="py-20 px-6 bg-base-200">
      {/* Title + Subtitle */}
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-4">
          ⭐ Featured Student Life Lessons
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Curated wisdom that has inspired and guided thousands of students on their journey
        </p>
      </div>

      {/* Cards Grid – আরও ছোট */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {lessons.map((lesson, index) => {
          const isPremium = lesson.accessLevel === "premium";

          return (
            <div
              key={lesson._id}
              className="group relative bg-base-100 rounded-2xl shadow-xl overflow-hidden transition-all duration-700 transform-gpu hover:-translate-y-6 hover:scale-105 hover:rotate-1 hover:shadow-2xl"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
            
              <div className="relative h-48 overflow-hidden">
                <img
                  src={lesson.imageURL || defaultImage}
                  alt={lesson.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-120"
                />
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Content – আরও কম padding */}
              <div className="p-5">
                {/* Featured Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold rounded-full mb-3 shadow-md">
                  <span>✨ Featured</span>
                </div>

                {/* Title  */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {lesson.title}
                </h3>

                {/* Description  */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {lesson.description}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                    {lesson.category}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    {lesson.emotionalTone}
                  </span>
                </div>

                {/* Read More Button  */}
                <Link
                  to={`/lessons/${lesson._id}`}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full shadow-xl hover:shadow-purple-500/60 hover:translate-x-2 transition-all duration-500"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-3" />
                </Link>
              </div>

              {/* Premium Overlay */}
              {isPremium && (
                <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <Lock className="w-16 h-16 text-amber-400 mb-3 drop-shadow-2xl" />
                  <p className="text-2xl font-extrabold text-white drop-shadow-2xl">
                    Premium Lesson
                  </p>
                  <p className="text-base text-gray-200 mt-2">Upgrade to unlock</p>
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