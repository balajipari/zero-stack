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

export const membershipService = {
  async getMembership(userId: number, token: string): Promise<UserMembership | null> {
    // Fetch memberships for the current user
    const res = await axios.get(`/api/users/${userId}/memberships`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Return the first (or only) membership for now
    return res.data && res.data.length > 0 ? res.data[0] : null;
  },
  async renewMembership(id: number, token: string): Promise<UserMembership> {
    // PATCH to update end_date (renew)
    const res = await axios.patch(
      `/api/memberships/${id}`,
      { /* You may want to send a new end_date or just trigger renewal on backend */ },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  },
  async updateMembership(id: number, data: Partial<UserMembership>, token: string): Promise<UserMembership> {
    const res = await axios.patch(
      `/api/memberships/${id}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  },
  async cancelMembership(id: number, token: string): Promise<UserMembership> {
    const res = await axios.patch(
      `/api/memberships/${id}`,
      { status: 'cancelled' },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  },
}; 