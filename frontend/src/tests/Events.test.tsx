import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Events from '../pages/Events';
import { eventService } from '../services/eventService';

// Mock the eventService
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

describe('Events Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(<Events />);
    expect(screen.getByText('Loading events...')).toBeInTheDocument();
  });

  it('renders events after loading', async () => {
    // Mock the service responses
    (eventService.getUpcomingEvents as jest.Mock).mockResolvedValue(mockEvents);
    (eventService.getPastEvents as jest.Mock).mockResolvedValue([]);

    render(<Events />);

    // Wait for the events to be loaded
    await waitFor(() => {
      expect(screen.getByText('Tech Workshop: Web Development')).toBeInTheDocument();
      expect(screen.getByText('Networking Mixer')).toBeInTheDocument();
    });
  });

  it('renders error state when API call fails', async () => {
    // Mock the service to throw an error
    (eventService.getUpcomingEvents as jest.Mock).mockRejectedValue(new Error('API Error'));
    (eventService.getPastEvents as jest.Mock).mockResolvedValue([]);

    render(<Events />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch events. Please try again later.')).toBeInTheDocument();
    });
  });

  it('renders main sections correctly', async () => {
    // Mock the service responses
    (eventService.getUpcomingEvents as jest.Mock).mockResolvedValue(mockEvents);
    (eventService.getPastEvents as jest.Mock).mockResolvedValue([]);

    render(<Events />);

    // Wait for the content to load
    await waitFor(() => {
      expect(screen.getByText('Events')).toBeInTheDocument();
      expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
      expect(screen.getByText('Past Events')).toBeInTheDocument();
      expect(screen.getByText('Want to Host an Event?')).toBeInTheDocument();
    });
  });

  it('renders navigation links correctly', async () => {
    // Mock the service responses
    (eventService.getUpcomingEvents as jest.Mock).mockResolvedValue(mockEvents);
    (eventService.getPastEvents as jest.Mock).mockResolvedValue([]);

    render(<Events />);

    // Wait for the content to load
    await waitFor(() => {
      expect(screen.getByText("Member's Login")).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
      expect(screen.getByText('Write for Us')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
    });
  });
}); 