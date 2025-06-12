import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventList from '../pages/events/EventList';
import { eventService } from '../services/eventService';

jest.mock('../services/eventService');

const mockEvents = [
  {
    id: '1',
    title: 'Tech Workshop: Web Development',
    description: 'Learn the fundamentals of modern web development in this hands-on workshop.',
    date: '2024-03-25',
    time: '2:00 PM EST',
    location: 'Virtual',
    registration_link: 'https://example.com/register/1',
    created_at: '2024-03-01T00:00:00Z',
    updated_at: '2024-03-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Networking Mixer',
    description: 'Connect with fellow tech enthusiasts and industry professionals.',
    date: '2024-03-28',
    time: '6:00 PM EST',
    location: 'Virtual',
    registration_link: 'https://example.com/register/2',
    created_at: '2024-03-01T00:00:00Z',
    updated_at: '2024-03-01T00:00:00Z'
  }
];

describe('EventList Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(<EventList />);
    expect(screen.getByText('Loading events...')).toBeInTheDocument();
  });

  it('renders events after loading', async () => {
    (eventService.getAllEvents as jest.Mock).mockResolvedValue(mockEvents);
    render(<EventList />);
    await waitFor(() => {
      expect(screen.getByText('Tech Workshop: Web Development')).toBeInTheDocument();
      expect(screen.getByText('Networking Mixer')).toBeInTheDocument();
    });
  });

  it('renders error state when API call fails', async () => {
    (eventService.getAllEvents as jest.Mock).mockRejectedValue(new Error('API Error'));
    render(<EventList />);
    await waitFor(() => {
      expect(screen.getByText('Failed to load events. Please try again later.')).toBeInTheDocument();
    });
  });

  it('renders navigation links and main sections', async () => {
    (eventService.getAllEvents as jest.Mock).mockResolvedValue(mockEvents);
    render(<EventList />);
    await waitFor(() => {
      expect(screen.getByText('All Events')).toBeInTheDocument();
      expect(screen.getByText('Events')).toBeInTheDocument();
      expect(screen.getByText("Member's Login")).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
      expect(screen.getByText('Write for Us')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
    });
  });
}); 