// src/components/WhyStudentLifeLessons.jsx
import React from "react";
import {
  BookOpen,
  Users,
  HeartPulse,
  Briefcase,
} from "lucide-react";

const benefits = [
  {
    title: "Academic Growth & Study Hacks",
    desc: "Learn from exam mistakes, time management tips, and how to boost your grades through real student experiences.",
    icon: BookOpen,
  },
  {
    title: "Building Lifelong Friendships",
    desc: "Discover lessons on making friends, hostel life, group projects, and creating supportive networks that last beyond college.",
    icon: Users,
  },
  {
    title: "Work-Life Balance & Stress Management",
    desc: "Find wisdom on balancing studies, extracurriculars, part-time jobs, and fun while handling exam pressure.",
    icon: HeartPulse,
  },
  {
    title: "Preparation for Future Success",
    desc: "Gain insights on career choices, skill building, internships, and personal development for life after graduation.",
    icon: Briefcase,
  },
];

export default function WhyStudentLifeLessons() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-gray-800">
        Why Share Student Life Lessons?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-3 overflow-hidden p-6 md:p-8 text-center flex flex-col items-center"
          >
            {/* Icon Circle */}
            <div className="inline-flex items-center justify-center mb-6 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full shadow-inner group-hover:scale-110 transition-transform duration-300">
              <benefit.icon className="w-10 h-10 md:w-12 md:h-12 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4">
              {benefit.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm md:text-base leading-relaxed flex-grow">
              {benefit.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}