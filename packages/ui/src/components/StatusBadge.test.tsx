import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { StatusBadge } from './StatusBadge.js';

describe('StatusBadge', () => {
  it('renders the status label in uppercase', () => {
    const output = renderToString(<StatusBadge status="running" />);
    expect(output).toContain('RUNNING');
  });
});
