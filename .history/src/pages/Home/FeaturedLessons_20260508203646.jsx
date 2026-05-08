// src/components/FeaturedLessons.jsx
import { Lock, ArrowRight, Star, BookOpen, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import toast from "react-hot-toast";
import AOS from 'aos';
import 'aos/dist/aos.css';

const defaultImage =
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800";

const FeaturedLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize AOS only once
  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      easing: 'ease-out-quart',
      offset: 100,
    });
  }, []);

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
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping-slow"></div>
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
        </div>
        <p className="mt-6 text-xl font-medium text-gray-700">Loading featured lessons...</p>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-2xl font-medium text-gray-500">
          No featured lessons available yet.
        </p>
        <p className="mt-3 text-gray-600">Check back soon for new inspiring content!</p>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="pointer-events-none absolute -left-14 top-12 w-72 h-72 rounded-full bg-indigo-500/15 blur-3xl opacity-90 animate-blob"></div>
      <div className="pointer-events-none absolute right-0 top-28 w-60 h-60 rounded-full bg-fuchsia-400/10 blur-3xl opacity-80 animate-blob-slow"></div>
      <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 w-[34rem] h-[34rem] rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl opacity-60"></div>
      <div className="pointer-events-none absolute left-16 top-32 w-3 h-3 rounded-full bg-white/80 animate-pulse-slow"></div>
      <div className="pointer-events-none absolute right-24 bottom-28 w-4 h-4 rounded-full bg-purple-300/70 animate-pulse-slower"></div>
      {/* Section Header */}
      <div 
        className="text-center mb-12 md:mb-16 lg:mb-20 px-4 sm:px-6 lg:px-8"
        data-aos="fade-down"
        data-aos-delay="100"
      >
        <div className="inline-block mb-4">
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 rounded-full text-sm font-semibold shadow-sm">
            <Sparkles className="w-4 h-4 animate-pulse" />
            Curated Collection
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 md:mb-6 tracking-tight">
          Featured Student Life Lessons
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl lg:max-w-4xl mx-auto leading-relaxed">
          Hand-picked wisdom that has already inspired thousands of students
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {lessons.map((lesson, index) => {
          const isPremium = lesson.accessLevel === "premium";

          return (
            <div
              key={lesson._id}
              className={`
                group relative bg-white rounded-2xl sm:rounded-3xl
                shadow-xl hover:shadow-2xl
                transition-all duration-500 ease-out
                hover:-translate-y-3 hover:scale-[1.015]
                overflow-hidden flex flex-col h-full
                border border-gray-100/80
              `}
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
              data-aos-duration="800"
              data-aos-once="true"
            >
              <div className="pointer-events-none absolute right-6 top-6 w-16 h-16 rounded-full bg-indigo-100/70 blur-2xl opacity-90"></div>
              <div className="pointer-events-none absolute left-4 bottom-16 w-12 h-12 rounded-full bg-fuchsia-100/60 blur-2xl opacity-80"></div>
              {/* Image wrapper */}
              <div className="relative h-48 sm:h-52 md:h-56 lg:h-60 overflow-hidden">
                <img
                  src={lesson.imageURL || defaultImage}
                  alt={lesson.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-700 group-hover:opacity-90" />
                <span className="absolute -top-2 right-6 block w-3 h-3 rounded-full bg-white/80 animate-pulse-slower" />
                <span className="absolute bottom-5 left-8 block w-2.5 h-2.5 rounded-full bg-purple-300/80 animate-pulse-slow" />
                {/* Featured badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-sm font-bold rounded-full shadow-lg shadow-amber-500/30">
                    <Star className="w-4 h-4 fill-white animate-pulse-slow" />
                    Featured
                    <div className="absolute -inset-1 rounded-full bg-amber-400/30 animate-ping-slow pointer-events-none"></div>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 md:p-7 flex flex-col flex-grow relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 md:mb-4 line-clamp-2 leading-tight group-hover:text-indigo-700 transition-colors">
                  {lesson.title}
                </h3>

                <p className="text-gray-600 text-base leading-relaxed mb-5 md:mb-6 line-clamp-4 flex-grow">
                  {lesson.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2.5 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs sm:text-sm font-medium">
                    <BookOpen className="w-3.5 h-3.5" />
                    {lesson.category}
                  </span>
                  {lesson.emotionalTone && (
                    <span className="px-3.5 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs sm:text-sm font-medium">
                      {lesson.emotionalTone}
                    </span>
                  )}
                </div>

                {/* Action Button */}
                <Link
                  to={`/lessons/${lesson._id}`}
                  className={`
                    mt-auto relative overflow-hidden
                    inline-flex items-center justify-center gap-2.5
                    px-6 py-3.5 sm:px-8 sm:py-4
                    bg-gradient-to-r from-indigo-600 to-purple-600
                    hover:from-indigo-700 hover:to-purple-700
                    text-white font-semibold text-base sm:text-lg
                    rounded-full shadow-lg hover:shadow-xl hover:shadow-indigo-500/40
                    transition-all duration-400
                    group/btn
                  `}
                >
                  <span className="relative z-10">Read Lesson</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-400 group-hover/btn:translate-x-2" />
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></span>
                </Link>
              </div>

              {/* Premium Lock Overlay */}
              {isPremium && (
                <div
                  className={`
                    absolute inset-0 bg-gradient-to-br from-black/85 to-gray-900/90
                    backdrop-blur-[6px] flex flex-col items-center justify-center
                    opacity-0 group-hover:opacity-100 transition-all duration-500
                    rounded-2xl sm:rounded-3xl
                    transform scale-95 group-hover:scale-100
                  `}
                >
                  <div className="relative mb-5">
                    <Lock className="w-16 h-16 sm:w-20 sm:h-20 text-amber-400 drop-shadow-2xl animate-pulse-slow" />
                    <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-amber-300 animate-spin-slow" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-white mb-3 drop-shadow-lg">
                    Premium Content
                  </p>
                  <p className="text-gray-200 text-base sm:text-lg text-center px-6 sm:px-10 max-w-xs">
                    Unlock this lesson with a Premium subscription
                  </p>
                  <Link
                    to="/pricing"
                    className="mt-6 px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold rounded-full shadow-lg hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105"
                  >
                    Upgrade Now
                  </Link>
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