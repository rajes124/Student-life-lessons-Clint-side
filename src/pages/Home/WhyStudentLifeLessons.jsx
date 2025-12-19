const benefits = [
  {
    title: "Academic Growth & Study Hacks",
    desc: "Learn from exam mistakes, time management tips, and how to boost your grades through real student experiences."
  },
  {
    title: "Building Lifelong Friendships",
    desc: "Discover lessons on making friends, hostel life, group projects, and creating supportive networks that last beyond college."
  },
  {
    title: "Work-Life Balance & Stress Management",
    desc: "Find wisdom on balancing studies, extracurriculars, part-time jobs, and fun while handling exam pressure."
  },
  {
    title: "Preparation for Future Success",
    desc: "Gain insights on career choices, skill building, internships, and personal development for life after graduation."
  },
];

export default function WhyStudentLifeLessons() {
  return (
    <section className="py-20 px-6 bg-base-200">
      <h2 className="text-4xl font-bold text-center mb-16 text-indigo-800">
        Why Share Student Life Lessons?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="group bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-6 hover:scale-105 p-8 text-center"
          >
            {/* Icon Circle */}
            <div className="inline-flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center shadow-inner">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {benefit.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {benefit.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}