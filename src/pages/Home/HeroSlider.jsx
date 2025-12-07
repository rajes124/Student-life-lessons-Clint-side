import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Learn From Real Student Experiences",
    subtitle: "Life-changing lessons shared by students worldwide.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 2,
    title: "Grow Faster With Practical Life Knowledge",
    subtitle: "Not theory — real stories, real struggles, real solutions.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 3,
    title: "Share Your Own Life Lessons",
    subtitle: "Help others avoid mistakes you already faced.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=60",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[70vh] overflow-hidden rounded-lg shadow-lg">

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out 
            ${index === current ? "opacity-100" : "opacity-0"}
          `}
        >
          {/* Background image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Text Content */}
          <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-6 drop-shadow-lg">
              {slide.subtitle}
            </p>

            <button className="px-6 py-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition">
              Explore Lessons
            </button>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition 
              ${current === index ? "bg-white" : "bg-gray-400"}
            `}
            onClick={() => setCurrent(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
