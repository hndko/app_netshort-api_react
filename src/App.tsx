import React from 'react';
import Navbar from '@/src/components/Navbar';
import Hero from '@/src/components/Hero';
import Section from '@/src/components/Section';
import Footer from '@/src/components/Footer';
import { useDramaData } from '@/src/hooks/useDramaData';
import { SECTIONS, HERO_DATA } from '@/src/constants';

const App: React.FC = () => {
  const { sections, heroData, loading, error } = useDramaData();

  // Use API data if available, fallback to static data
  const displaySections = sections.length > 0 ? sections : SECTIONS;
  const displayHeroData = heroData || HERO_DATA;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section with API data */}
      <Hero heroData={displayHeroData} />

      <main className="relative z-10 pb-20 space-y-12 bg-background-light dark:bg-background-dark transition-colors duration-300">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <span className="ml-4 text-gray-600 dark:text-gray-400">Memuat drama...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
              <p className="font-medium">Gagal memuat data</p>
              <p className="text-sm">{error.message}</p>
            </div>
          </div>
        )}

        {/* Drama Sections */}
        {!loading && displaySections.map((section, index) => (
          <Section
            key={`${section.title}-${index}`}
            {...section}
          />
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default App;