import React, { useState } from 'react';
import logo from '../assets/logo.png';

const ContactUs: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // Replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
    } catch {
      setError('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-5xl font-bold text-[#232B36] mb-6">Contact Us</h1>
          <p className="text-xl text-[#6D666F] max-w-2xl mx-auto">
            Have a question, feedback, or want to collaborate? Fill out the form below and our team will get back to you soon.
          </p>
        </section>

        <section className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact Form">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#232B36] mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#232B36] mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#232B36] mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            {success && <div className="text-green-600 text-sm">Message sent successfully!</div>}
            <button
              type="submit"
              className="w-full py-3 bg-[#1A223E] text-white rounded-lg font-semibold hover:bg-[#23305A] transition disabled:opacity-50"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </section>
      </main>
      <footer className="w-full py-8 text-center text-sm text-[#6D666F] bg-transparent">
        &copy; {new Date().getFullYear()} ZeroStack. All rights reserved.
      </footer>
    </div>
  );
};

export default ContactUs; 