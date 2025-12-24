import React from 'react';
import { Projects } from '../components/Projects';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BackgroundDecoration } from '../components/BackgroundDecoration';

export const ProjectsPage = () => {
  return (
    <div className="relative bg-stone-50 min-h-screen w-full overflow-x-hidden font-[sans-serif] font-light">
      <BackgroundDecoration />
      <Header />
      <main className="relative z-10 pt-20">
        <div className="py-8 text-center">
          <h1 className="text-4xl font-light text-stone-800 mb-2 inline-block border-b-2 border-red-700 pb-1">
            My Projects
          </h1>
          <p className="text-stone-600 mt-4 max-w-2xl mx-auto px-4">
            A chronological timeline of my research projects and professional experience.
          </p>
        </div>
        <Projects />
      </main>
      <Footer />
    </div>
  );
}; 