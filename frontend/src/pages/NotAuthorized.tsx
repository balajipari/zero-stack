import React from 'react';
import logo from '../assets/logo.png';

const NotAuthorized: React.FC = () => (
  <div className="min-h-screen bg-[#FCFAF7] flex flex-col items-center justify-center">
    <img src={logo} alt="Zerostack logo" className="w-20 h-20 mb-6 drop-shadow" />
    <h1 className="text-4xl font-bold text-[#232B36] mb-4">Not Authorized</h1>
    <p className="text-lg text-[#6D666F] mb-8">You do not have permission to view this page.</p>
    <a href="/" className="px-6 py-2 bg-[#1A223E] text-white rounded-lg font-semibold hover:bg-[#23305A] transition">Go Home</a>
  </div>
);

export default NotAuthorized; 