import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import InternProfile from '../pages/interns/InternProfile';

// Mock fetch
global.fetch = jest.fn();

const mockIntern = {
  user_id: '1',
  name: 'Alice Smith',
  skills: 'React, Node.js',
  training_status: 'completed',
  performance_score: 95,
  is_listed: true,
};

describe('InternProfile Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
    render(
      <MemoryRouter initialEntries={['/interns/1']}>
        <Routes>
          <Route path="/interns/:user_id" element={<InternProfile />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Loading intern...')).toBeInTheDocument();
  });

  it('renders intern after loading', async () => {
    (fetch as jest.Mock).mockResolvedValue({ json: () => Promise.resolve(mockIntern) });
    render(
      <MemoryRouter initialEntries={['/interns/1']}>
        <Routes>
          <Route path="/interns/:user_id" element={<InternProfile />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
      expect(screen.getByText('Hire Intern')).toBeInTheDocument();
    });
  });

  it('renders error state when fetch fails', async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error('API Error'));
    render(
      <MemoryRouter initialEntries={['/interns/1']}>
        <Routes>
          <Route path="/interns/:user_id" element={<InternProfile />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Failed to load intern. Please try again later.')).toBeInTheDocument();
    });
  });

  it('shows hiring and success state on hire', async () => {
    (fetch as jest.Mock).mockResolvedValue({ json: () => Promise.resolve(mockIntern) });
    render(
      <MemoryRouter initialEntries={['/interns/1']}>
        <Routes>
          <Route path="/interns/:user_id" element={<InternProfile />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Hire Intern')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Hire Intern'));
    expect(screen.getByText('Hiring...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Intern hired successfully!')).toBeInTheDocument();
    });
  });
}); 