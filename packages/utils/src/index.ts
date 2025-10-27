import fetch from 'cross-fetch';
import type { Health } from '@orlix/types';

export type RequestOptions = {
  token?: string;
};

export async function apiFetch<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {})
    }
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Request failed: ${response.status} ${body}`);
  }

  return (await response.json()) as T;
}

export async function waitForHealth(endpoint: string): Promise<boolean> {
  try {
    const body = await apiFetch<Health>(endpoint);
    return body.status === 'ok';
  } catch (error) {
    return false;
  }
}
