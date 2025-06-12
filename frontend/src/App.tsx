import './index.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Resources from './pages/Resources';
import HowToGuides from './pages/HowToGuides';
import Events from './pages/Events';
import ContentList from './pages/content/ContentList';
import ContentDetail from './pages/content/ContentDetail';

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
        {/* Add more routes here as needed */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
