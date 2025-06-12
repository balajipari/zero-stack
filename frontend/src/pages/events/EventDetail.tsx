import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import type { Event } from '../../services/eventService';
import logo from '../../assets/logo.png';
import RegistrationModal from '../../components/RegistrationModal';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      try {
        const data = await eventService.getEventById(id);
        setEvent(data);
      } catch {
        setError('Failed to load event. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center">
        <div className="text-xl text-[#6D666F]">Loading event...</div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center">
        <div className="text-xl text-red-600">{error || 'Event not found'}</div>
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

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <button onClick={() => window.history.back()} className="mb-8 text-blue-600 hover:text-blue-800 flex items-center">← Back to Events</button>
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="text-sm text-gray-500 mb-2">
            {new Date(event.date).toLocaleDateString()} at {event.time}
          </div>
          <h1 className="text-4xl font-bold text-[#232B36] mb-4">{event.title}</h1>
          <p className="text-[#6D666F] mb-6">{event.description}</p>
          <div className="text-sm text-gray-500 mb-4">Location: {event.location}</div>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
            aria-label={`Register for ${event.title}`}
          >
            Register Now
          </button>
        </div>
        <RegistrationModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </main>
      <footer className="w-full py-8 text-center text-sm text-[#6D666F] bg-transparent">
        &copy; {new Date().getFullYear()} ZeroStack. All rights reserved.
      </footer>
    </div>
  );
};

export default EventDetail; 