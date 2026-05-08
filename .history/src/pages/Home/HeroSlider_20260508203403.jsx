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
    <section className="relative h-[70vh] sm:h-[80vh] md:h-screen w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 6500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass:
            "swiper-pagination-bullet !bg-white/50 !w-3 !h-3 !rounded-full !transition-all !duration-400",
          bulletActiveClass:
            "!bg-gradient-to-r !from-indigo-400 !to-purple-500 !w-5 !h-5 !scale-110 !shadow-lg !shadow-indigo-500/40",
        }}
        navigation={{
          nextEl: ".custom-swiper-next",
          prevEl: ".custom-swiper-prev",
        }}
        loop={true}
        speed={1400}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-24 top-16 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl opacity-90 animate-blob"></div>
                <div className="absolute right-4 top-14 w-52 h-52 rounded-full bg-fuchsia-500/15 blur-3xl opacity-90 animate-blob-slow"></div>
                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-fuchsia-500/10 blur-3xl opacity-70"></div>
                <span className="absolute top-24 left-1/3 w-2 h-2 rounded-full bg-white/75 animate-pulse-slow"></span>
                <span className="absolute top-10 right-1/4 w-3 h-3 rounded-full bg-cyan-300/70 animate-pulse-slower"></span>
                <span className="absolute bottom-28 right-20 w-2.5 h-2.5 rounded-full bg-violet-300/60 animate-pulse-slow"></span>
                <span className="absolute bottom-12 left-20 w-3.5 h-3.5 rounded-full bg-white/40 animate-pulse-slow"></span>
              </div>

              {/* Background with subtle parallax */}
              <div className="absolute inset-0 scale-110 transition-transform duration-[2000ms] swiper-slide-active:scale-100">
                <img
                  src={slide.img}
                  alt={`Slide ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.82] contrast-[1.05]"
                />
              </div>

              {/* Overlay with animated gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/10 transition-opacity duration-1000 swiper-slide-active:opacity-100 opacity-90"></div>

              {/* Content Container */}
              <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-10 md:px-12 lg:px-16 xl:px-20">
                <div className="text-center text-white max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                  <p className="text-sm sm:text-base md:text-lg uppercase tracking-[0.35em] text-indigo-200/80 mb-4 animate-fade-in-down">
                    Multi-layered student inspiration, now in motion
                  </p>

                  {/* Animated Quote – letter by letter feel */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight mb-8 md:mb-12 drop-shadow-2xl">
                    {slide.quote.split("").map((char, i) => (
                      <span
                        key={i}
                        className="inline-block opacity-0 translate-y-8 animate-reveal-letter"
                        style={{
                          animationDelay: `${i * 0.04}s`,
                          animationFillMode: "forwards",
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </h1>

                  {/* CTA Button – premium feel */}
                  <button
                    className="
                      group relative inline-flex items-center gap-3 
                      px-7 sm:px-9 md:px-11 lg:px-14 py-4 md:py-5 
                      bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 
                      hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800 
                      text-white text-base sm:text-lg md:text-xl font-bold 
                      rounded-full shadow-2xl shadow-indigo-900/40 
                      transition-all duration-500 
                      hover:shadow-indigo-500/50 hover:scale-105 hover:-translate-y-1.5 
                      active:scale-95
                      overflow-hidden
                    "
                  >
                    <span className="relative z-10">{slide.cta}</span>
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-400 group-hover:translate-x-3" />

                    {/* Shine effect on hover */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  </button>
                </div>
              </div>

              {/* Custom Navigation Arrows */}
              <button className="custom-swiper-prev hidden md:flex absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-20 w-14 h-14 items-center justify-center text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110 hover:text-indigo-300 shadow-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button className="custom-swiper-next hidden md:flex absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-20 w-14 h-14 items-center justify-center text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110 hover:text-indigo-300 shadow-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Global animation keyframes */}
      <style jsx global>{`
        @keyframes revealLetter {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes blobFloat {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-22px) scale(1.04);
          }
        }
        @keyframes blobFloatSlow {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-12px) scale(1.02);
          }
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-reveal-letter {
          animation: revealLetter 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-blob {
          animation: blobFloat 8s ease-in-out infinite;
        }
        .animate-blob-slow {
          animation: blobFloatSlow 10s ease-in-out infinite;
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.9s ease-out both;
        }
        .animate-pulse-slow {
          animation: pulse 3.5s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse 5s ease-in-out infinite;
        }

        /* Reduced motion respect */
        @media (prefers-reduced-motion: reduce) {
          .animate-reveal-letter,
          .animate-blob,
          .animate-blob-slow,
          .animate-fade-in-down,
          .animate-pulse-slow,
          .animate-pulse-slower {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .group:hover {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}