import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@orlix/utils', () => ({
  waitForHealth: vi.fn().mockResolvedValue(true)
}));

import App from './App';

describe('App', () => {
  it('displays API status', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('online');
    });
  });
});
