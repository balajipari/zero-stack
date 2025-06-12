import React from 'react';

interface Meetup {
  id: string;
  title: string;
  description: string;
  date: string;
  location?: string;
}

interface MeetupCardProps {
  meetup: Meetup;
}

const MeetupCard: React.FC<MeetupCardProps> = ({ meetup }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col h-full">
      <div className="text-sm text-gray-500 mb-2">
        {new Date(meetup.date).toLocaleDateString()}
      </div>
      <h3 className="text-2xl font-semibold text-[#232B36] mb-2">{meetup.title}</h3>
      <p className="text-[#6D666F] mb-4">{meetup.description}</p>
      {meetup.location && <div className="text-sm text-gray-500 mb-4">Location: {meetup.location}</div>}
      <a
        href={`/meetups/${meetup.id}`}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mt-auto"
        aria-label={`View details for ${meetup.title}`}
      >
        View Details
      </a>
    </div>
  );
};

export default MeetupCard; 