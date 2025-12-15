import React from "react";
import HeroSlider from "./HeroSlider";
import FeaturedLessons from "./FeaturedLessons";
import WhyStudentLifeLessons from "./WhyStudentLifeLessons";
import MostSavedLessons from "./MostSavedLessons";
import TopContributors from "./TopContributors";


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


<section className="bg-gradient-to-r from-[#03373D] to-[#045A60] py-20 text-white text-center">
<h2 className="text-4xl font-bold mb-4">Turn Experiences into Wisdom</h2>
<p className="mb-8 opacity-90">Upgrade to Premium and unlock exclusive life lessons.</p>
<button className="bg-white text-[#03373D] px-8 py-3 rounded-lg font-semibold hover:scale-105 transition">Upgrade to Premium ⭐</button>
</section>
</div>
);
};


export default Home;

