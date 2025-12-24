import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { BackgroundDecoration } from '../components/BackgroundDecoration';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="relative bg-stone-50 min-h-screen w-full overflow-x-hidden font-[sans-serif] font-light">
      <BackgroundDecoration />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />

        {/* Projects CTA Section */}
        <section className="py-16 bg-stone-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-light text-stone-800 mb-4 inline-block border-b-2 border-red-700 pb-1">
                My Projects
              </h2>
              <p className="text-stone-600 mb-8 max-w-2xl mx-auto">
                Explore my portfolio of IT projects on Web Development.
              </p>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center px-6 py-3 bg-red-700 hover:bg-red-800 text-white rounded-md transition-colors duration-300"
              >
                View All Projects
              </Link>
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </div>
  );
}; 