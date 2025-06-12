import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HowToGuides from '../pages/HowToGuides';
import { guideService } from '../services/guideService';

// Mock the guideService
jest.mock('../services/guideService');

const mockGuides = [
  {
    id: 1,
    title: 'Getting Started with Tech',
    description: 'A beginner-friendly guide to start your tech journey',
    content: 'Full content here...',
    featured: false,
    created_at: '2024-03-20T00:00:00Z',
    updated_at: '2024-03-20T00:00:00Z'
  },
  {
    id: 2,
    title: 'Advanced Development',
    description: 'Take your skills to the next level',
    content: 'Full content here...',
    featured: true,
    created_at: '2024-03-20T00:00:00Z',
    updated_at: '2024-03-20T00:00:00Z'
  }
];

describe('HowToGuides Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Mock the service responses
    (guideService.getAllGuides as jest.Mock).mockResolvedValue(mockGuides);
    (guideService.getFeaturedGuides as jest.Mock).mockResolvedValue([mockGuides[1]]);
  });

  it('renders loading state initially', () => {
    render(<HowToGuides />);
    expect(screen.getByText('Loading guides...')).toBeInTheDocument();
  });

  it('renders guides after loading', async () => {
    render(<HowToGuides />);
    
    // Wait for the guides to load
    await waitFor(() => {
      expect(screen.getByText('Getting Started with Tech')).toBeInTheDocument();
    });

    // Check if all guides are rendered
    expect(screen.getByText('Getting Started with Tech')).toBeInTheDocument();
    expect(screen.getByText('A beginner-friendly guide to start your tech journey')).toBeInTheDocument();
    
    // Check if featured guide is rendered
    expect(screen.getByText('Advanced Development')).toBeInTheDocument();
    expect(screen.getByText('Take your skills to the next level')).toBeInTheDocument();
  });

  it('renders error state when API fails', async () => {
    // Mock API failure
    (guideService.getAllGuides as jest.Mock).mockRejectedValue(new Error('API Error'));
    
    render(<HowToGuides />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load guides. Please try again later.')).toBeInTheDocument();
    });
  });

  it('renders main sections correctly', async () => {
    render(<HowToGuides />);
    
    await waitFor(() => {
      // Check main heading
      expect(screen.getByText('How-to-Guides')).toBeInTheDocument();
      
      // Check section headings
      expect(screen.getByText('Guides')).toBeInTheDocument();
      expect(screen.getByText('Featured Guides')).toBeInTheDocument();
      
      // Check CTA section
      expect(screen.getByText('Ready to Dive Deeper?')).toBeInTheDocument();
      expect(screen.getByText('Join Now')).toBeInTheDocument();
    });
  });

  it('renders navigation links correctly', () => {
    render(<HowToGuides />);
    
    expect(screen.getByText("Member's Login")).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Write for Us')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });
}); 