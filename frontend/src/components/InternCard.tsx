import React from 'react';

interface Intern {
  user_id: string;
  name: string;
  skills: string;
  training_status: string;
  performance_score: number;
  is_listed: boolean;
}

interface InternCardProps {
  intern: Intern;
}

const InternCard: React.FC<InternCardProps> = ({ intern }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col h-full">
      <h3 className="text-2xl font-semibold text-[#232B36] mb-2">{intern.name}</h3>
      <div className="text-sm text-gray-500 mb-2">Training Status: {intern.training_status}</div>
      <div className="text-sm text-gray-500 mb-2">Performance Score: {intern.performance_score}</div>
      <div className="text-sm text-gray-500 mb-4">Skills: {intern.skills}</div>
      <a
        href={`/interns/${intern.user_id}`}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mt-auto"
        aria-label={`View profile for ${intern.name}`}
      >
        View Profile
      </a>
    </div>
  );
};

export default InternCard; 