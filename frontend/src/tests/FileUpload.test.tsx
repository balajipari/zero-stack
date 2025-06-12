import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FileUpload from '../components/FileUpload';

// Mock fetch
global.fetch = jest.fn();

describe('FileUpload', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the file input', () => {
    render(<FileUpload meetupId="1" onUpload={jest.fn()} />);
    expect(screen.getByLabelText('Upload Photo')).toBeInTheDocument();
  });

  it('shows loading and success state on upload', async () => {
    (fetch as jest.Mock).mockResolvedValue({});
    render(<FileUpload meetupId="1" onUpload={jest.fn()} />);
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText('Upload Photo') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByText('Uploading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Photo uploaded successfully!')).toBeInTheDocument();
    });
  });

  it('shows error state if upload fails', async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error('API Error'));
    render(<FileUpload meetupId="1" onUpload={jest.fn()} />);
    const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText('Upload Photo') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });
    await waitFor(() => {
      expect(screen.getByText('Failed to upload photo. Please try again.')).toBeInTheDocument();
    });
  });
}); 