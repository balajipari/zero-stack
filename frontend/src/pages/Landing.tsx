import React from 'react';
import logo from '../assets/logo.png';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FCFAF7] flex flex-col">
      {/* Header Navigation */}
      <header className="w-full flex justify-end items-center px-12 py-8">
        <nav className="flex space-x-10 text-base font-medium text-[#6D666F]">
          <a href="/login" className="hover:text-[#1A223E] transition">Member's Login</a>
          <a href="/contact" className="hover:text-[#1A223E] transition">Contact</a>
          <a href="/write" className="hover:text-[#1A223E] transition">Write for Us</a>
          <a href="/about" className="hover:text-[#1A223E] transition">About</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center flex-1">
        <img src={logo} alt="Zerostack logo" className="w-48 h-48 mb-8 drop-shadow-lg" />
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#232B36] mb-4">Welcome to ZeroStack</h1>
        <p className="text-xl md:text-2xl text-[#6D666F] mb-10 max-w-2xl">
          The go-to platform for aspiring tech and product builders, founders, and interns.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          <a
            href="/resources"
            className="px-8 py-3 bg-[#1A223E] text-white rounded-lg shadow hover:bg-[#23305A] transition font-semibold"
          >
            Explore Resources
          </a>
          <a
            href="/events"
            className="px-8 py-3 bg-white border border-[#1A223E] text-[#1A223E] rounded-lg shadow hover:bg-gray-100 transition font-semibold"
          >
            View Events
          </a>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="w-full py-16 bg-[#F7F8FA] flex flex-col items-center">
        <div className="w-full max-w-5xl h-40 bg-[#E5E7EB] rounded-xl mb-8 flex items-center justify-center text-xl text-[#6D666F] font-medium">
          [Featured Content Section]
        </div>
        <div className="w-full max-w-5xl h-40 bg-[#E5E7EB] rounded-xl flex items-center justify-center text-xl text-[#6D666F] font-medium">
          [More Content/Call to Action]
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-sm text-[#6D666F] bg-transparent">
        &copy; {new Date().getFullYear()} ZeroStack. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;