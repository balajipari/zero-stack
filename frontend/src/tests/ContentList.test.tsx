import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import ContentList from '../pages/content/ContentList';
import { contentService } from '../services/contentService';

// Mock the contentService
jest.mock('../services/contentService');

const mockContent = [
  {
    id: '1',
    title: 'Getting Started with Web Development',
    description: 'A comprehensive guide to web development fundamentals.',
    content: '<p>Full content here...</p>',
    type: 'blog',
    image_url: 'https://example.com/image1.jpg',
    author_id: 1,
    created_at: '2024-03-01T00:00:00Z',
    updated_at: '2024-03-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Case Study: Successful Startup Journey',
    description: 'How one startup achieved success through strategic planning.',
    content: '<p>Full content here...</p>',
    type: 'case-study',
    image_url: 'https://example.com/image2.jpg',
    author_id: 2,
    created_at: '2024-03-02T00:00:00Z',
    updated_at: '2024-03-02T00:00:00Z'
  }
];

describe('ContentList Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(
      <MemoryRouter>
        <ContentList />
      </MemoryRouter>
    );
    expect(screen.getByText('Loading content...')).toBeInTheDocument();
  });

  it('renders content after loading', async () => {
    // Mock the service response
    (contentService.getContentByType as jest.Mock).mockResolvedValue(mockContent);

    render(
      <MemoryRouter>
        <ContentList />
      </MemoryRouter>
    );

    // Wait for the content to be loaded
    await waitFor(() => {
      expect(screen.getByText('Getting Started with Web Development')).toBeInTheDocument();
      expect(screen.getByText('Case Study: Successful Startup Journey')).toBeInTheDocument();
    });
  });

  it('renders error state when API call fails', async () => {
    // Mock the service to throw an error
    (contentService.getContentByType as jest.Mock).mockRejectedValue(new Error('API Error'));

    render(
      <MemoryRouter>
        <ContentList />
      </MemoryRouter>
    );

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch content. Please try again later.')).toBeInTheDocument();
    });
  });

  it('renders content type navigation correctly', async () => {
    // Mock the service response
    (contentService.getContentByType as jest.Mock).mockResolvedValue(mockContent);

    render(
      <MemoryRouter>
        <ContentList />
      </MemoryRouter>
    );

    // Wait for the content to load
    await waitFor(() => {
      expect(screen.getByText('Blogs')).toBeInTheDocument();
      expect(screen.getByText('Case Studies')).toBeInTheDocument();
      expect(screen.getByText('Podcasts')).toBeInTheDocument();
    });
  });

  it('renders empty state when no content is available', async () => {
    // Mock the service to return empty array
    (contentService.getContentByType as jest.Mock).mockResolvedValue([]);

    render(
      <MemoryRouter>
        <ContentList />
      </MemoryRouter>
    );

    // Wait for the empty state to appear
    await waitFor(() => {
      expect(screen.getByText('No content found')).toBeInTheDocument();
    });
  });
}); 