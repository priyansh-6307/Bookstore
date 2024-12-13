import React from 'react';
import Hero from '../components/Home/Hero';
import RecentlyAdded from '../components/Home/RecentlyAdded';
import './opo.css'
import Slideshow from '../components/Home/Slideshow';
const Home = () => {
  return (
    <div class="home">
      <Slideshow/>
      <Hero />
      <RecentlyAdded />

    </div>
  );
};

export default Home;
