import React from 'react';
import { HERO_DATA } from '../constants';
import Icon from './Icon';

const Hero: React.FC = () => {
  return (
    <header className="relative pt-16 min-h-[600px] sm:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_DATA.bgImage}
          alt="Hero Background"
          className="w-full h-full object-cover object-top opacity-100 dark:opacity-60 transition-opacity duration-300"
        />
        {/* Gradients for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background-light via-background-light/80 to-transparent dark:from-background-dark dark:via-background-dark/90 dark:to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-transparent"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="max-w-2xl animate-fade-in-up">
          <div className="inline-flex items-center px-2 py-0.5 rounded bg-primary text-white text-xs font-bold uppercase tracking-wider mb-4">
            {HERO_DATA.badge}
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4 drop-shadow-md font-display">
            {HERO_DATA.title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-400">
              {HERO_DATA.subtitle}
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 line-clamp-3 max-w-lg">
            {HERO_DATA.description}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button className="bg-primary hover:bg-rose-600 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-transform transform hover:scale-105 shadow-lg shadow-primary/30">
              <Icon name="play_arrow" />
              Tonton Sekarang
            </button>
            <button className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 rounded-full font-semibold flex items-center gap-2 transition-colors">
              <Icon name="add" />
              Daftar Saya
            </button>
          </div>
        </div>

        {/* Carousel Indicators (Static for now) */}
        <div className="absolute bottom-8 right-8 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-primary opacity-100"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 opacity-50"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 opacity-50"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 opacity-50"></div>
        </div>
      </div>
    </header>
  );
};

export default Hero;