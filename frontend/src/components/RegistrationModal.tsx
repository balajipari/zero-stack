import React, { useState } from 'react';

interface RegistrationModalProps {
  open: boolean;
  onClose: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // Replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" role="dialog" aria-modal="true">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          aria-label="Close registration modal"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Event Registration</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Add payment fields here if needed */}
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success ? (
            <div className="text-green-600 text-sm mb-4">Registration successful!</div>
          ) : (
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal; 