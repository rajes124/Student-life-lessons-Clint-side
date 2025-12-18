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
    return <p className="text-center py-16">Loading featured lessons...</p>;
  }

  return (
    <section className="py-20 px-6 bg-base-200">
      <h2 className="text-4xl font-bold text-center mb-14">
        ⭐ Featured Student Life Lessons
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {lessons.map((lesson) => {
          const isPremium = lesson.accessLevel === "premium";

          return (
            <div
              key={lesson._id}
              className="group relative rounded-xl overflow-hidden bg-base-100 shadow-md
                         hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={lesson.imageURL || defaultImage}
                  alt={lesson.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-xs font-semibold text-primary tracking-wide">
                  Featured ⭐
                </span>

                <h3 className="text-lg font-semibold mt-1 line-clamp-2">
                  {lesson.title}
                </h3>

                <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                  {lesson.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="badge badge-outline badge-primary text-xs">
                    {lesson.category}
                  </span>
                  <span className="badge badge-outline badge-secondary text-xs">
                    {lesson.emotionalTone}
                  </span>
                </div>

                {/* Read More Button */}
                <Link
                  to={`/lessons/${lesson._id}`}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 text-primary backdrop-blur-md bg-primary/5 hover:bg-primary hover:text-white transition-all duration-300 text-sm"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Premium Overlay */}
              {isPremium && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl">
                  <div className="text-center text-white">
                    <Lock className="w-10 h-10 mx-auto mb-2" />
                    <p className="font-bold text-base">Premium Lesson</p>
                    <p className="text-sm opacity-90">Upgrade to view</p>
                  </div>
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
