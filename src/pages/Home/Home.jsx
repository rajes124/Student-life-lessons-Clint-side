import React from "react";
import HeroSlider from "./HeroSlider";
import FeaturedLessons from "./FeaturedLessons";
import { Zap, Sparkles, Crown, Star, Rocket } from "lucide-react";
import WhyStudentLifeLessons from "./WhyStudentLifeLessons";
import MostSavedLessons from "./MostSavedLessons";
import TopContributors from "./TopContributors";
import { Link } from "react-router-dom"; 

const Home = () => {
  return (
    <div className="bg-[#F8FAFC]">
      <HeroSlider />

      <section className="max-w-7xl mx-auto px-4 py-16">
        <FeaturedLessons />
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <WhyStudentLifeLessons />
        </div>
      </section>

      <section className="bg-[#F1F5F9] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <MostSavedLessons />
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <TopContributors />
        </div>
      </section>

      
  <section className="bg-gradient-to-r from-[#03373D] to-[#045A60] py-24 text-white text-center relative overflow-hidden">
  {/* Optional background pattern */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#ffffff_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
  </div>

  <div className="relative z-10">
    <h2 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-2xl">
      Turn Experiences into Wisdom
    </h2>
    <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed px-4">
      Upgrade to Premium and unlock exclusive life lessons, ad-free experience, and lifetime access.
    </p>

    <Link to="/pricing">
      <button className="group relative inline-flex items-center gap-6 bg-white text-[#03373D] px-16 py-6 rounded-2xl text-2xl md:text-3xl font-extrabold shadow-2xl hover:scale-110 hover:shadow-indigo-600/60 transition-all duration-700 transform">
        {/* Left Icons */}
        <div className="flex items-center gap-3">
          <Zap className="w-10 h-10 text-indigo-600 group-hover:text-indigo-700 transition" />
          <Crown className="w-9 h-9 text-yellow-500 group-hover:scale-125 transition" />
        </div>

        Upgrade to Premium

        {/* Right Icons */}
        <div className="flex items-center gap-3">
          <Star className="w-10 h-10 text-yellow-400 group-hover:rotate-180 transition duration-1000" />
          <Sparkles className="w-9 h-9 text-purple-400 group-hover:text-purple-300 transition" />
          <Rocket className="w-10 h-10 text-pink-500 group-hover:translate-y-[-10px] transition" />
        </div>

        {/* Hover Glow Effect */}
        <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"></span>
      </button>
    </Link>
  </div>
</section>
    </div>
  );
};

export default Home;