import React from "react";
import HeroSlider from "./HeroSlider";
import FeaturedLessons from "./FeaturedLessons";
import WhyStudentLifeLessons from "./WhyStudentLifeLessons";
import MostSavedLessons from "./MostSavedLessons";
import TopContributors from "./TopContributors";
import { Link } from "react-router-dom";
import { Zap, Sparkles, Crown, Star, Rocket, BookOpen, Users, HeartPulse, Briefcase, Mail, Trophy, MessageSquare } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Featured Lessons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <FeaturedLessons />
      </section>

      {/* 3. Why Share Student Life Lessons */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WhyStudentLifeLessons />
        </div>
      </section>

      {/* 4. Community Impact / Statistics */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-10">
              Our Community Impact
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { number: "5K+", label: "Lessons Shared", icon: BookOpen },
                { number: "50K+", label: "Students Helped", icon: Users },
                { number: "120K+", label: "Saves & Shares", icon: HeartPulse },
                { number: "8K+", label: "Active Contributors", icon: Trophy },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                >
                  <stat.icon className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 text-indigo-600" />
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-600 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600 text-base md:text-lg">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Explore Topics → এখানে Link রিমুভ করা হয়েছে, শুধু কার্ড দেখাবে, ক্লিক করলে কিছু হবে না */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-gray-800">
            Explore Topics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { title: "Mental Health", icon: HeartPulse, color: "indigo" },
              { title: "Productivity", icon: Briefcase, color: "purple" },
              { title: "Relationships", icon: Users, color: "pink" },
              { title: "Academic Skills", icon: BookOpen, color: "blue" },
            ].map((cat, i) => (
              <div
                key={i}
                className="group bg-gray-50 rounded-xl p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-200 hover:border-indigo-300 cursor-default"
              >
                <cat.icon className={`w-12 h-12 mx-auto mb-6 text-${cat.color}-600 group-hover:text-${cat.color}-700 transition`} />
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">{cat.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* বাকি সব সেকশন একই রাখা হয়েছে */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MostSavedLessons />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-gray-800">
            What Students Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Riya Das", quote: "This platform changed how I handle exam stress. Thank you!", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
              { name: "Arif Hossain", quote: "Best time management tips I've ever found. Highly recommend!", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
              { name: "Nisha Roy", quote: "Made new friends through shared lessons. Truly grateful.", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
            ].map((testimonial, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-indigo-200" />
                  <h4 className="text-lg font-bold text-gray-800">{testimonial.name}</h4>
                </div>
                <p className="text-gray-600 italic leading-relaxed">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TopContributors />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Stay Updated with New Lessons
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Subscribe to get fresh student life tips, new lessons, and exclusive updates directly in your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition shadow-sm"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition shadow-md flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Subscribe
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4">We respect your privacy. No spam, ever.</p>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#03373D] to-[#045A60] py-16 sm:py-20 lg:py-24 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#ffffff_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 drop-shadow-2xl leading-tight">
            Turn Experiences into Wisdom
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 sm:mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed">
            Upgrade to Premium and unlock exclusive life lessons, ad-free experience, and lifetime access.
          </p>

          <Link to="/pricing">
            <button className="group relative inline-flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 bg-white text-[#03373D] px-8 sm:px-12 lg:px-16 py-5 sm:py-6 rounded-2xl text-xl sm:text-2xl md:text-3xl font-extrabold shadow-2xl hover:scale-105 sm:hover:scale-110 hover:shadow-indigo-600/60 transition-all duration-700 transform w-full sm:w-auto">
              <div className="flex items-center gap-2 sm:gap-3">
                <Zap className="w-8 h-8 sm:w-10 text-indigo-600 group-hover:text-indigo-700 transition" />
                <Crown className="w-7 h-7 sm:w-9 text-yellow-500 group-hover:scale-125 transition" />
              </div>
              <span className="block">Upgrade to Premium</span>
              <div className="flex items-center gap-2 sm:gap-3">
                <Star className="w-8 h-8 sm:w-10 text-yellow-400 group-hover:rotate-180 transition duration-1000" />
                <Sparkles className="w-7 h-7 sm:w-9 text-purple-400 group-hover:text-purple-300 transition" />
                <Rocket className="w-8 h-8 sm:w-10 text-pink-500 group-hover:translate-y-[-10px] transition" />
              </div>
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"></span>
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;