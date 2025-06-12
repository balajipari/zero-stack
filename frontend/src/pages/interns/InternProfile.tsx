import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../../assets/logo.png';

interface Intern {
  user_id: string;
  name: string;
  skills: string;
  training_status: string;
  performance_score: number;
  is_listed: boolean;
}

const InternProfile: React.FC = () => {
  const { user_id } = useParams<{ user_id: string }>();
  const [intern, setIntern] = useState<Intern | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hiring, setHiring] = useState(false);
  const [hired, setHired] = useState(false);
  const [hireError, setHireError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIntern = async () => {
      if (!user_id) return;
      try {
        // Replace with real API call
        const response = await fetch(`/api/interns/${user_id}`);
        const data = await response.json();
        setIntern(data);
      } catch {
        setError('Failed to load intern. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchIntern();
  }, [user_id]);

  const handleHire = async () => {
    setHiring(true);
    setHireError(null);
    setHired(false);
    try {
      // Replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setHired(true);
    } catch {
      setHireError('Failed to hire intern. Please try again.');
    } finally {
      setHiring(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center">
        <div className="text-xl text-[#6D666F]">Loading intern...</div>
      </div>
    );
  }

  if (error || !intern) {
    return (
      <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center">
        <div className="text-xl text-red-600">{error || 'Intern not found'}</div>
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
        <button onClick={() => window.history.back()} className="mb-8 text-blue-600 hover:text-blue-800 flex items-center">← Back to Interns</button>
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <h1 className="text-4xl font-bold text-[#232B36] mb-4">{intern.name}</h1>
          <div className="text-sm text-gray-500 mb-2">Training Status: {intern.training_status}</div>
          <div className="text-sm text-gray-500 mb-2">Performance Score: {intern.performance_score}</div>
          <div className="text-sm text-gray-500 mb-4">Skills: {intern.skills}</div>
          {/* Founder only: Hire button (demo: always enabled) */}
          <button
            onClick={handleHire}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold mt-4"
            disabled={hiring}
          >
            {hiring ? 'Hiring...' : 'Hire Intern'}
          </button>
          {hired && <div className="text-green-600 mt-2">Intern hired successfully!</div>}
          {hireError && <div className="text-red-600 mt-2">{hireError}</div>}
        </div>
      </main>
      <footer className="w-full py-8 text-center text-sm text-[#6D666F] bg-transparent">
        &copy; {new Date().getFullYear()} ZeroStack. All rights reserved.
      </footer>
    </div>
  );
};

export default InternProfile; 