// src/pages/Home.jsx
import React from "react";
import HeroSlider from "./HeroSlider";
import FeaturedLessons from "./FeaturedLessons";
import WhyStudentLifeLessons from "./WhyStudentLifeLessons";
import MostSavedLessons from "./MostSavedLessons";
import TopContributors from "./TopContributors";
import { Link } from "react-router-dom";
import {
  Zap,
  Sparkles,
  Crown,
  Star,
  Rocket,
  BookOpen,
  Users,
  HeartPulse,
  Briefcase,
  Mail,
  Trophy,
} from "lucide-react";

const Home = () => {
  return (
    <div className="bg-base-100 min-h-screen">
      {/* 1. Hero Slider */}
      <div data-aos="fade" data-aos-duration="1400" data-aos-once="true">
        <HeroSlider />
      </div>

      {/* 2. Featured Lessons – gap কমানো হয়েছে */}
      <section
        className="
          relative 
          -mt-12 sm:-mt-16 lg:-mt-20 
          pt-20 sm:pt-24 lg:pt-28 
          pb-12 sm:pb-16 lg:pb-20
          z-10
        "
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div
            className="
              bg-base-100/95 backdrop-blur-md 
              rounded-2xl sm:rounded-3xl 
              shadow-xl shadow-base-300/50 
              border border-base-300/70
            "
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="800"
          >
            <div className="px-5 sm:px-8 lg:px-10 py-10 sm:py-12 lg:py-16">
              <FeaturedLessons />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Section */}
      <section
        className="bg-base-100 py-16 sm:py-20 lg:py-24 border-t border-base-300"
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-duration="800"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <WhyStudentLifeLessons />
        </div>
      </section>

      {/* 4. Community Impact */}
      <section
        className="py-16 sm:py-20 lg:py-24 bg-base-100"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-14 lg:mb-16">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-primary via-violet-600 to-purple-600 bg-clip-text text-transparent mb-4"
              data-aos="zoom-in"
              data-aos-delay="150"
            >
              Community Impact
            </h2>
            <p className="text-base sm:text-lg text-base-content/70 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="250">
              Real numbers created by real students
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {[
              { number: "5K+", label: "Lessons Shared", icon: BookOpen, color: "indigo" },
              { number: "50K+", label: "Students Reached", icon: Users, color: "violet" },
              { number: "120K+", label: "Saves & Shares", icon: HeartPulse, color: "pink" },
              { number: "8K+", label: "Active Creators", icon: Trophy, color: "blue" },
            ].map((stat, i) => (
              <div
                key={i}
                className={`group bg-white border border-slate-100 rounded-xl sm:rounded-2xl p-5 sm:p-7 text-center hover:shadow-lg hover:shadow-${stat.color}-100/40 transition-all duration-300 hover:-translate-y-2`}
                data-aos="fade-up"
                data-aos-delay={`${i * 100 + 200}`}
                data-aos-duration="700"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-${stat.color}-50 text-${stat.color}-600 mb-4 group-hover:bg-${stat.color}-100 transition-colors`}>
                  <stat.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-1">
                  {stat.number}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Explore Topics */}
      <section
        className="py-16 sm:py-20 lg:py-24 bg-white border-t border-b border-slate-100"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-10 sm:mb-12 lg:mb-14 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
            data-aos="fade-down"
            data-aos-delay="200"
          >
            Explore by Topic
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {[
              { title: "Mental Health", icon: HeartPulse, color: "indigo" },
              { title: "Productivity", icon: Briefcase, color: "violet" },
              { title: "Relationships", icon: Users, color: "pink" },
              { title: "Academic Skills", icon: BookOpen, color: "blue" },
            ].map((cat, i) => (
              <div
                key={i}
                className={`group bg-white/80 backdrop-blur-sm border border-slate-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:shadow-xl hover:shadow-${cat.color}-100/30 hover:border-${cat.color}-200 transition-all duration-300 hover:-translate-y-2`}
                data-aos="zoom-in-up"
                data-aos-delay={`${i * 100 + 250}`}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-${cat.color}-50 text-${cat.color}-600 mb-5 group-hover:scale-105 transition-transform`}>
                  <cat.icon className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                  {cat.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Most Saved Lessons */}
      <section
        className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-slate-50/50"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <MostSavedLessons />
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="py-16 sm:py-20 lg:py-24 bg-white border-t border-slate-100"
        data-aos="fade-up"
        data-aos-delay="700"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-10 sm:mb-12 lg:mb-14 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
            data-aos="fade-down"
            data-aos-delay="200"
          >
            What Students Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: "Riya Das",
                quote: "This platform changed how I handle exam stress. Thank you!",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              {
                name: "Arif Hossain",
                quote: "Best time management tips I've ever found. Highly recommend!",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                name: "Nisha Roy",
                quote: "Made new friends through shared lessons. Truly grateful.",
                avatar: "https://randomuser.me/api/portraits/women/68.jpg",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg hover:shadow-indigo-100/30 transition-all duration-300 hover:-translate-y-1.5"
                data-aos="fade-up"
                data-aos-delay={`${i * 120 + 250}`}
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-indigo-100 shadow-sm"
                  />
                  <h4 className="text-base sm:text-lg font-semibold text-slate-800">{t.name}</h4>
                </div>
                <p className="text-slate-600 italic leading-relaxed text-sm sm:text-base">
                  “{t.quote}”
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Contributors */}
      <section
        className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50/50 to-white"
        data-aos="fade-up"
        data-aos-delay="800"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <TopContributors />
        </div>
      </section>

      {/* Newsletter */}
      <section
        className="py-16 sm:py-20 lg:py-24 bg-white border-t border-slate-100"
        data-aos="fade-up"
        data-aos-delay="900"
      >
        <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            Never Miss New Lessons
          </h2>

          <p className="text-base sm:text-lg text-slate-600 mb-8 sm:mb-10 max-w-3xl mx-auto">
            Fresh student life wisdom, new lessons & early access updates — straight to your inbox.
          </p>

          <form
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="350"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 sm:px-6 py-3 sm:py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition shadow-sm text-base"
              required
            />
            <button
              type="submit"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-xl font-semibold text-base sm:text-lg transition shadow-md flex items-center justify-center gap-2 hover:shadow-indigo-500/30 hover:scale-[1.02]"
            >
              <Mail className="w-5 h-5" />
              Subscribe
            </button>
          </form>

          <p className="text-sm text-slate-500 mt-5">We value your privacy • No spam • Ever.</p>
        </div>
      </section>

      {/* Premium CTA */}
      <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-indigo-950 via-violet-950 to-purple-950 text-white">
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,#ffffff_0.7px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 text-center">
          <h2
            className="text-3xl sm:text-4xl lg:text-6xl font-extrabold mb-5 sm:mb-6 leading-tight bg-gradient-to-r from-amber-200 via-white to-purple-200 bg-clip-text text-transparent drop-shadow-2xl"
            data-aos="zoom-in-up"
            data-aos-delay="200"
            data-aos-duration="1000"
          >
            Turn Your Story Into Wisdom
          </h2>

          <p className="text-base sm:text-lg lg:text-xl mb-8 sm:mb-10 opacity-90 max-w-4xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="400">
            Premium lessons • ad-free experience • lifetime access • exclusive content
          </p>

          <Link to="/pricing">
            <button
              className="group relative inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white text-indigo-950 px-8 sm:px-12 lg:px-16 py-5 sm:py-6 rounded-2xl sm:rounded-3xl text-xl sm:text-2xl lg:text-3xl font-extrabold shadow-2xl hover:shadow-3xl hover:shadow-indigo-600/50 transition-all duration-700 hover:scale-[1.03] sm:hover:scale-105 w-full sm:w-auto"
              data-aos="zoom-in"
              data-aos-delay="600"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600 group-hover:text-indigo-700 transition-transform group-hover:rotate-12" />
                <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500 group-hover:scale-125 transition" />
              </div>

              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Upgrade to Premium
              </span>

              <div className="flex items-center gap-3 sm:gap-4">
                <Star className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 group-hover:rotate-180 transition duration-1000" />
                <Sparkles className="w-7 h-7 sm:w-9 sm:h-9 text-purple-400 group-hover:text-purple-300 transition" />
                <Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-pink-500 group-hover:-translate-y-2 transition" />
              </div>

              <span className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-indigo-400/30 via-purple-400/20 to-pink-400/30 opacity-0 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none"></span>
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;