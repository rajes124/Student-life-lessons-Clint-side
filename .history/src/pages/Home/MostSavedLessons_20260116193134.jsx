// src/components/MostSavedLessons.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Lock, Bookmark, ArrowRight } from "lucide-react";
import api from "../../utils/api";
import toast from "react-hot-toast";

import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";

const MostSavedLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const images = [img1, img2, img3, img4];

  useEffect(() => {
    const fetchMostSaved = async () => {
      try {
        const res = await api.get("/lessons/most-saved");
        setLessons(res.data);
      } catch (error) {
        toast.error("Failed to load most saved lessons");

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
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
        <p className="mt-4 text-lg text-gray-600">Loading most saved lessons...</p>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <p className="text-center py-16 text-lg text-gray-500">
        No most saved lessons yet. Check back soon!
      </p>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 md:mb-14 text-gray-800">
        Most Saved Student Life Lessons
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
        {lessons.map((lesson, index) => {
          const isPremium = lesson.premium || lesson.accessLevel === "premium";
          const cardLink = isPremium ? "/pricing" : `/lessons/${lesson._id}`;

          return (
            <Link
              key={lesson._id || index}
              to={cardLink}
              className={`group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col h-full min-h-[460px] ${
                isPremium ? "cursor-pointer hover:scale-[1.02]" : ""
              }`}
            >
              {/* Premium Overlay – shown on hover */}
              {isPremium && (
                <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center z-10 text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <Lock className="w-14 h-14 mb-4 text-amber-400" />
                  <p className="text-2xl font-bold mb-2">Premium Lesson</p>
                  <p className="text-gray-200 text-center px-6 text-base sm:text-lg">
                    Click to upgrade and unlock this content
                  </p>
                </div>
              )}

              {/* Card Content */}
              <div className="flex flex-col flex-grow">
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={images[index % images.length]}
                    alt={lesson.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  {/* Saves Counter */}
                  <div className="flex items-center gap-2 mb-4 text-indigo-600 font-medium">
                    <Bookmark className="w-5 h-5 fill-indigo-100 stroke-indigo-600" />
                    <span>{lesson.saves || 0} Saves</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {lesson.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3 flex-grow">
                    {lesson.description}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
                      {lesson.category}
                    </span>
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                      {lesson.emotionalTone}
                    </span>
                  </div>

                  {/* Read More / Upgrade Button */}
                  <div className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 group-hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition-all duration-300">
                    {isPremium ? "Upgrade to Unlock" : "Read More"}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
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