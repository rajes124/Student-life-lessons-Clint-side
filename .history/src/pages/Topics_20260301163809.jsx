// src/pages/Topics.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BookOpen, Users, HeartPulse, Briefcase, Sparkles, ArrowRight } from "lucide-react";

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
    color: "indigo",
  },
  "lifelong-friendships": {
    title: "Lifelong Friendships & Social Life",
    desc: "Build meaningful connections that last beyond campus.",
    color: "purple",
  },
  "mental-health": {
    title: "Mental Health & Stress Mastery",
    desc: "Tools for maintaining balance in student life.",
    color: "rose",
  },
  "career-launch": {
    title: "Career Launch & Future-Ready Skills",
    desc: "Prepare for professional success with practical insights.",
    color: "amber",
  },
};

// ডামি লেসন ডেটা (API না থাকলে এটা দেখাবে)
const dummyLessons = {
  "academic-growth": [
    { _id: "1", title: "How to Study Smarter, Not Harder", description: "Techniques to retain more in less time.", saves: 1247, emotionalTone: "Motivational" },
    { _id: "2", title: "Beating Procrastination in 2025", description: "Real student tricks that actually work.", saves: 982, emotionalTone: "Realization" },
    { _id: "3", title: "Note-Taking Methods That Changed My Grades", description: "From Cornell to mind maps — what works best.", saves: 856, emotionalTone: "Gratitude" },
  ],
  "lifelong-friendships": [
    { _id: "4", title: "First Week of College: Making Friends Fast", description: "Ice-breakers and small habits that help.", saves: 743, emotionalTone: "Inspirational" },
    { _id: "5", title: "Hostel Life: Surviving and Thriving", description: "Rules, friendships, and funny stories.", saves: 612, emotionalTone: "Humorous" },
  ],
  "mental-health": [
    { _id: "6", title: "Handling Exam Anxiety Like a Pro", description: "Breathing + mindset shifts that calm you.", saves: 1890, emotionalTone: "Calming" },
    { _id: "7", title: "Dealing with Burnout Before It Hits", description: "Early signs and quick recovery tips.", saves: 1345, emotionalTone: "Supportive" },
  ],
  "career-launch": [
    { _id: "8", title: "How to Choose the Right Major", description: "Questions you should ask yourself.", saves: 967, emotionalTone: "Clarifying" },
    { _id: "9", title: "Building a Killer Resume as a Student", description: "Templates and real examples.", saves: 821, emotionalTone: "Practical" },
  ],
};

const Topics = () => {
  const { slug } = useParams();

  const topic = topicData[slug] || {
    title: "Topic Not Found",
    desc: "Sorry, this topic doesn't exist yet.",
    color: "gray",
  };

  const Icon = topicIcons[slug] || Sparkles;

  // API এর বদলে ডামি ডেটা ব্যবহার করা হচ্ছে
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // সিমুলেটেড লোডিং (০.৮ সেকেন্ড)
    setTimeout(() => {
      setLessons(dummyLessons[slug] || []);
      setLoading(false);
    }, 800);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
          <p className="mt-6 text-xl text-gray-600">Loading {topic.title} lessons...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Topic Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20" data-aos="fade-down" data-aos-duration="1000">
          <div className={`inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-${topic.color}-50 to-${topic.color}-100 mb-6 shadow-lg`}>
            <Icon className={`w-12 h-12 sm:w-16 sm:h-16 text-${topic.color}-600`} />
          </div>
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-${topic.color}-600 via-${topic.color}-700 to-${topic.color}-800 bg-clip-text text-transparent mb-4`}>
            {topic.title}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {topic.desc}
          </p>
        </div>

        {/* Lessons Grid */}
        {lessons.length === 0 ? (
          <div className="text-center py-20 text-slate-500 text-xl">
            No lessons available in this topic yet. Coming soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {lessons.map((lesson, index) => (
              <div
                key={lesson._id}
                className={`
                  group relative bg-white rounded-2xl sm:rounded-3xl 
                  border border-slate-100 shadow-md hover:shadow-xl 
                  transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02]
                  overflow-hidden flex flex-col h-full
                `}
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
              >
                <div className={`h-2 bg-gradient-to-r ${topicData[slug]?.gradient || "from-indigo-500 to-purple-600"}`}></div>

                <div className="p-5 sm:p-6 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 mb-3 group-hover:text-indigo-700 transition-colors line-clamp-2">
                    {lesson.title}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5 flex-grow line-clamp-4">
                    {lesson.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs sm:text-sm font-medium">
                      {lesson.category || topic.title.split(" ")[0]}
                    </span>
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs sm:text-sm font-medium">
                      {lesson.emotionalTone || "Inspirational"}
                    </span>
                  </div>

                  <Link
                    to={`/lessons/${lesson._id}`}
                    className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm sm:text-base font-medium rounded-lg transition-all"
                  >
                    Read Lesson
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Topics;