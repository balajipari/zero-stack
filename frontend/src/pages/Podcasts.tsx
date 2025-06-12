import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { podcastService } from '../services/podcastService';
import type { Podcast } from '../services/podcastService';

const Podcasts: React.FC = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const data = await podcastService.getAllPodcasts();
        setPodcasts(data);
      } catch {
        setError('Failed to load podcasts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPodcasts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center">
        <div className="text-xl text-[#6D666F]">Loading podcasts...</div>
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
        <a href="/" className="flex items-center">
          <img src={logo} alt="Zerostack logo" className="w-14 h-14 mr-4 drop-shadow" />
          <span className="text-2xl font-extrabold text-[#232B36] tracking-tight hidden md:inline">ZeroStack</span>
        </a>
        <nav className="flex space-x-10 text-base font-medium text-[#6D666F]" aria-label="Main Navigation">
          <a href="/login" className="hover:text-[#1A223E] transition" aria-label="Member's Login">Member's Login</a>
          <a href="/contact" className="hover:text-[#1A223E] transition" aria-label="Contact">Contact</a>
          <a href="/write" className="hover:text-[#1A223E] transition" aria-label="Write for Us">Write for Us</a>
          <a href="/about" className="hover:text-[#1A223E] transition" aria-label="About">About</a>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#232B36] mb-6">Podcasts</h1>
          <p className="text-xl text-[#6D666F] max-w-2xl mx-auto">
            Candid conversations on tech, startups, and the builder's mindset.
          </p>
        </section>

        <section className="mb-16" aria-labelledby="podcasts-heading">
          <h2 id="podcasts-heading" className="text-3xl font-bold text-[#232B36] mb-8">Latest Episodes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {podcasts.map((podcast) => (
              <div key={podcast.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col">
                {podcast.image_url && (
                  <img src={podcast.image_url} alt={podcast.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                )}
                <h3 className="text-2xl font-semibold text-[#232B36] mb-2">{podcast.title}</h3>
                <p className="text-[#6D666F] mb-4">{podcast.description}</p>
                <audio controls className="w-full mb-4">
                  <source src={podcast.audio_url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <div className="text-sm text-gray-500 mt-auto">{new Date(podcast.published_at).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="w-full py-8 text-center text-sm text-[#6D666F] bg-transparent">
        &copy; {new Date().getFullYear()} ZeroStack. All rights reserved.
      </footer>
    </div>
  );
};

export default Podcasts; 