import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MembershipManagement from '../pages/membership/MembershipManagement';
import * as adminService from '../services/adminMembershipService';

const mockMemberships = [
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
];

describe('MembershipManagement Page', () => {
  beforeEach(() => {
    jest.spyOn(adminService.adminMembershipService, 'getAllMemberships').mockResolvedValue(mockMemberships);
    jest.spyOn(adminService.adminMembershipService, 'updateMembership').mockImplementation(async (id, data) => ({ ...mockMemberships[0], ...data, id }));
    jest.spyOn(adminService.adminMembershipService, 'cancelMembership').mockImplementation(async (id) => ({ ...mockMemberships[0], id, status: 'cancelled' }));
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders loading state', () => {
    jest.spyOn(adminService.adminMembershipService, 'getAllMemberships').mockImplementation(() => new Promise(() => {}));
    render(<MembershipManagement />);
    expect(screen.getByText('Loading memberships...')).toBeInTheDocument();
  });

  it('renders error state', async () => {
    jest.spyOn(adminService.adminMembershipService, 'getAllMemberships').mockRejectedValue(new Error('API Error'));
    render(<MembershipManagement />);
    await waitFor(() => {
      expect(screen.getByText('Failed to load memberships. Please try again later.')).toBeInTheDocument();
    });
  });

  it('renders memberships table', async () => {
    render(<MembershipManagement />);
    await waitFor(() => {
      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
      expect(screen.getByText('Bob Lee')).toBeInTheDocument();
    });
  });

  it('filters memberships by search', async () => {
    render(<MembershipManagement />);
    await waitFor(() => screen.getByText('Alice Smith'));
    fireEvent.change(screen.getByPlaceholderText('Search by user or email...'), { target: { value: 'bob' } });
    expect(screen.queryByText('Alice Smith')).not.toBeInTheDocument();
    expect(screen.getByText('Bob Lee')).toBeInTheDocument();
  });

  it('filters memberships by status', async () => {
    render(<MembershipManagement />);
    await waitFor(() => screen.getByText('Alice Smith'));
    fireEvent.change(screen.getByLabelText('Filter by status'), { target: { value: 'cancelled' } });
    expect(screen.queryByText('Alice Smith')).not.toBeInTheDocument();
    expect(screen.getByText('Bob Lee')).toBeInTheDocument();
  });

  it('opens and closes edit modal, and saves changes', async () => {
    render(<MembershipManagement />);
    await waitFor(() => screen.getByText('Alice Smith'));
    fireEvent.click(screen.getAllByText('Edit')[0]);
    expect(screen.getByText('Edit Membership')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Type'), { target: { value: 'foundational' } });
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'cancelled' } });
    fireEvent.click(screen.getByText('Save'));
    await waitFor(() => expect(screen.queryByText('Edit Membership')).not.toBeInTheDocument());
  });

  it('opens and closes cancel modal, and confirms cancel', async () => {
    render(<MembershipManagement />);
    await waitFor(() => screen.getByText('Alice Smith'));
    fireEvent.click(screen.getAllByText('Cancel')[0]);
    expect(screen.getByText('Cancel Membership')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Yes, Cancel'));
    await waitFor(() => expect(screen.queryByText('Cancel Membership')).not.toBeInTheDocument());
  });

  it('disables cancel button for already cancelled memberships', async () => {
    render(<MembershipManagement />);
    await waitFor(() => screen.getByText('Bob Lee'));
    const cancelBtn = screen.getAllByText('Cancel')[1];
    expect(cancelBtn).toBeDisabled();
  });
}); 