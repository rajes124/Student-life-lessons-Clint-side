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
      <h2 className="text-4xl font-bold text-center mb-12">Why Share Student Life Lessons?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {benefits.map((benefit, index) => (
          <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 text-center p-8">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 rounded-full p-8">
                {/* Placeholder for icon/image – you can replace with actual img */}
                <div className="w-24 h-24 bg-gray-200 rounded-full" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-4">{benefit.title}</h3>
            <p className="text-gray-600">{benefit.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}