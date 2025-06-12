import axios from 'axios';

export interface AdminMembership {
  id: number;
  user_id: number;
  type: string;
  status: string;
  start_date: string;
  end_date: string | null;
  created_at: string;
  updated_at: string;
  user_name: string;
  user_email: string;
}

export interface MembershipHistoryEntry {
  id: number;
  date: string;
  action: string;
  by: string;
  details: string;
}

export const adminMembershipService = {
  async getAllMemberships(token: string): Promise<AdminMembership[]> {
    // Get all users
    const usersRes = await axios.get('/api/admin/users/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const users = usersRes.data;
    // For each user, get memberships
    const memberships: AdminMembership[] = [];
    for (const user of users) {
      const memRes = await axios.get(`/api/users/${user.id}/memberships`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      for (const m of memRes.data) {
        memberships.push({
          ...m,
          user_name: user.name,
          user_email: user.email,
        });
      }
    }
    return memberships;
  },
  async updateMembership(id: number, data: Partial<AdminMembership>, token: string): Promise<AdminMembership> {
    const res = await axios.patch(
      `/api/memberships/${id}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  },
  async cancelMembership(id: number, token: string): Promise<AdminMembership> {
    const res = await axios.patch(
      `/api/memberships/${id}`,
      { status: 'cancelled' },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  },
  async renewMembership(id: number, token: string): Promise<AdminMembership> {
    const res = await axios.patch(
      `/api/memberships/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  },
  async getMembershipHistory(id: number, token: string): Promise<MembershipHistoryEntry[]> {
    // Use audit logs endpoint and filter by resource/resource_id
    const res = await axios.get('/api/admin/audit-logs/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (res.data as any[])
      .filter((log) => log.resource === 'membership' && log.resource_id === id)
      .map((log) => ({
        id: log.id,
        date: log.timestamp,
        action: log.action,
        by: log.user_id ? `User #${log.user_id}` : 'System',
        details: log.details || '',
      }));
  },
}; 