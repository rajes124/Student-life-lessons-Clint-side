import { Lock } from 'lucide-react'; // npm install lucide-react (or use any icon library)

const FeaturedLessons = ({ lessons = [] }) => { // Dynamic lessons prop
  const dummyLessons = [
    { title: "Power of Consistency in Studies", desc: "Small daily habits like consistent revision can transform your grades and student life.", category: "Academic", tone: "Motivational", premium: false },
    { title: "Balancing Exams and Fun", desc: "How to manage stress during exams while enjoying campus life with friends.", category: "Balance", tone: "Realization", premium: true },
    { title: "Building Lifelong Friendships", desc: "Lessons from hostel life and group projects that teach teamwork and support.", category: "Relationships", tone: "Gratitude", premium: false },
  ];

  const displayLessons = lessons.length > 0 ? lessons : dummyLessons;

  return (
    <section className="py-16 px-6 bg-base-200">
      <h2 className="text-4xl font-bold text-center mb-12">⭐ Featured Student Life Lessons</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {displayLessons.map((lesson, index) => (
          <div key={index} className="relative card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <figure className="h-48">
              <img 
                src="https://thumbs.dreamstime.com/b/stack-books-cozy-chair-sunlit-window-nature-outside-view-self-improvement-reading-journal-evoking-placed-cushioned-391352127.jpg" 
                alt="student lesson" 
                className="w-full h-full object-cover" 
              />
            </figure>
            <div className="card-body p-6">
              <span className="text-sm font-semibold text-primary">Featured ⭐</span>
              <h3 className="text-xl font-semibold mt-2">{lesson.title}</h3>
              <p className="text-gray-600 mt-2">{lesson.desc}</p>
              <div className="flex gap-2 mt-4 flex-wrap">
                <div className="badge badge-outline badge-primary">{lesson.category || "Personal Growth"}</div>
                <div className="badge badge-outline badge-secondary">{lesson.tone || "Motivational"}</div>
              </div>
              <button className="mt-6 text-primary font-medium hover:underline">Read More →</button>
            </div>
            {lesson.premium && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-xl">
                <div className="text-white text-center">
                  <Lock className="w-12 h-12 mx-auto mb-2" />
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

export default FeaturedLessons;