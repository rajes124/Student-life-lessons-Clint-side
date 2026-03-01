// src/pages/Topics.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import { BookOpen, Users, HeartPulse, Briefcase, Sparkles } from "lucide-react";

const topicIcons = {
  "academic-growth": BookOpen,
  "lifelong-friendships": Users,
  "mental-health": HeartPulse,
  "career-launch": Briefcase,
};

const topicData = {
  "academic-growth": {
    title: "Academic Growth & Study Hacks",
    desc: "Boost your learning with proven strategies from real students.",
  },
  "lifelong-friendships": {
    title: "Lifelong Friendships & Social Life",
    desc: "Build meaningful connections that last beyond campus.",
  },
  "mental-health": {
    title: "Mental Health & Stress Mastery",
    desc: "Tools for maintaining balance in student life.",
  },
  "career-launch": {
    title: "Career Launch & Future-Ready Skills",
    desc: "Prepare for professional success with practical insights.",
  },
};

const Topics = () => {
  const { slug } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const topic = topicData[slug] || { title: "Topic Not Found", desc: "" };
  const Icon = topicIcons[slug] || Sparkles;

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        // Dynamic API call based on category/slug
        const res = await api.get(`/lessons/topic/${slug}`);
        setLessons(res.data);
      } catch (error) {
        toast.error("Failed to load lessons");
        // Fallback dummy data
        setLessons([
          { _id: "1", title: "Lesson 1", description: "Description 1", category: slug, emotionalTone: "Motivational" },
          { _id: "2", title: "Lesson 2", description: "Description 2", category: slug, emotionalTone: "Inspirational" },
          // আরও ডামি ডেটা যোগ করুন যদি চান
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-32">Loading lessons...</div>;
  }

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Topic Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20" data-aos="fade-down" data-aos-duration="1000">
          <div className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 mb-6 shadow-lg">
            <Icon className="w-12 h-12 sm:w-14 sm:h-14 text-indigo-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {topic.title}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto">
            {topic.desc}
          </p>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className="group bg-white/90 backdrop-blur-sm border border-slate-100 rounded-2xl sm:rounded-3xl p-6 sm:p-7 hover:shadow-xl hover:shadow-indigo-100/40 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02]"
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
              data-aos-duration="800"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 group-hover:text-indigo-700 transition-colors">
                {lesson.title}
              </h3>
              <p className="text-slate-600 text-base leading-relaxed mb-5 line-clamp-3">
                {lesson.description}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs sm:text-sm font-medium">
                  {lesson.category}
                </span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs sm:text-sm font-medium">
                  {lesson.emotionalTone}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Topics;