import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

// Mocking the fetch function to avoid actual network requests
global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

test('renders population count header', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/Submit population count/i);
  expect(headerElement).toBeInTheDocument();
});

test('handles number submission', async () => {
  fetch.mockResolvedValueOnce({ ok: true });

  const { getByPlaceholderText, getByText } = render(<App />);
  const inputElement = getByPlaceholderText(/Enter a number/i);
  const submitButton = getByText(/Submit count/i);

  // Enter a number and submit
  userEvent.type(inputElement, '10');
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
