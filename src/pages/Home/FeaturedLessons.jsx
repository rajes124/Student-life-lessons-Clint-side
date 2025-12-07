import { useEffect, useState } from "react";

const dummyLessons = [
  {
    id: 1,
    title: "Time Management in College Life",
    desc: "How to manage study, work, and personal life effectively.",
    tag: "Life Skill",
  },
  {
    id: 2,
    title: "Overcoming Exam Stress",
    desc: "Practical mental strategies used by toppers.",
    tag: "Motivation",
  },
  {
    id: 3,
    title: "Learning From Failure",
    desc: "Why failing early is actually good for growth.",
    tag: "Mindset",
  },
  {
    id: 4,
    title: "Building Better Habits",
    desc: "Small daily habits that improve your future.",
    tag: "Self Growth",
  },
];

const FeaturedLessons = () => {
  const [visible, setVisible] = useState(false);

  // Animation Trigger
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Featured Life Lessons
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dummyLessons.map((lesson, index) => (
          <div
            key={lesson.id}
            className={`
              bg-white shadow-lg rounded-xl p-5 cursor-pointer
              border border-gray-200 
              transition-all duration-700 
              transform
              ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
              hover:scale-[1.03]
              hover:shadow-2xl
            `}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">
              {lesson.tag}
            </span>

            <h3 className="text-lg font-semibold mt-3">{lesson.title}</h3>

            <p className="text-gray-600 text-sm mt-2">{lesson.desc}</p>

            <button className="mt-4 text-blue-600 font-medium hover:underline">
              Read More →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedLessons;
