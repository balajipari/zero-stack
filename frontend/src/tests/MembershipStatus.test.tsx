import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MembershipStatusPage from '../pages/membership/MembershipStatus';
import MembershipStatus from '../components/MembershipStatus';

const mockMembership = {
  id: '1',
  type: 'foundational',
  status: 'active',
  renewal_date: new Date(Date.now() + 86400000).toISOString(),
};

describe('MembershipStatus Page', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation((input) => {
      if (input === '/api/membership') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockMembership),
        } as Response);
      }
      return Promise.reject(new Error('Unknown API'));
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders loading state', () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => new Promise(() => {}));
    render(
      <MemoryRouter initialEntries={["/membership/status"]}>
        <Routes>
          <Route path="/membership/status" element={<MembershipStatusPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Loading membership...')).toBeInTheDocument();
  });

  it('renders error state', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('API Error'));
    render(
      <MemoryRouter initialEntries={["/membership/status"]}>
        <Routes>
          <Route path="/membership/status" element={<MembershipStatusPage />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Failed to load membership. Please try again later.')).toBeInTheDocument();
    });
  });

  it('renders membership info', async () => {
    render(
      <MemoryRouter initialEntries={["/membership/status"]}>
        <Routes>
          <Route path="/membership/status" element={<MembershipStatusPage />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Current Plan:/)).toBeInTheDocument();
      expect(screen.getByText(/Status:/)).toBeInTheDocument();
      expect(screen.getByText(/Renewal Date:/)).toBeInTheDocument();
    });
  });
});

describe('MembershipStatus Component', () => {
  it('shows upgrade, downgrade, and cancel buttons', () => {
    render(<MembershipStatus membership={mockMembership} onChange={jest.fn()} />);
    expect(screen.getByText('Upgrade')).toBeInTheDocument();
    expect(screen.getByText('Downgrade')).toBeInTheDocument();
    expect(screen.getByText('Cancel Membership')).toBeInTheDocument();
  });

  it('handles upgrade action', async () => {
    const onChange = jest.fn();
    render(<MembershipStatus membership={mockMembership} onChange={onChange} />);
    fireEvent.click(screen.getByText('Upgrade'));
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ type: 'growth' }));
      expect(screen.getByText('Membership upgraded!')).toBeInTheDocument();
    });
  });

  it('handles downgrade action', async () => {
    const onChange = jest.fn();
    render(<MembershipStatus membership={{ ...mockMembership, type: 'growth' }} onChange={onChange} />);
    fireEvent.click(screen.getByText('Downgrade'));
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ type: 'foundational' }));
      expect(screen.getByText('Membership downgraded!')).toBeInTheDocument();
    });
  });

  it('handles cancel action', async () => {
    const onChange = jest.fn();
    render(<MembershipStatus membership={mockMembership} onChange={onChange} />);
    fireEvent.click(screen.getByText('Cancel Membership'));
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ status: 'cancelled' }));
      expect(screen.getByText('Membership cancelled.')).toBeInTheDocument();
    });
  });

  it('disables buttons when already cancelled', () => {
    render(<MembershipStatus membership={{ ...mockMembership, status: 'cancelled' }} onChange={jest.fn()} />);
    expect(screen.getByText('Upgrade')).toBeDisabled();
    expect(screen.getByText('Downgrade')).toBeDisabled();
    expect(screen.getByText('Cancel Membership')).toBeDisabled();
  });
}); 