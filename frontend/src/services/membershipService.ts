import axios from 'axios';

export interface UserMembership {
  id: number;
  type: string;
  status: string;
  start_date: string;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

// Mock: Replace with real user ID and token from auth context
const userId = 1;
const token = 'mock-token';

export const membershipService = {
  async getMembership(): Promise<UserMembership | null> {
    // Fetch memberships for the current user
    const res = await axios.get(`/api/users/${userId}/memberships`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Return the first (or only) membership for now
    return res.data && res.data.length > 0 ? res.data[0] : null;
  },
  async renewMembership(id: number): Promise<UserMembership> {
    // PATCH to update end_date (renew)
    const res = await axios.patch(
      `/api/memberships/${id}`,
      { /* You may want to send a new end_date or just trigger renewal on backend */ },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  },
  async updateMembership(id: number, data: Partial<UserMembership>): Promise<UserMembership> {
    const res = await axios.patch(
      `/api/memberships/${id}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  },
  async cancelMembership(id: number): Promise<UserMembership> {
    const res = await axios.patch(
      `/api/memberships/${id}`,
      { status: 'cancelled' },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  },
}; 