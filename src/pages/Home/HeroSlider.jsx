import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
  {
    img: "https://thumbs.dreamstime.com/b/conceptual-illustration-depicting-student-s-journey-towards-bright-future-lone-student-wearing-graduation-cap-stands-414631008.jpg",
    quote: "Every challenge in student life builds your brighter future",
    cta: "Explore Lessons"
  },
  {
    img: "https://thumbs.dreamstime.com/b/graduating-student-viewed-behind-wearing-traditional-cap-gown-academic-hood-looks-out-over-sprawling-illuminated-416863339.jpg",
    quote: "Rise and shine – Study hard, dream bigger",
    cta: "Share Your Story"
  },
  {
    img: "https://thumbs.dreamstime.com/b/contemplative-student-backpack-road-sunrise-looking-toward-city-contemplative-student-backpack-road-sunrise-407798656.jpg",
    quote: "Student life: Lessons beyond the classroom",
    cta: "Join the Community"
  },
  {
    img: "https://thumbs.dreamstime.com/b/student-graduation-gown-standing-edge-rooftop-overlooking-modern-city-skyline-sunrise-back-view-photo-386341872.jpg",
    quote: "Balance studies, friends, and personal growth",
    cta: "Start Your Journey"
  },
];

export default function HeroSlider() {
  return (
    <section className="relative h-screen w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <img 
                src={slide.img} 
                alt={`Student life slide ${index + 1}`} 
                className="object-cover w-full h-full" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white px-6 max-w-4xl">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                    {slide.quote}
                  </h1>
                  <button className="btn btn-primary btn-lg text-lg">
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}