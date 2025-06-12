import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import { adminMembershipService } from '../../services/adminMembershipService';
import type { AdminMembership, MembershipHistoryEntry } from '../../services/adminMembershipService';
import { saveAs } from 'file-saver';

const MembershipManagement: React.FC = () => {
  const [memberships, setMemberships] = useState<AdminMembership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [editId, setEditId] = useState<number | null>(null);
  const [cancelId, setCancelId] = useState<number | null>(null);
  const [renewId, setRenewId] = useState<number | null>(null);
  const [historyId, setHistoryId] = useState<number | null>(null);
  const [history, setHistory] = useState<MembershipHistoryEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [editType, setEditType] = useState('');
  const [editStatus, setEditStatus] = useState('');

  useEffect(() => {
    const fetchMemberships = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await adminMembershipService.getAllMemberships();
        setMemberships(data);
      } catch {
        setError('Failed to load memberships. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMemberships();
  }, []);

  const filteredMemberships = memberships.filter((m) => {
    const matchesSearch =
      m.user_name.toLowerCase().includes(search.toLowerCase()) ||
      m.user_email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || m.status === filter;
    return matchesSearch && matchesFilter;
  });

  const openEdit = (m: AdminMembership) => {
    setEditId(m.id);
    setEditType(m.type);
    setEditStatus(m.status);
    setActionError(null);
  };

  const openHistory = async (id: number) => {
    setHistoryId(id);
    setHistory([]);
    setHistoryLoading(true);
    setHistoryError(null);
    try {
      const data = await adminMembershipService.getMembershipHistory(id);
      setHistory(data);
    } catch {
      setHistoryError('Failed to load history.');
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleEdit = async () => {
    if (editId === null) return;
    setActionLoading(true);
    setActionError(null);
    try {
      const updated = await adminMembershipService.updateMembership(editId, { type: editType, status: editStatus });
      setMemberships((prev) => prev.map((m) => (m.id === updated.id ? { ...updated, user_name: m.user_name, user_email: m.user_email } : m)));
      setEditId(null);
    } catch {
      setActionError('Failed to update membership.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancel = async () => {
    if (cancelId === null) return;
    setActionLoading(true);
    setActionError(null);
    try {
      const updated = await adminMembershipService.cancelMembership(cancelId);
      setMemberships((prev) => prev.map((m) => (m.id === updated.id ? { ...updated, user_name: m.user_name, user_email: m.user_email } : m)));
      setCancelId(null);
    } catch {
      setActionError('Failed to cancel membership.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRenew = async () => {
    if (renewId === null) return;
    setActionLoading(true);
    setActionError(null);
    try {
      const updated = await adminMembershipService.renewMembership(renewId);
      setMemberships((prev) => prev.map((m) => (m.id === updated.id ? { ...updated, user_name: m.user_name, user_email: m.user_email } : m)));
      setRenewId(null);
    } catch {
      setActionError('Failed to renew membership.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleExport = () => {
    const headers = ['User', 'Email', 'Type', 'Status', 'Start Date', 'End Date'];
    const rows = filteredMemberships.map((m) => [m.user_name, m.user_email, m.type, m.status, m.start_date, m.end_date || '']);
    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'memberships.csv');
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

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#232B36] mb-6">Membership Management</h1>
          <p className="text-xl text-[#6D666F] max-w-2xl mx-auto">
            View, search, and manage all user memberships.
          </p>
        </section>

        {/* Export Button */}
        <div className="flex justify-end mb-4">
          <button
            className="px-6 py-2 bg-[#1A223E] text-white rounded-lg font-semibold hover:bg-[#23305A] transition"
            onClick={handleExport}
            disabled={filteredMemberships.length === 0}
          >
            Export CSV
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          <input
            type="text"
            placeholder="Search by user or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 w-full md:w-1/3"
            aria-label="Search memberships"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300"
            aria-label="Filter by status"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Loading and Error States */}
        {loading ? (
          <div className="text-center text-lg text-[#6D666F] mb-16">Loading memberships...</div>
        ) : error ? (
          <div className="text-center text-red-600 mb-16">{error}</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMemberships.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-400">No memberships found.</td>
                  </tr>
                ) : (
                  filteredMemberships.map((m) => (
                    <tr key={m.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{m.user_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{m.user_email}</td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">{m.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">{m.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(m.start_date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{m.end_date ? new Date(m.end_date).toLocaleDateString() : 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition mr-2"
                          onClick={() => openEdit(m)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 bg-gray-600 text-white rounded-lg text-sm font-semibold hover:bg-gray-700 transition mr-2"
                          onClick={() => openHistory(m.id)}
                        >
                          View History
                        </button>
                        <button
                          className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition mr-2"
                          onClick={() => setRenewId(m.id)}
                          disabled={m.status === 'cancelled'}
                        >
                          Renew
                        </button>
                        <button
                          className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition"
                          onClick={() => setCancelId(m.id)}
                          disabled={m.status === 'cancelled'}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Edit Modal */}
        {editId !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Edit Membership</h2>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Type</label>
                <select
                  value={editType}
                  onChange={(e) => setEditType(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="growth">Growth</option>
                  <option value="foundational">Foundational</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="active">Active</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              {actionError && <div className="text-red-600 mb-2">{actionError}</div>}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
                  onClick={() => setEditId(null)}
                  disabled={actionLoading}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
                  onClick={handleEdit}
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* History Modal */}
        {historyId !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">Membership History</h2>
              {historyLoading ? (
                <div className="text-center text-lg text-[#6D666F] mb-6">Loading history...</div>
              ) : historyError ? (
                <div className="text-center text-red-600 mb-6">{historyError}</div>
              ) : history.length === 0 ? (
                <div className="text-center text-gray-400 mb-6">No history found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">By</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {history.map((h) => (
                        <tr key={h.id}>
                          <td className="px-4 py-2 whitespace-nowrap">{h.date}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{h.action}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{h.by}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{h.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="flex justify-end mt-6">
                <button
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
                  onClick={() => setHistoryId(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Renew Modal */}
        {renewId !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Renew Membership</h2>
              <p className="mb-6">Are you sure you want to renew this membership for another year?</p>
              {actionError && <div className="text-red-600 mb-2">{actionError}</div>}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
                  onClick={() => setRenewId(null)}
                  disabled={actionLoading}
                >
                  No
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50"
                  onClick={handleRenew}
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Renewing...' : 'Yes, Renew'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cancel Modal */}
        {cancelId !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Cancel Membership</h2>
              <p className="mb-6">Are you sure you want to cancel this membership?</p>
              {actionError && <div className="text-red-600 mb-2">{actionError}</div>}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
                  onClick={() => setCancelId(null)}
                  disabled={actionLoading}
                >
                  No
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50"
                  onClick={handleCancel}
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Cancelling...' : 'Yes, Cancel'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <footer className="w-full py-8 text-center text-sm text-[#6D666F] bg-transparent">
        &copy; {new Date().getFullYear()} ZeroStack. All rights reserved.
      </footer>
    </div>
  );
};

export default MembershipManagement; 