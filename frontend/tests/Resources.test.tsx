import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Resources from '../src/pages/Resources';

describe('Resources Page', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  it('renders the main heading', () => {
    renderWithRouter(<Resources />);
    expect(screen.getByText('Resources')).toBeInTheDocument();
  });

  it('renders all resource categories', () => {
    renderWithRouter(<Resources />);
    expect(screen.getByText('Blog Posts')).toBeInTheDocument();
    expect(screen.getByText('Case Studies')).toBeInTheDocument();
    expect(screen.getByText('Podcasts')).toBeInTheDocument();
  });

  it('renders the featured resources section', () => {
    renderWithRouter(<Resources />);
    expect(screen.getByText('Featured Resources')).toBeInTheDocument();
  });

  it('renders the call to action section', () => {
    renderWithRouter(<Resources />);
    expect(screen.getByText('Ready to Dive Deeper?')).toBeInTheDocument();
    expect(screen.getByText('Join Now')).toBeInTheDocument();
  });

  it('has proper navigation links', () => {
    renderWithRouter(<Resources />);
    expect(screen.getByText("Member's Login")).toHaveAttribute('href', '/login');
    expect(screen.getByText('Contact')).toHaveAttribute('href', '/contact');
    expect(screen.getByText('Write for Us')).toHaveAttribute('href', '/write');
    expect(screen.getByText('About')).toHaveAttribute('href', '/about');
  });

  it('has proper resource category links', () => {
    renderWithRouter(<Resources />);
    expect(screen.getByText('Browse Posts →')).toHaveAttribute('href', '/blog');
    expect(screen.getByText('View Cases →')).toHaveAttribute('href', '/case-studies');
    expect(screen.getByText('Listen Now →')).toHaveAttribute('href', '/podcasts');
  });
}); 