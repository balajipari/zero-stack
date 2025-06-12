import './index.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Resources from './pages/Resources';
import HowToGuides from './pages/HowToGuides';
import Events from './pages/Events';
import ContentList from './pages/content/ContentList';
import ContentDetail from './pages/content/ContentDetail';
import Podcasts from './pages/Podcasts';
import ContactUs from './pages/ContactUs';
import EventDetail from './pages/events/EventDetail';
import MeetupList from './pages/meetups/MeetupList';
import MeetupDetail from './pages/meetups/MeetupDetail';
import InternList from './pages/interns/InternList';
import InternProfile from './pages/interns/InternProfile';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/how-to-guides" element={<HowToGuides />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/content" element={<ContentList />} />
        <Route path="/content/:id" element={<ContentDetail />} />
        <Route path="/podcasts" element={<Podcasts />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/meetups" element={<MeetupList />} />
        <Route path="/meetups/:id" element={<MeetupDetail />} />
        <Route path="/interns" element={<InternList />} />
        <Route path="/interns/:user_id" element={<InternProfile />} />
        {/* Add more routes here as needed */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
