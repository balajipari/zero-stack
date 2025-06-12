import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import MeetupCard from '../../components/MeetupCard';

interface Meetup {
  id: string;
  title: string;
  description: string;
  date: string;
  location?: string;
}

const MeetupList: React.FC = () => {
  const [meetups, setMeetups] = useState<Meetup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeetups = async () => {
      try {
        // Replace with real API call
        const response = await fetch('/api/meetups');
        const data = await response.json();
        setMeetups(data);
      } catch {
        setError('Failed to load meetups. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMeetups();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center">
        <div className="text-xl text-[#6D666F]">Loading meetups...</div>
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
          <h1 className="text-5xl font-bold text-[#232B36] mb-6">Meetups</h1>
          <p className="text-xl text-[#6D666F] max-w-2xl mx-auto">
            Join our offline meetups to connect, learn, and grow with the community.
          </p>
        </section>

        <section className="mb-16" aria-labelledby="meetups-heading">
          <h2 id="meetups-heading" className="text-3xl font-bold text-[#232B36] mb-8">Upcoming Meetups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {meetups.map((meetup) => (
              <MeetupCard key={meetup.id} meetup={meetup} />
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

export default MeetupList; 