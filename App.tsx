import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Section from './components/Section';
import Footer from './components/Footer';
import { SECTIONS } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <main className="relative z-10 pb-20 space-y-12 bg-background-light dark:bg-background-dark transition-colors duration-300">
        {SECTIONS.map((section, index) => (
          <Section
            key={index}
            {...section}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default App;