// src/pages/Home/HeroSlider.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    title: "Preserve Your Student Wisdom",
    description: "Every challenge you face today is a lesson for tomorrow. Start documenting your journey now.",
    buttonText: "Start Writing Your Journey",
    buttonLink: "/dashboard/add-lesson",
    gradient: "from-purple-700 to-indigo-900",
  },
  {
    title: "Learn From Real Student Stories",
    description: "Explore thousands of lessons on exams, relationships, career, mindset, and more.",
    buttonText: "Explore Public Lessons",
    buttonLink: "/public-lessons",
    gradient: "from-indigo-700 to-blue-900",
  },
  {
    title: "Grow Together as a Community",
    description: "Share your insights, save favorites, react, comment – and help others grow.",
    buttonText: "Join the Community",
    buttonLink: "/register",
    gradient: "from-purple-800 to-pink-800",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />
          <div className="relative z-10 text-white">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              {slide.title}
            </h1>
            <p className="text-lg md:text-2xl lg:text-3xl mb-10 max-w-4xl">
              {slide.description}
            </p>
            <Link
              to={slide.buttonLink}
              className="px-10 py-5 bg-white text-purple-700 text-xl font-bold rounded-full hover:bg-gray-100 transition shadow-2xl"
            >
              {slide.buttonText}
            </Link>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentSlide ? 'bg-white w-10' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Arrows (simple SVG without heroicons) */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white hover:text-gray-200"
      >
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white hover:text-gray-200"
      >
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default HeroSlider;  // এই লাইনটা অবশ্যই থাকতে হবে!