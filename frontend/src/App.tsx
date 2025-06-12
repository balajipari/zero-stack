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

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/how-to-guides" element={<HowToGuides />} />
        <Route path="/events" element={<Events />} />
        <Route path="/content" element={<ContentList />} />
        <Route path="/content/:id" element={<ContentDetail />} />
        <Route path="/podcasts" element={<Podcasts />} />
        <Route path="/contact" element={<ContactUs />} />
        {/* Add more routes here as needed */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
