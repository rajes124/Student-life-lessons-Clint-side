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
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* Hero – full bleed + slight overlap */}
      <div data-aos="fade" data-aos-duration="1400" data-aos-once="true">
        <HeroSlider />
      </div>

      {/* Featured Lessons – elevated card look */}
      <section className="relative -mt-20 sm:-mt-28 lg:-mt-36 z-10 pb-16 sm:pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div
            className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100/80"
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-duration="900"
          >
            <div className="px-5 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
              <FeaturedLessons />
            </div>
          </div>
        </div>
      </section>

      {/* Why Section – clean + centered heading */}
      <section className="bg-white py-20 sm:py-24 lg:py-32 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="800">
            <WhyStudentLifeLessons />
          </div>
        </div>
      </section>

      {/* Community Stats – modern card design */}
      <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-slate-50/80 to-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-16 lg:mb-20">
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent mb-5"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              Community Impact
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="300">
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
                className={`group bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 text-center hover:shadow-xl hover:shadow-${stat.color}-100/50 transition-all duration-400 hover:-translate-y-2`}
                data-aos="fade-up"
                data-aos-delay={`${i * 120 + 300}`}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 mb-5 group-hover:bg-${stat.color}-100 transition-colors`}>
                  <stat.icon className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-2">
                  {stat.number}
                </h3>
                <p className="text-slate-600 text-base sm:text-lg font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Topics – glassmorphism + larger icons */}
      <section className="py-20 sm:py-24 lg:py-32 bg-white border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center mb-14 sm:mb-16 lg:mb-20 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
            data-aos="fade-down"
            data-aos-delay="200"
          >
            Explore by Topic
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { title: "Mental Health", icon: HeartPulse, color: "indigo" },
              { title: "Productivity", icon: Briefcase, color: "violet" },
              { title: "Relationships", icon: Users, color: "pink" },
              { title: "Academic Skills", icon: BookOpen, color: "blue" },
            ].map((cat, i) => (
              <div
                key={i}
                className={`group bg-white/70 backdrop-blur-sm border border-slate-100 rounded-2xl sm:rounded-3xl p-8 sm:p-10 text-center hover:shadow-2xl hover:shadow-${cat.color}-100/40 hover:border-${cat.color}-200 transition-all duration-400 hover:-translate-y-3`}
                data-aos="zoom-in-up"
                data-aos-delay={`${i * 130 + 250}`}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-${cat.color}-50 text-${cat.color}-600 mb-6 group-hover:scale-110 transition-transform duration-400`}>
                  <cat.icon className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                  {cat.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Most Saved Lessons */}
      <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div data-aos="fade-up" data-aos-delay="400">
            <MostSavedLessons />
          </div>
        </div>
      </section>

      {/* Testimonials – softer cards */}
      <section className="py-20 sm:py-24 lg:py-32 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center mb-14 sm:mb-16 lg:mb-20 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
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
                className="bg-white border border-slate-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:shadow-xl hover:shadow-indigo-100/40 transition-all duration-400 hover:-translate-y-2"
                data-aos="fade-up"
                data-aos-delay={`${i * 150 + 300}`}
              >
                <div className="flex items-center gap-4 mb-5 sm:mb-6">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover ring-2 ring-indigo-100 shadow-sm"
                  />
                  <h4 className="text-lg sm:text-xl font-semibold text-slate-800">{t.name}</h4>
                </div>
                <p className="text-slate-600 italic leading-relaxed text-base sm:text-lg">
                  “{t.quote}”
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Contributors */}
      <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div data-aos="fade-up" data-aos-delay="500">
            <TopContributors />
          </div>
        </div>
      </section>

      {/* Newsletter – clean & spacious */}
      <section className="py-20 sm:py-24 lg:py-32 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            Never Miss New Lessons
          </h2>

          <p className="text-lg sm:text-xl text-slate-600 mb-10 sm:mb-12 max-w-3xl mx-auto">
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
              className="flex-1 px-6 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition shadow-sm text-base sm:text-lg"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-xl font-semibold text-base sm:text-lg transition shadow-md flex items-center justify-center gap-2.5 hover:shadow-indigo-500/30 hover:scale-[1.02]"
            >
              <Mail className="w-5 h-5" />
              Subscribe
            </button>
          </form>

          <p className="text-sm text-slate-500 mt-6">We value your privacy • No spam • Ever.</p>
        </div>
      </section>

      {/* Premium CTA – more luxurious & centered */}
      <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-indigo-950 via-violet-950 to-purple-950 text-white">
        {/* subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,#ffffff_0.7px,transparent_1px)] [background-size:28px_28px]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 text-center">
          <h2
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 sm:mb-8 leading-tight bg-gradient-to-r from-amber-200 via-white to-purple-200 bg-clip-text text-transparent drop-shadow-2xl"
            data-aos="zoom-in-up"
            data-aos-delay="200"
            data-aos-duration="1100"
          >
            Turn Your Story Into Wisdom
          </h2>

          <p className="text-lg sm:text-xl lg:text-2xl mb-10 sm:mb-14 opacity-90 max-w-4xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="400">
            Premium lessons • ad-free experience • lifetime access • exclusive content
          </p>

          <Link to="/pricing">
            <button
              className="group relative inline-flex flex-col sm:flex-row items-center gap-5 sm:gap-8 bg-white text-indigo-950 px-10 sm:px-14 lg:px-20 py-6 sm:py-8 rounded-3xl text-2xl sm:text-3xl lg:text-4xl font-extrabold shadow-2xl hover:shadow-3xl hover:shadow-indigo-600/50 transition-all duration-700 hover:scale-[1.04] sm:hover:scale-110 w-full sm:w-auto"
              data-aos="zoom-in"
              data-aos-delay="600"
            >
              <div className="flex items-center gap-4 sm:gap-5">
                <Zap className="w-10 h-10 sm:w-14 sm:h-14 text-indigo-600 group-hover:text-indigo-700 transition-transform group-hover:rotate-12" />
                <Crown className="w-10 h-10 sm:w-14 sm:h-14 text-amber-500 group-hover:scale-125 transition" />
              </div>

              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Upgrade to Premium
              </span>

              <div className="flex items-center gap-4 sm:gap-5">
                <Star className="w-10 h-10 sm:w-14 sm:h-14 text-yellow-400 group-hover:rotate-180 transition duration-1000" />
                <Sparkles className="w-9 h-9 sm:w-12 sm:h-12 text-purple-400 group-hover:text-purple-300 transition" />
                <Rocket className="w-10 h-10 sm:w-14 sm:h-14 text-pink-500 group-hover:-translate-y-3 transition" />
              </div>

              <span className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-400/30 via-purple-400/20 to-pink-400/30 opacity-0 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none"></span>
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;