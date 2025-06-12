import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegistrationModal from '../components/RegistrationModal';

describe('RegistrationModal', () => {
  it('does not render when open is false', () => {
    render(<RegistrationModal open={false} onClose={jest.fn()} />);
    expect(screen.queryByText('Event Registration')).not.toBeInTheDocument();
  });

  it('renders when open is true', () => {
    render(<RegistrationModal open={true} onClose={jest.fn()} />);
    expect(screen.getByText('Event Registration')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('shows loading and success state on register', async () => {
    render(<RegistrationModal open={true} onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Register'));
    expect(screen.getByText('Registering...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Registration successful!')).toBeInTheDocument();
    });
  });

  it('shows error state if registration fails', async () => {
    // Mock the global Promise to throw for this test
    const originalPromise = global.Promise;
    jest.spyOn(global, 'Promise').mockImplementationOnce((executor: (resolve: () => void, reject: () => void) => void) => {
      executor(() => {}, () => {});
      setTimeout(() => executor(() => {}, () => { throw new Error(); }), 100);
      return new originalPromise((_, reject) => setTimeout(() => reject(), 100));
    });
    render(<RegistrationModal open={true} onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Register'));
    await waitFor(() => {
      expect(screen.getByText('Registration failed. Please try again.')).toBeInTheDocument();
    });
    jest.restoreAllMocks();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<RegistrationModal open={true} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Close registration modal'));
    expect(onClose).toHaveBeenCalled();
  });
}); 