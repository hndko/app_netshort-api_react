import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import HomePage from '@/src/pages/HomePage';
import SerialDramaPage from '@/src/pages/SerialDramaPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/serial-drama" element={<SerialDramaPage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;