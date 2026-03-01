// src/components/WhyStudentLifeLessons.jsx
import React from "react";
import {
  BookOpen,
  Users,
  HeartPulse,
  Briefcase,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const benefits = [
  {
    title: "Academic Growth & Study Hacks",
    desc: "Learn from real exam mistakes, smart time management tricks, and proven ways to boost grades shared by thousands of students.",
    icon: BookOpen,
    gradient: "from-indigo-500 to-blue-600",
    light: "from-indigo-50 to-blue-50",
  },
  {
    title: "Lifelong Friendships & Social Life",
    desc: "Master the art of making friends, surviving hostel drama, rocking group projects, and building connections that last forever.",
    icon: Users,
    gradient: "from-purple-500 to-pink-600",
    light: "from-purple-50 to-pink-50",
  },
  {
    title: "Mental Health & Stress Mastery",
    desc: "Real stories and practical tools for handling exam pressure, burnout, anxiety, and finding balance in chaotic student life.",
    icon: HeartPulse,
    gradient: "from-rose-500 to-pink-600",
    light: "from-rose-50 to-pink-50",
  },
  {
    title: "Career Launch & Future-Ready Skills",
    desc: "Get insider wisdom on internships, resume building, choosing the right career path, and thriving after graduation.",
    icon: Briefcase,
    gradient: "from-amber-500 to-orange-600",
    light: "from-amber-50 to-orange-50",
  },
];

export default function WhyStudentLifeLessons() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Heading with sparkle */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20" data-aos="fade-down" data-aos-duration="1000">
          <div className="inline-flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-500 animate-pulse" />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Why Share Your Student Life Lessons?
            </h2>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Real experiences → Real wisdom → Real growth for every student
          </p>
        </div>

        {/* Cards – dynamic grid + hover effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`
                group relative 
                bg-white/90 backdrop-blur-sm border border-slate-100/80 
                rounded-2xl sm:rounded-3xl overflow-hidden 
                shadow-lg hover:shadow-2xl transition-all duration-500 
                hover:-translate-y-4 hover:scale-[1.015]
                flex flex-col h-full
              `}
              data-aos="fade-up"
              data-aos-delay={`${index * 120}`}
              data-aos-duration="900"
            >
              {/* Gradient top bar */}
              <div className={`h-2 bg-gradient-to-r ${benefit.gradient}`}></div>

              {/* Icon circle */}
              <div className="flex justify-center mt-8 sm:mt-10">
                <div className={`
                  relative w-20 h-20 sm:w-24 sm:h-24 
                  bg-gradient-to-br ${benefit.light} 
                  rounded-2xl flex items-center justify-center 
                  shadow-inner group-hover:scale-110 transition-transform duration-500
                `}>
                  <benefit.icon className={`w-10 h-10 sm:w-12 sm:h-12 text-transparent bg-gradient-to-br ${benefit.gradient} bg-clip-text`} />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow text-center">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-4 sm:mb-5 group-hover:text-indigo-700 transition-colors">
                  {benefit.title}
                </h3>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed flex-grow mb-6">
                  {benefit.desc}
                </p>

                {/* Learn more link */}
                <div className="mt-auto inline-flex items-center justify-center gap-2 text-indigo-600 font-medium text-sm sm:text-base group-hover:text-indigo-700 transition-colors">
                  Discover more
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}