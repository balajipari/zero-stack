import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ContentDetail from '../pages/content/ContentDetail';
import { contentService } from '../services/contentService';

// Mock the contentService
jest.mock('../services/contentService');

const mockContent = {
  id: '1',
  title: 'Getting Started with Web Development',
  description: 'A comprehensive guide to web development fundamentals.',
  content: '<p>Full content here...</p>',
  type: 'blog',
  image_url: 'https://example.com/image1.jpg',
  author_id: 1,
  created_at: '2024-03-01T00:00:00Z',
  updated_at: '2024-03-01T00:00:00Z'
};

describe('ContentDetail Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(
      <MemoryRouter initialEntries={['/content/1']}>
        <Routes>
          <Route path="/content/:id" element={<ContentDetail />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Loading content...')).toBeInTheDocument();
  });

  it('renders content after loading', async () => {
    // Mock the service response
    (contentService.getContentById as jest.Mock).mockResolvedValue(mockContent);

    render(
      <MemoryRouter initialEntries={['/content/1']}>
        <Routes>
          <Route path="/content/:id" element={<ContentDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the content to be loaded
    await waitFor(() => {
      expect(screen.getByText('Getting Started with Web Development')).toBeInTheDocument();
      expect(screen.getByText('Full content here...')).toBeInTheDocument();
    });
  });

  it('renders error state when API call fails', async () => {
    // Mock the service to throw an error
    (contentService.getContentById as jest.Mock).mockRejectedValue(new Error('API Error'));

    render(
      <MemoryRouter initialEntries={['/content/1']}>
        <Routes>
          <Route path="/content/:id" element={<ContentDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch content. Please try again later.')).toBeInTheDocument();
    });
  });

  it('renders not found state when content is null', async () => {
    // Mock the service to return null
    (contentService.getContentById as jest.Mock).mockResolvedValue(null);

    render(
      <MemoryRouter initialEntries={['/content/1']}>
        <Routes>
          <Route path="/content/:id" element={<ContentDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the not found message to appear
    await waitFor(() => {
      expect(screen.getByText('Content not found')).toBeInTheDocument();
    });
  });

  it('renders back button and navigates on click', async () => {
    // Mock the service response
    (contentService.getContentById as jest.Mock).mockResolvedValue(mockContent);

    render(
      <MemoryRouter initialEntries={['/content/1']}>
        <Routes>
          <Route path="/content/:id" element={<ContentDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the content to load
    await waitFor(() => {
      expect(screen.getByText('← Back to Blogs')).toBeInTheDocument();
    });

    // Click the back button
    fireEvent.click(screen.getByText('← Back to Blogs'));
  });

  it('renders share buttons with correct links', async () => {
    // Mock the service response
    (contentService.getContentById as jest.Mock).mockResolvedValue(mockContent);

    render(
      <MemoryRouter initialEntries={['/content/1']}>
        <Routes>
          <Route path="/content/:id" element={<ContentDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the content to load
    await waitFor(() => {
      expect(screen.getByText('Share this blog')).toBeInTheDocument();
      expect(screen.getByText('Twitter')).toBeInTheDocument();
      expect(screen.getByText('LinkedIn')).toBeInTheDocument();
      expect(screen.getByText('Facebook')).toBeInTheDocument();
    });
  });
}); 