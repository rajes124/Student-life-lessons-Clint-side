// src/components/HeroSlider.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import slide1 from "../../assets/images/slide1.png";
import slide2 from "../../assets/images/slide2.png";
import slide3 from "../../assets/images/slide3.png";

const slides = [
  {
    img: slide1,
    quote: "Every challenge in student life builds your brighter future",
    cta: "Explore Lessons",
  },
  {
    img: slide2,
    quote: "Student life: Lessons beyond the classroom",
    cta: "Join the Community",
  },
  {
    img: slide3,
    quote: "Balance studies, friends, and personal growth",
    cta: "Start Your Journey",
  },
];

export default function HeroSlider() {
  return (
    <section className="relative h-[85vh] md:h-screen w-full overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          bulletClass: "swiper-pagination-bullet !bg-white/40 !w-8 !h-1 !rounded-full !transition-all !duration-500 !mx-1",
          bulletActiveClass: "!bg-white !w-12 !opacity-100",
        }}
        navigation={{
          nextEl: ".next-btn",
          prevEl: ".prev-btn",
        }}
        loop={true}
        speed={1500}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div className="relative h-full w-full flex items-center justify-center">
                {/* Background Image with Zoom Effect */}
                <div className={`absolute inset-0 transition-transform duration-[8000ms] ease-linear ${isActive ? 'scale-110' : 'scale-100'}`}>
                  <img
                    src={slide.img}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover brightness-[0.7]"
                  />
                </div>

                {/* Advanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>

                {/* Content Container */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 text-left">
                  <div className="max-w-3xl">
                    {/* Animated Heading */}
                    <h1 
                      className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.1] mb-8 transition-all duration-1000 delay-300 transform ${
                        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                      }`}
                    >
                      {slide.quote}
                    </h1>

                    {/* Animated CTA */}
                    <div className={`transition-all duration-1000 delay-700 transform ${
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                      <button className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-8 py-4 md:px-10 md:py-5 rounded-full text-lg md:text-xl font-bold transition-all hover:shadow-[0_0_40px_rgba(79,70,229,0.4)] flex items-center gap-3">
                        <span className="relative z-10">{slide.cta}</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}

        {/* Custom Navigation - Premium Style */}
        <div className="hidden lg:flex absolute bottom-12 right-20 z-20 gap-4">
          <button className="prev-btn w-14 h-14 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-indigo-600 transition-all duration-300">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button className="next-btn w-14 h-14 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-indigo-600 transition-all duration-300">
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        {/* Custom Pagination Container */}
        <div className="custom-pagination absolute !bottom-10 !left-1/2 !-translate-x-1/2 z-20 flex items-center justify-center lg:!left-20 lg:!translate-x-0"></div>
      </Swiper>

      {/* Hero Visual Depth Shadow */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
    </section>
  );
}