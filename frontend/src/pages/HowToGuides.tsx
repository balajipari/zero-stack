import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { guideService } from '../services/guideService';
import type { Guide } from '../services/guideService';


const HowToGuides: React.FC = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [featuredGuides, setFeaturedGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const [allGuides, featured] = await Promise.all([
          guideService.getAllGuides(),
          guideService.getFeaturedGuides()
        ]);
        setGuides(allGuides);
        setFeaturedGuides(featured);
        setLoading(false);
      } catch (err) {
        setError('Failed to load guides. Please try again later.');
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center">
        <div className="text-xl text-[#6D666F]">Loading guides...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFAF7]">
      <header className="w-full flex items-center justify-between px-12 py-8">
        {/* Logo/Brand */}
        <a href="/" className="flex items-center">
          <img src={logo} alt="Zerostack logo" className="w-14 h-14 mr-4 drop-shadow" />
          <span className="text-2xl font-extrabold text-[#232B36] tracking-tight hidden md:inline">ZeroStack</span>
        </a>
        {/* Navigation */}
        <nav className="flex space-x-10 text-base font-medium text-[#6D666F]" aria-label="Main Navigation">
          <a href="/login" className="hover:text-[#1A223E] transition" aria-label="Member's Login">Member's Login</a>
          <a href="/contact" className="hover:text-[#1A223E] transition" aria-label="Contact">Contact</a>
          <a href="/write" className="hover:text-[#1A223E] transition" aria-label="Write for Us">Write for Us</a>
          <a href="/about" className="hover:text-[#1A223E] transition" aria-label="About">About</a>
        </nav>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#232B36] mb-6">How-to-Guides</h1>
          <p className="text-xl text-[#6D666F] max-w-2xl mx-auto">
            Step-by-step guides to help you navigate and succeed in your tech and product journey.
          </p>
        </section>

        {/* Guides Section */}
        <section className="mb-16" aria-labelledby="guides-heading">
          <h2 id="guides-heading" className="text-3xl font-bold text-[#232B36] mb-8">Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <div key={guide.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-2xl font-semibold text-[#232B36] mb-4">{guide.title}</h3>
                <p className="text-[#6D666F] mb-6">{guide.description}</p>
                <a 
                  href={`/guide/${guide.id}`} 
                  className="text-[#1A223E] font-medium hover:underline"
                  aria-label={`Read more about ${guide.title}`}
                >
                  Read More →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Guides Section */}
        <section className="mb-16" aria-labelledby="featured-guides-heading">
          <h2 id="featured-guides-heading" className="text-3xl font-bold text-[#232B36] mb-8">Featured Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredGuides.map((guide) => (
              <div key={guide.id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4" aria-hidden="true"></div>
                <h3 className="text-xl font-semibold text-[#232B36] mb-2">{guide.title}</h3>
                <p className="text-[#6D666F] mb-2">{guide.description}</p>
                <a 
                  href={`/guide/${guide.id}`}
                  className="text-[#1A223E] font-medium hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${guide.title}`}
                >
                  View Guide →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-[#1A223E] text-white rounded-xl p-12 mb-16" aria-labelledby="cta-heading">
          <h2 id="cta-heading" className="text-3xl font-bold mb-4">Ready to Dive Deeper?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community to access exclusive guides and connect with like-minded individuals.
          </p>
          <a
            href="/register"
            className="inline-block px-8 py-3 bg-white text-[#1A223E] rounded-lg font-semibold hover:bg-gray-100 transition"
            aria-label="Join Now"
          >
            Join Now
          </a>
        </section>
      </main>
      <footer className="w-full py-8 text-center text-sm text-[#6D666F] bg-transparent">
        &copy; {new Date().getFullYear()} ZeroStack. All rights reserved.
      </footer>
    </div>
  );
};

export default HowToGuides; 