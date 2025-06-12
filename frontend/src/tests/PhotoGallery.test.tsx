import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PhotoGallery from '../components/PhotoGallery';

// Mock fetch
global.fetch = jest.fn();

const mockPhotos = [
  { id: '1', photo_url: 'https://example.com/photo1.jpg' },
  { id: '2', photo_url: 'https://example.com/photo2.jpg' },
];

describe('PhotoGallery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state initially', () => {
    (fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
    render(<PhotoGallery meetupId="1" />);
    expect(screen.getByText('Loading photos...')).toBeInTheDocument();
  });

  it('renders photos after loading', async () => {
    (fetch as jest.Mock).mockResolvedValue({ json: () => Promise.resolve(mockPhotos) });
    render(<PhotoGallery meetupId="1" />);
    await waitFor(() => {
      expect(screen.getAllByAltText('Meetup photo')).toHaveLength(2);
    });
  });

  it('shows error state when fetch fails', async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error('API Error'));
    render(<PhotoGallery meetupId="1" />);
    await waitFor(() => {
      expect(screen.getByText('Failed to load photos. Please try again later.')).toBeInTheDocument();
    });
  });

  it('shows empty state when no photos', async () => {
    (fetch as jest.Mock).mockResolvedValue({ json: () => Promise.resolve([]) });
    render(<PhotoGallery meetupId="1" />);
    await waitFor(() => {
      expect(screen.getByText('No photos yet.')).toBeInTheDocument();
    });
  });
}); 