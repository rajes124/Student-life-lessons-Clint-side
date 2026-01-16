import React from "react";
import HeroSlider from "./HeroSlider";
import FeaturedLessons from "./FeaturedLessons";
import WhyStudentLifeLessons from "./WhyStudentLifeLessons";
import MostSavedLessons from "./MostSavedLessons";
import TopContributors from "./TopContributors";
import { Link } from "react-router-dom";
import { Zap, Sparkles, Crown, Star, Rocket } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero */}
      <HeroSlider />

      {/* Featured Lessons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <FeaturedLessons />
      </section>

      {/* Why Share */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WhyStudentLifeLessons />
        </div>
      </section>

      {/* Most Saved */}
      <section className="bg-[#F1F5F9] py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MostSavedLessons />
        </div>
      </section>

      {/* Top Contributors */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TopContributors />
        </div>
      </section>

      {/* Premium CTA – kept your beautiful design */}
      <section className="bg-gradient-to-r from-[#03373D] to-[#045A60] py-16 sm:py-20 lg:py-24 text-white text-center relative overflow-hidden">
        {/* Optional subtle pattern */}
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
              {/* Left Icons */}
              <div className="flex items-center gap-2 sm:gap-3">
                <Zap className="w-8 h-8 sm:w-10 text-indigo-600 group-hover:text-indigo-700 transition" />
                <Crown className="w-7 h-7 sm:w-9 text-yellow-500 group-hover:scale-125 transition" />
              </div>
              <span className="block">Upgrade to Premium</span>
              {/* Right Icons */}
              <div className="flex items-center gap-2 sm:gap-3">
                <Star className="w-8 h-8 sm:w-10 text-yellow-400 group-hover:rotate-180 transition duration-1000" />
                <Sparkles className="w-7 h-7 sm:w-9 text-purple-400 group-hover:text-purple-300 transition" />
                <Rocket className="w-8 h-8 sm:w-10 text-pink-500 group-hover:translate-y-[-10px] transition" />
              </div>
              {/* Glow */}
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"></span>
            </button>
          </Link>
        </div>
      </section>

// After TopContributors, before Premium CTA
<section className="bg-gray-50 py-16 sm:py-20">
  <div className="max-w-7xl mx-auto px-4">
    {/* Statistics Section */}
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-10">
        Our Community Impact
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h3 className="text-4xl font-bold text-indigo-600">5K+</h3>
          <p className="text-gray-600 mt-2">Lessons Shared</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h3 className="text-4xl font-bold text-indigo-600">50K+</h3>
          <p className="text-gray-600 mt-2">Students Helped</p>
        </div>
        {/* Add 2 more */}
      </div>
    </div>
  </div>
</section>

// Newsletter
<section className="bg-white py-16 sm:py-20">
  <div className="max-w-3xl mx-auto px-4 text-center">
    <h2 className="text-3xl sm:text-4xl font-bold mb-6">Stay Updated</h2>
    <p className="text-lg text-gray-600 mb-8">Subscribe to get new lessons and tips directly in your inbox.</p>
    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <input type="email" placeholder="Your email" className="flex-1 px-6 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
      <button type="submit" className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Subscribe</button>
    </form>
  </div>
</section>

    </div>
  );
};

export default Home;