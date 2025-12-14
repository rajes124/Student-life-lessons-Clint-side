const MostSavedLessons = ({ lessons = [] }) => {
  const dummyLessons = [
    { title: "Overcoming Exam Anxiety", desc: "Practical tips to stay calm and perform better during stressful exams.", category: "Mental Health", tone: "Motivational", saves: 1247, premium: false },
    { title: "Time Management for Busy Students", desc: "How to juggle classes, assignments, and extracurriculars without burning out.", category: "Productivity", tone: "Realization", saves: 982, premium: true },
    { title: "Making Friends in College", desc: "Real stories on breaking the ice and building meaningful connections.", category: "Relationships", tone: "Gratitude", saves: 856, premium: false },
    { title: "Study Hacks That Actually Work", desc: "Proven techniques from top students to retain more and study smarter.", category: "Academic", tone: "Motivational", saves: 743, premium: false },
  ];

  const displayLessons = lessons.length > 0 ? lessons : dummyLessons;

  return (
    <section className="py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">Most Saved Student Life Lessons</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {displayLessons.map((lesson, index) => (
          <div key={index} className="relative card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <figure className="h-48">
              <img 
                src="https://thumbs.dreamstime.com/b/clean-modern-workspace-laptop-study-books-coffee-natural-lighting-cozy-learning-environment-sleek-warm-cup-sit-371220820.jpg" 
                alt="student study" 
                className="w-full h-full object-cover" 
              />
            </figure>
            <div className="card-body p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🔖</span>
                <span className="text-lg font-bold text-primary">{lesson.saves} Saves</span>
              </div>
              <h3 className="text-xl font-semibold">{lesson.title}</h3>
              <p className="text-gray-600 mt-2">{lesson.desc}</p>
              <div className="flex gap-2 mt-4 flex-wrap">
                <div className="badge badge-outline badge-primary">{lesson.category}</div>
                <div className="badge badge-outline badge-secondary">{lesson.tone}</div>
              </div>
              <button className="mt-6 text-primary font-medium hover:underline">Read More →</button>
            </div>
            {lesson.premium && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-xl">
                <div className="text-white text-center">
                  <span className="text-5xl mb-2">🔒</span>
                  <p className="text-lg font-bold">Premium Lesson</p>
                  <p className="text-sm">Upgrade to view</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MostSavedLessons;