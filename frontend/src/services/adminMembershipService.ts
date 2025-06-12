export interface AdminMembership {
  id: string;
  user: string;
  email: string;
  type: string;
  status: string;
  renewal_date: string;
}

export interface MembershipHistoryEntry {
  id: string;
  date: string;
  action: string;
  by: string;
  details: string;
}

const mockMemberships: AdminMembership[] = [
  {
    id: '1',
    user: 'Alice Smith',
    email: 'alice@example.com',
    type: 'growth',
    status: 'active',
    renewal_date: '2024-12-01',
  },
  {
    id: '2',
    user: 'Bob Lee',
    email: 'bob@example.com',
    type: 'foundational',
    status: 'cancelled',
    renewal_date: '2024-06-01',
  },
  {
    id: '3',
    user: 'Carol Jones',
    email: 'carol@example.com',
    type: 'growth',
    status: 'active',
    renewal_date: '2024-09-15',
  },
];

const mockHistory: Record<string, MembershipHistoryEntry[]> = {
  '1': [
    { id: 'h1', date: '2024-01-01', action: 'Created', by: 'System', details: 'Membership created.' },
    { id: 'h2', date: '2024-03-01', action: 'Renewed', by: 'Alice Smith', details: 'Renewed for 1 year.' },
    { id: 'h3', date: '2024-06-01', action: 'Type Changed', by: 'Admin', details: 'Upgraded to Growth.' },
  ],
  '2': [
    { id: 'h4', date: '2023-05-01', action: 'Created', by: 'System', details: 'Membership created.' },
    { id: 'h5', date: '2024-01-01', action: 'Cancelled', by: 'Bob Lee', details: 'Membership cancelled.' },
  ],
};

export const adminMembershipService = {
  async getAllMemberships(): Promise<AdminMembership[]> {
    // Replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockMemberships;
  },
  async updateMembership(id: string, data: Partial<AdminMembership>): Promise<AdminMembership> {
    // Replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    const idx = mockMemberships.findIndex((m) => m.id === id);
    if (idx === -1) throw new Error('Membership not found');
    mockMemberships[idx] = { ...mockMemberships[idx], ...data };
    return mockMemberships[idx];
  },
  async cancelMembership(id: string): Promise<AdminMembership> {
    // Replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    const idx = mockMemberships.findIndex((m) => m.id === id);
    if (idx === -1) throw new Error('Membership not found');
    mockMemberships[idx].status = 'cancelled';
    return mockMemberships[idx];
  },
  async renewMembership(id: string): Promise<AdminMembership> {
    // Replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    const idx = mockMemberships.findIndex((m) => m.id === id);
    if (idx === -1) throw new Error('Membership not found');
    // Extend renewal date by 1 year
    const newDate = new Date(mockMemberships[idx].renewal_date);
    newDate.setFullYear(newDate.getFullYear() + 1);
    mockMemberships[idx].renewal_date = newDate.toISOString();
    mockMemberships[idx].status = 'active';
    return mockMemberships[idx];
  },
  async getMembershipHistory(id: string): Promise<MembershipHistoryEntry[]> {
    // Replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockHistory[id] || [];
  },
}; 