import React, { useState, useEffect } from 'react';
import Icon from './Icon';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  const navClass = `fixed w-full z-50 transition-colors duration-300 ${
    isScrolled
      ? 'bg-white/95 dark:bg-background-dark/95 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800'
      : 'bg-transparent'
  }`;

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <a href="#" className="flex-shrink-0 flex items-center gap-2">
              <Icon name="play_circle_filled" className="text-primary" size="3xl" />
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">NetShort</span>
            </a>
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-6">
                {['Beranda', 'Serial Drama', 'Unduh', 'Blog'].map((item, index) => (
                  <a
                    key={item}
                    href="#"
                    className={`${
                      index === 0
                        ? 'text-primary'
                        : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white'
                    } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="search" className="text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm rounded-full block w-full pl-10 pr-3 py-2 border-transparent focus:border-primary focus:ring-0 placeholder-gray-500 transition-all w-48 focus:w-64"
                placeholder="Pencarian"
              />
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? (
                <Icon name="light_mode" />
              ) : (
                <Icon name="dark_mode" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;