// src/App.tsx

import React, { useState, useEffect } from 'react';
import './styles/globals.css'; // ← ADD THIS LINE!
import Hero from '../components/Hero';
import TransformationGallery from '../components/TransformationGallery';
import ChallengeDetails from '../components/ChallengeDetails';
import EnrollmentForm from '../components/EnrollmentForm';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

function App() {
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Update document title
  useEffect(() => {
    document.title = 'Team Wolf - 60 & 90 Day Transformation Challenge by Pandi Sakthi';
  }, []);

  // Handle enrollment click
  const handleEnrollClick = () => {
    setShowEnrollment(true);
    setTimeout(() => {
      document.getElementById('enrollment-form')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation Header */}
      <nav className="fixed top-1 left-0 right-0 z-40 glass border-b border-gray-800">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 focus-visible-ring"
              aria-label="Team Wolf Home"
            >
              <span className="text-2xl font-bold gradient-text">TEAM WOLF</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#transformations" className="text-sm text-gray-300 hover:text-orange-500 transition-colors">
                Transformations
              </a>
              <a href="#challenge-details" className="text-sm text-gray-300 hover:text-orange-500 transition-colors">
                Challenges
              </a>
              <a href="#faq" className="text-sm text-gray-300 hover:text-orange-500 transition-colors">
                FAQ
              </a>
              <button
                onClick={handleEnrollClick}
                className="btn-primary text-sm px-6 py-2"
              >
                Enroll Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={handleEnrollClick}
              className="md:hidden btn-primary text-sm px-4 py-2"
            >
              Enroll
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          onEnrollClick={handleEnrollClick}
          batchStartDate="2025-11-25T00:00:00"
          spotsRemaining={5}
        />

        {/* Transformations Section */}
        <TransformationGallery />

        {/* Challenge Details Section */}
        <div id="challenge-details">
          <ChallengeDetails onEnrollClick={handleEnrollClick} />
        </div>

        {/* Enrollment Form Section */}
        {showEnrollment && (
          <EnrollmentForm
            onSubmit={(data) => {
              console.log('Enrollment data:', data);
              alert('Thank you for enrolling! Redirecting to payment...');
            }}
          />
        )}

        {/* FAQ Section */}
        <div id="faq">
          <FAQ onContactClick={handleEnrollClick} />
        </div>
      </main>

      {/* Footer */}
      <Footer onEnrollClick={handleEnrollClick} />

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg shadow-orange-500/50 text-white transition-all duration-300 z-40 hover:scale-110 focus-visible-ring ${
          scrollProgress > 20 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919677080327?text=Hi! I'm interested in the Team Wolf transformation challenge"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 p-4 bg-green-500 rounded-full shadow-lg shadow-green-500/50 text-white transition-all duration-300 z-40 hover:scale-110 focus-visible-ring group"
        aria-label="Contact us on WhatsApp"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </a>

      {/* Urgency Banner */}
      {5 < 10 && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-red-600 to-orange-600 py-3 z-30 animate-pulse">
          <div className="container-custom">
            <div className="flex items-center justify-between">
              <p className="text-white font-semibold text-sm md:text-base">
                🔥 Only 5 spots left! Batch closes soon.
              </p>
              <button
                onClick={handleEnrollClick}
                className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors"
              >
                Secure Your Spot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
