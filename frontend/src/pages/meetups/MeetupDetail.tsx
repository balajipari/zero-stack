import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../../assets/logo.png';
import PhotoGallery from '../../components/PhotoGallery';
import FileUpload from '../../components/FileUpload';

interface Meetup {
  id: string;
  title: string;
  description: string;
  date: string;
  location?: string;
}

const MeetupDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [meetup, setMeetup] = useState<Meetup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [galleryKey, setGalleryKey] = useState(0);

  useEffect(() => {
    const fetchMeetup = async () => {
      if (!id) return;
      try {
        // Replace with real API call
        const response = await fetch(`/api/meetups/${id}`);
        const data = await response.json();
        setMeetup(data);
      } catch {
        setError('Failed to load meetup. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMeetup();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center">
        <div className="text-xl text-[#6D666F]">Loading meetup...</div>
      </div>
    );
  }

  if (error || !meetup) {
    return (
      <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center">
        <div className="text-xl text-red-600">{error || 'Meetup not found'}</div>
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
        <button onClick={() => window.history.back()} className="mb-8 text-blue-600 hover:text-blue-800 flex items-center">← Back to Meetups</button>
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <div className="text-sm text-gray-500 mb-2">
            {new Date(meetup.date).toLocaleDateString()}
          </div>
          <h1 className="text-4xl font-bold text-[#232B36] mb-4">{meetup.title}</h1>
          <p className="text-[#6D666F] mb-6">{meetup.description}</p>
          {meetup.location && <div className="text-sm text-gray-500 mb-4">Location: {meetup.location}</div>}
        </div>
        {/* Photo Gallery */}
        <section className="mb-16" aria-labelledby="gallery-heading">
          <h2 id="gallery-heading" className="text-2xl font-bold text-[#232B36] mb-4">Photo Gallery</h2>
          {/* SuperAdmin upload (demo: always true) */}
          {id && (
            <FileUpload
              meetupId={id}
              onUpload={() => setGalleryKey((k) => k + 1)}
            />
          )}
          {id && <PhotoGallery key={galleryKey} meetupId={id} />}
        </section>
      </main>
      <footer className="w-full py-8 text-center text-sm text-[#6D666F] bg-transparent">
        &copy; {new Date().getFullYear()} ZeroStack. All rights reserved.
      </footer>
    </div>
  );
};

export default MeetupDetail; 