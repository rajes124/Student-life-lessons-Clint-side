// src/pages/Home/Home.jsx
import HeroSlider from './HeroSlider';
import FeaturedLessons from './FeaturedLessons';
import WhyStudentLife from "./WhyStudentLifeLessons";

import MostSavedLessons from './MostSavedLessons';
import TopContributors from './TopContributors';

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <FeaturedLessons />
      <WhyStudentLife />
      <MostSavedLessons />
      <TopContributors />
    </div>
  );
};

export default Home;