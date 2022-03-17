import { render, screen } from '@testing-library/react';
import App from './App';

test('renders memo-game', () => {
  render(<App />);
  const countElement = screen.getByText(/clicks:/i);
  expect(countElement).toBeInTheDocument();
});
