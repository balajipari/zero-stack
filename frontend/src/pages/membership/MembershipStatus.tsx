import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import MembershipStatus from '../../components/MembershipStatus';
import { membershipService } from '../../services/membershipService';
import type { UserMembership } from '../../services/membershipService';

const MembershipStatusPage: React.FC = () => {
  const [membership, setMembership] = useState<UserMembership | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const data = await membershipService.getMembership();
        setMembership(data);
      } catch {
        setError('Failed to load membership. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMembership();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center">
        <div className="text-xl text-[#6D666F]">Loading membership...</div>
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

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#232B36] mb-6">Membership Status</h1>
          <p className="text-xl text-[#6D666F] max-w-2xl mx-auto">
            View and manage your membership plan, renewal, and status.
          </p>
        </section>
        {membership && <MembershipStatus membership={membership} onChange={setMembership} />}
      </main>
      <footer className="w-full py-8 text-center text-sm text-[#6D666F] bg-transparent">
        &copy; {new Date().getFullYear()} ZeroStack. All rights reserved.
      </footer>
    </div>
  );
};

export default MembershipStatusPage; 