// src/components/MostSavedLessons.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
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
    return <p className="text-center py-10">Loading most saved lessons...</p>;
  }

  if (lessons.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500">
        No most saved lessons yet. Check back soon!
      </p>
    );
  }

  return (
    <section className="py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">
        Most Saved Student Life Lessons
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {lessons.map((lesson, index) => {
          const isPremium = lesson.premium || lesson.accessLevel === "premium";

          return (
            <div
              key={lesson._id || index}
              className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform-gpu hover:-translate-y-8 hover:rotate-1 perspective-1000"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Premium Overlay */}
              {isPremium && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-xl z-10 text-white">
                  <Lock className="w-16 h-16 mb-4" />
                  <p className="text-2xl font-bold">Premium Lesson</p>
                  <p className="text-lg mt-2">Upgrade to view</p>
                </div>
              )}

              {/* Card */}
              <div className={`relative h-96 flex flex-col ${isPremium ? "blur-sm" : ""}`}>
                {/* Image - Fixed height */}
                <div className="h-48 overflow-hidden rounded-t-xl">
                  <img
                    src={images[index % images.length]}
                    alt={lesson.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Content - Takes remaining space */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Saves */}
                    <div className="flex items-center gap-2 mb-3 text-indigo-600 font-semibold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                      <span>{lesson.saves || 0} Saves</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                      {lesson.title}
                    </h3>

                    {/* Description - Max 3 lines */}
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {lesson.description}
                    </p>

                    {/* Badges */}
                    <div className="flex gap-2 flex-wrap mb-4">
                      <span className="badge badge-outline badge-primary text-xs py-2">
                        {lesson.category}
                      </span>
                      <span className="badge badge-outline badge-secondary text-xs py-2">
                        {lesson.emotionalTone}
                      </span>
                    </div>
                  </div>

                  {/* Button - Always at bottom */}
                  <Link
                    to={`/lessons/${lesson._id}`}
                    className="mt-auto inline-block w-full text-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition shadow-md"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MostSavedLessons;