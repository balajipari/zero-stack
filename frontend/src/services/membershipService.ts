export interface UserMembership {
  id: string;
  type: string;
  status: string;
  renewal_date: string;
}

let mockMembership: UserMembership = {
  id: '1',
  type: 'growth',
  status: 'active',
  renewal_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
};

export const membershipService = {
  async getMembership(): Promise<UserMembership> {
    // Replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockMembership;
  },
  async renewMembership(id: string): Promise<UserMembership> {
    // Replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (mockMembership.id !== id) throw new Error('Membership not found');
    // Extend renewal date by 1 year
    const newDate = new Date(mockMembership.renewal_date);
    newDate.setFullYear(newDate.getFullYear() + 1);
    mockMembership = {
      ...mockMembership,
      status: 'active',
      renewal_date: newDate.toISOString(),
    };
    return mockMembership;
  },
}; 