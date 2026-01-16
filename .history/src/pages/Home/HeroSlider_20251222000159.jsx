import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

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
    <section className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade" 
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-white/60",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-white !scale-125",
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop={true}
        speed={1200} // smooth transition
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <img
                src={slide.img}
                alt={`Student life slide ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />

            
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center px-6">
                <div className="text-center text-white max-w-5xl mx-auto">
                  {/* Quote – animated fade up */}
                  <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight mb-8 drop-shadow-2xl animate-fadeInUp">
                    {slide.quote}
                  </h1>

                  {/* CTA Button – premium glow effect */}
                  <button className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-indigo-500/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 animate-fadeInUp animation-delay-300">
                    {slide.cta}
                  </button>
                </div>
              </div>

              {/* Custom Navigation Arrows */}
              <div className="swiper-button-prev !text-white !w-12 !h-12 after:!text-3xl hover:!text-indigo-300 transition"></div>
              <div className="swiper-button-next !text-white !w-12 !h-12 after:!text-3xl hover:!text-indigo-300 transition"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles for Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1.2s ease-out forwards;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </section>
  );
}