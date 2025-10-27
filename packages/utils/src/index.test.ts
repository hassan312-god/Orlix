import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('cross-fetch', () => {
  return {
    default: vi.fn()
  };
});

// eslint-disable-next-line import/first
import fetch from 'cross-fetch';
// eslint-disable-next-line import/first
import { apiFetch, waitForHealth } from './index.js';

describe('@orlix/utils', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('wraps fetch and returns JSON', async () => {
    const mockedFetch = fetch as unknown as ReturnType<typeof vi.fn>;
    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ value: 1 })
    });

    const result = await apiFetch<{ value: number }>('https://example.com');

    expect(result.value).toBe(1);
  });

  it('returns false when health endpoint fails', async () => {
    const mockedFetch = fetch as unknown as ReturnType<typeof vi.fn>;
    mockedFetch.mockResolvedValue({
      ok: false,
      text: async () => 'error'
    });

    const healthy = await waitForHealth('https://example.com/health');

    expect(healthy).toBe(false);
  });
});
