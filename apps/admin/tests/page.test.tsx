import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import HomePage from '../app/page';

vi.mock('../components/ProjectList', () => ({
  ProjectList: () => <div data-testid="project-list">mocked</div>
}));

describe('HomePage', () => {
  it('renders hero and project section', () => {
    render(<HomePage />);

    expect(screen.getByText('Bienvenue sur Orlix Admin')).toBeInTheDocument();
    expect(screen.getByTestId('project-list')).toBeInTheDocument();
  });
});
