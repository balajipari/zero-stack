import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import axios from 'axios';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('builder');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await axios.post('/api/auth/register', {
        name,
        email,
        password,
        role,
      });
      setSuccess('Registration successful! Please log in.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = err as any;
      if (typeof error === 'object' && error && 'response' in error && error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Zerostack logo" className="w-16 h-16 mb-2 drop-shadow" />
          <h1 className="text-3xl font-bold text-[#232B36]">Register</h1>
        </div>
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
        {success && <div className="text-green-600 mb-4 text-center">{success}</div>}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value="builder">Builder</option>
            <option value="founder">Founder</option>
            <option value="intern">Intern</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#1A223E] text-white rounded-lg font-semibold hover:bg-[#23305A] transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register; 