import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import HomePage from '@/src/pages/HomePage';
import SerialDramaPage from '@/src/pages/SerialDramaPage';
import SearchPage from '@/src/pages/SearchPage';
import DramaDetailPage from '@/src/pages/DramaDetailPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/serial-drama" element={<SerialDramaPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/drama/:id" element={<DramaDetailPage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;