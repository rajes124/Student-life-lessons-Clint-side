// src/components/TopContributors.jsx
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

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

        setContributors([
          { name: "Alex Johnson", lessonCount: 42, photoURL: "https://randomuser.me/api/portraits/men/32.jpg" },
          { name: "Sarah Ahmed", lessonCount: 38, photoURL: "https://randomuser.me/api/portraits/women/44.jpg" },
          { name: "Rahim Khan", lessonCount: 35, photoURL: "https://randomuser.me/api/portraits/men/45.jpg" },
          { name: "Priya Singh", lessonCount: 31, photoURL: "https://randomuser.me/api/portraits/women/68.jpg" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTop();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
        <p className="mt-6 text-xl text-gray-600">Loading Top Contributors...</p>
      </div>
    );
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <h2
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          Top Contributors This Week
        </h2>

        <Swiper
          modules={[Autoplay, Pagination, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 2.5,
            slideShadows: false,
          }}
          autoplay={{
            delay: 2800,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          loop={contributors.length > 3}
          breakpoints={{
            640: { slidesPerView: 1.1 },
            768: { slidesPerView: 2.1 },
            1024: { slidesPerView: 3.1 },
            1280: { slidesPerView: 4 },
          }}
          className="py-8"
        >
          {contributors.map((user, index) => {
            const rankColor = index === 0 ? "from-yellow-400 to-amber-500" : index === 1 ? "from-gray-300 to-slate-400" : "from-orange-400 to-amber-600";

            return (
              <SwiperSlide key={index} className="max-w-[300px] sm:max-w-[340px]">
                <div
                  className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-4 overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay={`${index * 120}`}
                  data-aos-duration="900"
                >
                  {/* Rank Badge */}
                  <div className={`absolute -top-5 right-6 w-14 h-14 rounded-2xl bg-gradient-to-br ${rankColor} flex items-center justify-center shadow-xl border-4 border-white z-20`}>
                    {index === 0 ? <Trophy className="w-8 h-8 text-white" /> : index === 1 ? <Medal className="w-8 h-8 text-white" /> : <Award className="w-8 h-8 text-white" />}
                  </div>

                  {/* Avatar */}
                  <div className="pt-10 pb-6 flex justify-center">
                    <div className="relative">
                      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden ring-8 ring-offset-4 ring-white group-hover:ring-indigo-400 transition-all duration-500">
                        <img
                          src={user.photoURL}
                          alt={user.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-30 blur-xl transition-all" />
                    </div>
                  </div>

                  {/* Name & Count */}
                  <div className="text-center px-6 pb-8">
                    <h4 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h4>
                    
                    <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 my-2">
                      <span className="animate-count-up" data-count={user.lessonCount}>0</span>
                    </div>
                    
                    <p className="text-gray-500 text-base font-medium">Lessons Shared</p>
                  </div>

                  {/* Bottom Bar */}
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 text-center font-semibold text-sm tracking-wider">
                    TOP CONTRIBUTOR #{index + 1}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* CSS for count-up animation */}
      <style jsx>{`
        @keyframes countUp {
          from { content: "0"; }
          to { content: attr(data-count); }
        }
        .animate-count-up {
          animation: countUp 2s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default TopContributors;