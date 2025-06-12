import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Podcasts from '../pages/Podcasts';
import { podcastService } from '../services/podcastService';

// Mock the podcastService
jest.mock('../services/podcastService');

const mockPodcasts = [
  {
    id: '1',
    title: 'Building for the Future',
    description: 'A candid conversation on tech, startups, and the builder\'s mindset.',
    audio_url: 'https://example.com/audio1.mp3',
    image_url: 'https://example.com/podcast1.jpg',
    published_at: '2024-03-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Zero to One: Startup Stories',
    description: 'Real-world stories of product building and growth.',
    audio_url: 'https://example.com/audio2.mp3',
    image_url: 'https://example.com/podcast2.jpg',
    published_at: '2024-03-10T00:00:00Z',
  },
];

describe('Podcasts Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(<Podcasts />);
    expect(screen.getByText('Loading podcasts...')).toBeInTheDocument();
  });

  it('renders podcasts after loading', async () => {
    (podcastService.getAllPodcasts as jest.Mock).mockResolvedValue(mockPodcasts);
    render(<Podcasts />);
    await waitFor(() => {
      expect(screen.getByText('Building for the Future')).toBeInTheDocument();
      expect(screen.getByText('Zero to One: Startup Stories')).toBeInTheDocument();
    });
  });

  it('renders error state when API call fails', async () => {
    (podcastService.getAllPodcasts as jest.Mock).mockRejectedValue(new Error('API Error'));
    render(<Podcasts />);
    await waitFor(() => {
      expect(screen.getByText('Failed to load podcasts. Please try again later.')).toBeInTheDocument();
    });
  });

  it('renders navigation links and main sections', async () => {
    (podcastService.getAllPodcasts as jest.Mock).mockResolvedValue(mockPodcasts);
    render(<Podcasts />);
    await waitFor(() => {
      expect(screen.getByText('Podcasts')).toBeInTheDocument();
      expect(screen.getByText('Latest Episodes')).toBeInTheDocument();
      expect(screen.getByText("Member's Login")).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
      expect(screen.getByText('Write for Us')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
    });
  });
}); 