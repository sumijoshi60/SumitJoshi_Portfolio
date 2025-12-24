import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BackgroundDecoration } from '../components/BackgroundDecoration';

export const NotFoundPage = () => {
  return (
    <div className="relative bg-stone-50 min-h-screen w-full overflow-x-hidden font-[sans-serif] font-light">
      <BackgroundDecoration />
      <Header />
      <main className="relative z-10 pt-20">
        <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
          <h1 className="text-6xl font-light text-stone-800 mb-4">404</h1>
          <h2 className="text-2xl text-stone-600 mb-8">Page Not Found</h2>
          <p className="text-stone-600 mb-8 max-w-md">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-6 py-3 bg-red-700 hover:bg-red-800 text-white rounded-md transition-colors duration-300"
          >
            Return Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}; 