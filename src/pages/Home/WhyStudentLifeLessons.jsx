// src/pages/Home/WhyStudentLife.jsx
const WhyStudentLife = () => {
  const benefits = [
    {
      title: "Never Forget Hard-Earned Wisdom",
      desc: "Life teaches through pain and joy. Save those moments before they fade.",
      icon: "🧠"
    },
    {
      title: "Grow Faster With Others' Experience",
      desc: "Why make the same mistakes? Learn from thousands who walked before you.",
      icon: "🚀"
    },
    {
      title: "Reflect & Become Your Best Self",
      desc: "Writing lessons helps you understand yourself deeper and grow consciously.",
      icon: "🌱"
    },
    {
      title: "Inspire The Next Generation",
      desc: "Your story might be exactly what someone needs to hear today.",
      icon: "✨"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">Why Learning From Life Matters</h2>
        <p className="text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
          Every experience is a teacher. This platform helps you capture, reflect, and share the lessons that shape who you are.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, idx) => (
            <div key={idx} className="text-center bg-gradient-to-b from-indigo-50 to-white p-8 rounded-2xl border border-indigo-100">
              <div className="text-6xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyStudentLife;