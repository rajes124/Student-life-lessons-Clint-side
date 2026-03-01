// src/components/TopContributors.jsx
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cards";

import api from "../../utils/api";
import toast from "react-hot-toast";
import { Trophy, Medal, Award } from "lucide-react";

const TopContributors = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTop = async () => {
      try {
        const res = await api.get("/lessons/top-contributors");
        setContributors(res.data);
      } catch (error) {
        toast.error("Failed to load top contributors");

        // Fallback data (আপনার আগের ডেটা অপরিবর্তিত রাখা হয়েছে)
        setContributors([
          {
            name: "Alex Johnson",
            lessonCount: 42,
            photoURL: "https://randomuser.me/api/portraits/men/32.jpg",
          },
          {
            name: "Sarah Ahmed",
            lessonCount: 38,
            photoURL: "https://randomuser.me/api/portraits/women/44.jpg",
          },
          {
            name: "Rahim Khan",
            lessonCount: 35,
            photoURL: "https://randomuser.me/api/portraits/men/45.jpg",
          },
          {
            name: "Priya Singh",
            lessonCount: 31,
            photoURL: "https://randomuser.me/api/portraits/women/68.jpg",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTop();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16 sm:py-20 lg:py-24">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent"></div>
        <p className="mt-5 text-lg sm:text-xl text-gray-600">Loading top contributors...</p>
      </div>
    );
  }

  if (contributors.length === 0) {
    return (
      <p className="text-center py-16 sm:py-20 lg:py-24 text-lg sm:text-xl text-gray-500">
        No contributors data available yet.
      </p>
    );
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <h2
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-10 md:mb-14 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        Top Contributors This Week
      </h2>

      {/* Swiper for responsive & animated slider */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectCards]}
        effect="cards"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        cardsEffect={{
          rotate: false,
          slideShadows: false,
          perSlideRotate: 0,
          perSlideOffset: 8,
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={contributors.length > 3}
        breakpoints={{
          640: { slidesPerView: 1.2, spaceBetween: 20 },
          768: { slidesPerView: 2.2, spaceBetween: 24 },
          1024: { slidesPerView: 3.2, spaceBetween: 32 },
          1280: { slidesPerView: 4, spaceBetween: 40 },
        }}
        className="!pb-12 sm:!pb-16"
      >
        {contributors.map((user, index) => (
          <SwiperSlide key={index} className="!w-auto max-w-[320px] sm:max-w-[360px]">
            <div
              className="
                group relative bg-white/95 backdrop-blur-md 
                rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl 
                transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02]
                overflow-hidden flex flex-col items-center p-6 sm:p-8 
                border border-gray-100/80 hover:border-indigo-200/80
                min-h-[380px] sm:min-h-[420px]
              "
              data-aos="fade-up"
              data-aos-delay={`${index * 120}`}
              data-aos-duration="800"
            >
              {/* Rank Badge */}
              <div className="absolute -top-4 -right-4 z-10">
                <div className="relative">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg border-4 border-white">
                    {index === 0 ? (
                      <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    ) : index === 1 ? (
                      <Medal className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    ) : (
                      <Award className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    )}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-yellow-300/40 animate-ping-slow pointer-events-none"></div>
                </div>
              </div>

              {/* Avatar */}
              <div className="relative mb-6 sm:mb-8">
                <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-indigo-200 ring-offset-4 group-hover:ring-indigo-400 group-hover:ring-offset-8 transition-all duration-500">
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Name */}
              <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">
                {user.name}
              </h4>

              {/* Lesson Count */}
              <p className="text-gray-600 text-base sm:text-lg mb-4 font-medium">
                {user.lessonCount} Lessons Shared
              </p>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm sm:text-base font-medium shadow-sm mt-auto">
                <Trophy className="w-4 h-4 text-amber-600" />
                Top Contributor
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TopContributors;