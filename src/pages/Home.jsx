import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Values from '../components/Values';
import Facility from '../components/Facility';
import Products from '../components/Products';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Values />
      <Facility />
      <Products />
      <Stats />
      <Testimonials />
    </>
  );
};

export default Home;
