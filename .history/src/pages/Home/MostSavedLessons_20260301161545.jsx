// src/components/MostSavedLessons.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Lock, Bookmark, ArrowRight } from "lucide-react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";

const MostSavedLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const images = [img1, img2, img3, img4];

  // Initialize AOS (if not global)
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
    });
  }, []);

  useEffect(() => {
    const fetchMostSaved = async () => {
      try {
        const res = await api.get("/lessons/most-saved");
        setLessons(res.data);
      } catch (error) {
        toast.error("Failed to load most saved lessons");

        // Fallback dummy data (kept same)
        setLessons([
          {
            _id: "1",
            title: "Overcoming Exam Anxiety",
            description:
              "Practical tips to stay calm and perform better during stressful exams.",
            category: "Mental Health",
            emotionalTone: "Motivational",
            saves: 1247,
            accessLevel: "free",
            premium: false,
          },
          {
            _id: "2",
            title: "Time Management for Busy Students",
            description:
              "How to juggle classes, assignments, and extracurriculars without burning out.",
            category: "Productivity",
            emotionalTone: "Realization",
            saves: 982,
            accessLevel: "premium",
            premium: true,
          },
          {
            _id: "3",
            title: "Making Friends in College",
            description:
              "Real stories on breaking the ice and building meaningful connections.",
            category: "Relationships",
            emotionalTone: "Gratitude",
            saves: 856,
            accessLevel: "free",
            premium: false,
          },
          {
            _id: "4",
            title: "Study Hacks That Actually Work",
            description:
              "Proven techniques from top students to retain more and study smarter.",
            category: "Academic",
            emotionalTone: "Motivational",
            saves: 743,
            accessLevel: "free",
            premium: false,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMostSaved();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16 sm:py-20 lg:py-24 min-h-[40vh]">
        <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-indigo-500 border-t-transparent"></div>
        <p className="mt-5 text-base sm:text-lg lg:text-xl text-gray-600">Loading most saved lessons...</p>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <p className="text-center py-16 sm:py-20 lg:py-24 text-base sm:text-lg lg:text-xl text-gray-500">
        No most saved lessons yet. Check back soon!
      </p>
    );
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white/50 relative overflow-hidden">
      <h2
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-12 md:mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        Most Saved Lessons
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto">
        {lessons.map((lesson, index) => {
          const isPremium = lesson.premium || lesson.accessLevel === "premium";
          const cardLink = isPremium ? "/pricing" : `/lessons/${lesson._id}`;

          return (
            <Link
              key={lesson._id || index}
              to={cardLink}
              className={`group relative bg-white/95 backdrop-blur-md rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] overflow-hidden flex flex-col h-full min-h-[420px] sm:min-h-[460px] border border-gray-100/80 hover:border-indigo-200/80 ${
                isPremium ? "cursor-pointer" : ""
              }`}
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
              data-aos-duration="800"
            >
              {/* Premium Overlay – with animation */}
              {isPremium && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 text-white transition-all duration-500 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100">
                  <Lock className="w-16 h-16 sm:w-20 sm:h-20 text-amber-400 mb-4 animate-pulse-slow drop-shadow-lg" />
                  <p className="text-xl sm:text-2xl font-bold mb-2 drop-shadow-md">Premium Lesson</p>
                  <p className="text-gray-200 text-center px-6 text-sm sm:text-base">
                    Upgrade to unlock this content
                  </p>
                </div>
              )}

              {/* Image */}
              <div className="relative h-44 sm:h-48 md:h-52 lg:h-56 overflow-hidden">
                <img
                  src={lesson.imageURL || images[index % images.length]}
                  alt={lesson.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow relative z-10">
                {/* Saves Counter – with count-up animation */}
                <div className="flex items-center gap-2 mb-4 text-indigo-600 font-medium text-sm sm:text-base">
                  <Bookmark className="w-5 h-5 fill-indigo-100 stroke-indigo-600 group-hover:fill-indigo-200 transition-colors" />
                  <span className="animate-count-up" data-count={lesson.saves || 0}>
                    0
                  </span>
                  Saves
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-indigo-700 transition-colors">
                  {lesson.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5 line-clamp-3 flex-grow">
                  {lesson.description}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {lesson.category}
                  </span>
                  {lesson.emotionalTone && (
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs sm:text-sm font-medium">
                      {lesson.emotionalTone}
                    </span>
                  )}
                </div>

                {/* Button */}
                <div className="mt-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:from-indigo-700 group-hover:to-purple-700 text-white font-semibold text-sm sm:text-base rounded-lg shadow transition-all duration-300 hover:shadow-purple-500/50">
                  {isPremium ? "Upgrade to Unlock" : "Read More"}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default MostSavedLessons;