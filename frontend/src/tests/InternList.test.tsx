import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import InternList from '../pages/interns/InternList';

// Mock fetch
global.fetch = jest.fn();

const mockInterns = [
  {
    user_id: '1',
    name: 'Alice Smith',
    skills: 'React, Node.js',
    training_status: 'completed',
    performance_score: 95,
    is_listed: true,
  },
  {
    user_id: '2',
    name: 'Bob Johnson',
    skills: 'Python, Data Science',
    training_status: 'in_progress',
    performance_score: 88,
    is_listed: true,
  },
];

describe('InternList Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
    render(<InternList />);
    expect(screen.getByText('Loading interns...')).toBeInTheDocument();
  });

  it('renders interns after loading', async () => {
    (fetch as jest.Mock).mockResolvedValue({ json: () => Promise.resolve(mockInterns) });
    render(<InternList />);
    await waitFor(() => {
      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });
  });

  it('renders error state when fetch fails', async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error('API Error'));
    render(<InternList />);
    await waitFor(() => {
      expect(screen.getByText('Failed to load interns. Please try again later.')).toBeInTheDocument();
    });
  });
}); 