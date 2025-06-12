import React from 'react';
import type { Event } from '../services/eventService';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col h-full">
      <div className="text-sm text-gray-500 mb-2">
        {new Date(event.date).toLocaleDateString()} at {event.time}
      </div>
      <h3 className="text-2xl font-semibold text-[#232B36] mb-2">{event.title}</h3>
      <p className="text-[#6D666F] mb-4">{event.description}</p>
      <div className="text-sm text-gray-500 mb-4">Location: {event.location}</div>
      <a
        href={`/events/${event.id}`}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mt-auto"
        aria-label={`View details for ${event.title}`}
      >
        View Details
      </a>
    </div>
  );
};

export default EventCard; 