// src/components/HeroSlider.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import { ArrowRight } from "lucide-react";

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
    <section className="relative h-[80vh] md:h-screen w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-white/70 !w-3 !h-3",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-white !w-4 !h-4 !scale-125",
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop={true}
        speed={1200}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <img
                src={slide.img}
                alt={`Student life slide ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover brightness-[0.85]"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20"></div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-8 md:px-12 lg:px-16">
                <div className="text-center text-white max-w-4xl lg:max-w-6xl mx-auto">
                  {/* Quote */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-6 md:mb-10 drop-shadow-2xl animate-fadeInUp">
                    {slide.quote}
                  </h1>

                  {/* CTA Button with Icon */}
                  <button className="group inline-flex items-center gap-3 px-8 sm:px-10 md:px-12 py-4 md:py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg md:text-xl font-bold rounded-full shadow-xl hover:shadow-indigo-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 animate-fadeInUp animation-delay-300">
                    {slide.cta}
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-2" />
                  </button>
                </div>
              </div>

              {/* Custom Navigation Arrows – visible on larger screens */}
              <div className="swiper-button-prev hidden sm:flex !text-white !w-12 !h-12 md:!w-14 md:!h-14 after:!text-4xl hover:!text-indigo-300 transition-colors duration-300"></div>
              <div className="swiper-button-next hidden sm:flex !text-white !w-12 !h-12 md:!w-14 md:!h-14 after:!text-4xl hover:!text-indigo-300 transition-colors duration-300"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1.3s ease-out forwards;
        }
        .animation-delay-300 {
          animation-delay: 0.4s;
        }
      `}</style>
    </section>
  );
}