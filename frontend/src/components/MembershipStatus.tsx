import React, { useState } from 'react';
import { membershipService } from '../services/membershipService';
import type { UserMembership } from '../services/membershipService';

interface MembershipStatusProps {
  membership: UserMembership;
  onChange: (membership: UserMembership) => void;
}

const MembershipStatus: React.FC<MembershipStatusProps> = ({ membership, onChange }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [renewModal, setRenewModal] = useState(false);
  const [renewLoading, setRenewLoading] = useState(false);
  const [renewError, setRenewError] = useState<string | null>(null);

  const handleAction = async (action: 'upgrade' | 'downgrade' | 'cancel') => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const data: Partial<UserMembership> = {};
      if (action === 'upgrade') {
        data.type = 'growth';
      } else if (action === 'downgrade') {
        data.type = 'foundational';
      } else if (action === 'cancel') {
        data.status = 'cancelled';
      }
      const updated = await membershipService.updateMembership(membership.id, data);
      onChange(updated);
      setSuccess(
        action === 'upgrade'
          ? 'Membership upgraded!'
          : action === 'downgrade'
          ? 'Membership downgraded!'
          : 'Membership cancelled.'
      );
    } catch {
      setError('Action failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRenew = async () => {
    setRenewLoading(true);
    setRenewError(null);
    try {
      const updated = await membershipService.renewMembership(membership.id);
      onChange(updated);
      setSuccess('Membership renewed!');
      setRenewModal(false);
    } catch {
      setRenewError('Failed to renew membership.');
    } finally {
      setRenewLoading(false);
    }
  };

  const canRenew = membership.status !== 'cancelled';

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <div className="mb-4">
        <div className="text-lg font-semibold text-[#232B36] mb-2">Current Plan: {membership.type}</div>
        <div className="text-sm text-gray-500 mb-2">Status: {membership.status}</div>
        <div className="text-sm text-gray-500 mb-2">Start Date: {new Date(membership.start_date).toLocaleDateString()}</div>
        <div className="text-sm text-gray-500 mb-2">End Date: {membership.end_date ? new Date(membership.end_date).toLocaleDateString() : 'N/A'}</div>
      </div>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <button
          onClick={() => handleAction('upgrade')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loading || membership.type === 'growth' || membership.status === 'cancelled'}
        >
          Upgrade
        </button>
        <button
          onClick={() => handleAction('downgrade')}
          className="px-6 py-2 bg-gray-300 text-[#232B36] rounded-lg font-semibold hover:bg-gray-400 transition disabled:opacity-50"
          disabled={loading || membership.type === 'foundational' || membership.status === 'cancelled'}
        >
          Downgrade
        </button>
        <button
          onClick={() => handleAction('cancel')}
          className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
          disabled={loading || membership.status === 'cancelled'}
        >
          Cancel Membership
        </button>
        <button
          onClick={() => setRenewModal(true)}
          className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
          disabled={!canRenew || loading}
        >
          Renew
        </button>
      </div>
      {/* Renew Modal */}
      {renewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Renew Membership</h2>
            <p className="mb-6">Are you sure you want to renew your membership for another year?</p>
            {renewError && <div className="text-red-600 mb-2">{renewError}</div>}
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
                onClick={() => setRenewModal(false)}
                disabled={renewLoading}
              >
                No
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50"
                onClick={handleRenew}
                disabled={renewLoading}
              >
                {renewLoading ? 'Renewing...' : 'Yes, Renew'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipStatus; 