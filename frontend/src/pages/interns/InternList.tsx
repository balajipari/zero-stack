import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import InternCard from '../../components/InternCard';

interface Intern {
  user_id: string;
  name: string;
  skills: string;
  training_status: string;
  performance_score: number;
  is_listed: boolean;
}

const InternList: React.FC = () => {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        // Replace with real API call
        const response = await fetch('/api/interns?is_listed=true');
        const data = await response.json();
        setInterns(data);
      } catch {
        setError('Failed to load interns. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchInterns();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center">
        <div className="text-xl text-[#6D666F]">Loading interns...</div>
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
          <h1 className="text-5xl font-bold text-[#232B36] mb-6">Star Interns</h1>
          <p className="text-xl text-[#6D666F] max-w-2xl mx-auto">
            Browse our vetted list of star interns and hire them based on their skills and training status.
          </p>
        </section>

        <section className="mb-16" aria-labelledby="interns-heading">
          <h2 id="interns-heading" className="text-3xl font-bold text-[#232B36] mb-8">Interns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {interns.map((intern) => (
              <InternCard key={intern.user_id} intern={intern} />
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

export default InternList; 