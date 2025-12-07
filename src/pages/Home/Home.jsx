import React from "react";
import HeroSlider from "./HeroSlider";
import FeaturedLessons from "./FeaturedLessons";
import MostSavedLessons from "./MostSaveLessons";
import TopContributors from "./TopContributors";

const Home = () => (
  <div>
    <HeroSlider />
    
    <FeaturedLessons />

    <MostSavedLessons/>

    <TopContributors/>
  </div>
);

export default Home;
