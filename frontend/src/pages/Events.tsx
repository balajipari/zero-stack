import React, { useEffect, useState } from 'react';
import { eventService } from '../services/eventService';
import type { Event } from '../services/eventService';
import logo from '../assets/logo.png';

const Events: React.FC = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [upcoming, past] = await Promise.all([
          eventService.getUpcomingEvents(),
          eventService.getPastEvents()
        ]);
        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } catch (err) {
        setError('Failed to fetch events. Please try again later.');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading events...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
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
          <h1 className="text-5xl font-bold text-[#232B36] mb-6">Events</h1>
          <p className="text-xl text-[#6D666F] max-w-2xl mx-auto">
            Join our community events, workshops, and networking sessions to learn, connect, and grow.
          </p>
        </section>

        {/* Upcoming Events Section */}
        <section className="mb-16" aria-labelledby="upcoming-events-heading">
          <h2 id="upcoming-events-heading" className="text-3xl font-bold text-[#232B36] mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="text-sm text-gray-500 mb-4">Location: {event.location}</div>
                  <a
                    href={event.registration_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Past Events Section */}
        <section className="mb-16" aria-labelledby="past-events-heading">
          <h2 id="past-events-heading" className="text-3xl font-bold text-[#232B36] mb-8">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="text-sm text-gray-500">Location: {event.location}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-[#1A223E] text-white rounded-xl p-12 mb-16" aria-labelledby="cta-heading">
          <h2 id="cta-heading" className="text-3xl font-bold mb-4">Want to Host an Event?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Share your expertise with our community by hosting your own event or workshop.
          </p>
          <a
            href="/host-event"
            className="inline-block px-8 py-3 bg-white text-[#1A223E] rounded-lg font-semibold hover:bg-gray-100 transition"
            aria-label="Host an Event"
          >
            Host an Event
          </a>
        </section>
      </main>
      <footer className="w-full py-8 text-center text-sm text-[#6D666F] bg-transparent">
        &copy; {new Date().getFullYear()} ZeroStack. All rights reserved.
      </footer>
    </div>
  );
};

export default Events; 