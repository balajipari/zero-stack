import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import EventDetail from '../pages/events/EventDetail';
import { eventService } from '../services/eventService';

jest.mock('../services/eventService');

const mockEvent = {
  id: '1',
  title: 'Tech Workshop: Web Development',
  description: 'Learn the fundamentals of modern web development in this hands-on workshop.',
  date: '2024-03-25',
  time: '2:00 PM EST',
  location: 'Virtual',
  registration_link: 'https://example.com/register/1',
  created_at: '2024-03-01T00:00:00Z',
  updated_at: '2024-03-01T00:00:00Z'
};

describe('EventDetail Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(
      <MemoryRouter initialEntries={['/events/1']}>
        <Routes>
          <Route path="/events/:id" element={<EventDetail />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Loading event...')).toBeInTheDocument();
  });

  it('renders event after loading', async () => {
    (eventService.getEventById as jest.Mock).mockResolvedValue(mockEvent);
    render(
      <MemoryRouter initialEntries={['/events/1']}>
        <Routes>
          <Route path="/events/:id" element={<EventDetail />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Tech Workshop: Web Development')).toBeInTheDocument();
      expect(screen.getByText('Register Now')).toBeInTheDocument();
    });
  });

  it('renders error state when API call fails', async () => {
    (eventService.getEventById as jest.Mock).mockRejectedValue(new Error('API Error'));
    render(
      <MemoryRouter initialEntries={['/events/1']}>
        <Routes>
          <Route path="/events/:id" element={<EventDetail />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Failed to load event. Please try again later.')).toBeInTheDocument();
    });
  });

  it('opens registration modal when Register Now is clicked', async () => {
    (eventService.getEventById as jest.Mock).mockResolvedValue(mockEvent);
    render(
      <MemoryRouter initialEntries={['/events/1']}>
        <Routes>
          <Route path="/events/:id" element={<EventDetail />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Register Now')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Register Now'));
    expect(screen.getByText('Event Registration')).toBeInTheDocument();
  });
}); 