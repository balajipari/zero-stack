import React from 'react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header Navigation */}
      <header className="w-full flex justify-end items-center px-8 py-4 bg-transparent">
        <nav className="flex space-x-8 text-sm font-light">
          <a href="/login" className="text-gray-600 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary">Member's Login</a>
          <a href="/contact" className="text-gray-500 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary">Contact</a>
          <a href="/write" className="text-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary">Write for Us</a>
          <a href="/about" className="text-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary">About</a>
        </nav>
      </header>

      {/* Hero Section (Placeholder for Figma image/hero) */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
        {/* TODO: Replace with Figma hero image/background */}
        <div className="w-full max-w-4xl h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-8">
          <span className="text-2xl text-gray-400">[Hero Image/Illustration]</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Welcome to ZeroStack</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">The go-to platform for aspiring tech and product builders, founders, and interns.</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="/resources" className="px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary">Explore Resources</a>
          <a href="/events" className="px-6 py-3 bg-white border border-primary text-primary rounded-lg shadow hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary">View Events</a>
        </div>
      </section>

      {/* Additional Sections (Placeholders for Figma groups/backgrounds) */}
      <section className="w-full py-12 bg-gray-50 flex flex-col items-center">
        {/* TODO: Replace with Figma content/sections */}
        <div className="w-full max-w-5xl h-40 bg-gray-200 rounded mb-6 flex items-center justify-center">
          <span className="text-lg text-gray-400">[Featured Content Section]</span>
        </div>
        <div className="w-full max-w-5xl h-40 bg-gray-200 rounded flex items-center justify-center">
          <span className="text-lg text-gray-400">[More Content/Call to Action]</span>
        </div>
      </section>

      {/* Footer (Optional) */}
      <footer className="w-full py-6 text-center text-xs text-gray-400 bg-transparent">
        &copy; {new Date().getFullYear()} ZeroStack. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing; 