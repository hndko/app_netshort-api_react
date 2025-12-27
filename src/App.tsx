import React from 'react';
import Navbar from '@/src/components/Navbar';
import Hero from '@/src/components/Hero';
import Section from '@/src/components/Section';
import Footer from '@/src/components/Footer';
import { useDramaData } from '@/src/hooks/useDramaData';
import { HeroData } from '@/src/types';

// Default hero data yang selalu ditampilkan saat loading
const DEFAULT_HERO: HeroData = {
  title: "NetShort",
  subtitle: "Drama Seru",
  description: "Temukan drama-drama seru dan menarik. Tonton sekarang dan rasakan pengalaman yang tak terlupakan!",
  bgImage: "https://awscover.netshort.com/tos-vod-mya-v-da59d5a2040f5f77/imageG/production/2001991512262979585/1766731523518-5355066978269103-3比4jpg~tplv-vod-rs:540:720.webp",
  badge: "HOT"
};

const App: React.FC = () => {
  const { sections, heroData, loading, error } = useDramaData();

  // Hero selalu muncul - gunakan data API jika ada, fallback ke default
  const displayHeroData = heroData || DEFAULT_HERO;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section - selalu muncul */}
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
        {error && !loading && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
              <p className="font-medium">Gagal memuat data</p>
              <p className="text-sm">{error.message}</p>
            </div>
          </div>
        )}

        {/* Drama Sections from API */}
        {!loading && sections.map((section, index) => (
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