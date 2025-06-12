import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useUser } from '../context/UserContext';

const Login: React.FC = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = err as any;
      if (typeof error === 'object' && error && 'response' in error && error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError('Login failed. Please try again.');
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
          <h1 className="text-3xl font-bold text-[#232B36]">Login</h1>
        </div>
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
            autoFocus
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#1A223E] text-white rounded-lg font-semibold hover:bg-[#23305A] transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <span className="text-[#6D666F]">Don't have an account? </span>
        <a href="/register" className="text-blue-600 hover:underline">Register</a>
      </div>
    </div>
  );
};

export default Login; 