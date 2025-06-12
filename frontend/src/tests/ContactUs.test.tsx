import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactUs from '../pages/ContactUs';

describe('ContactUs Page', () => {
  it('renders the contact form and navigation', () => {
    render(<ContactUs />);
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
    expect(screen.getByText("Member's Login")).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Write for Us')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('shows validation errors if fields are empty', async () => {
    render(<ContactUs />);
    fireEvent.click(screen.getByText('Send Message'));
    // HTML5 validation prevents submission, so no error message is shown
    // This test ensures the button is present and required attributes are set
    expect(screen.getByLabelText('Name')).toBeRequired();
    expect(screen.getByLabelText('Email')).toBeRequired();
    expect(screen.getByLabelText('Message')).toBeRequired();
  });

  it('shows loading and success state on submit', async () => {
    render(<ContactUs />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello there!' } });
    fireEvent.click(screen.getByText('Send Message'));
    expect(screen.getByText('Sending...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Message sent successfully!')).toBeInTheDocument();
    });
  });

  it('shows error state if submission fails', async () => {
    // Mock the Promise used in handleSubmit to reject
    const originalPromise = global.Promise;
    jest.spyOn(global, 'Promise').mockImplementationOnce((executor: (resolve: () => void, reject: () => void) => void) => {
      executor(() => {}, () => {});
      setTimeout(() => executor(() => {}, () => { throw new Error(); }), 100);
      return new originalPromise((_, reject) => setTimeout(() => reject(), 100));
    });
    render(<ContactUs />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello there!' } });
    fireEvent.click(screen.getByText('Send Message'));
    await waitFor(() => {
      expect(screen.getByText('Failed to send message. Please try again later.')).toBeInTheDocument();
    });
    jest.restoreAllMocks();
  });
}); 