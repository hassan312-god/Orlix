import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProjectList } from '../components/ProjectList';

describe('ProjectList', () => {
  it('renders demo projects', () => {
    render(<ProjectList />);
    expect(screen.getByText('Launch landing page')).toBeInTheDocument();
    expect(screen.getByText('Voice assistant')).toBeInTheDocument();
  });
});
