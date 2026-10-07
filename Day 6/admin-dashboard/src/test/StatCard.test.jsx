import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatCard from '../components/StatCard';
import { Users } from 'lucide-react';

describe('StatCard', () => {
  it('renders label and value', () => {
    render(
      <StatCard label="Total Users" value="12,847" delta={12.5} icon={Users} />
    );
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('12,847')).toBeInTheDocument();
  });

  it('shows positive delta with + sign', () => {
    render(<StatCard label="Users" value="100" delta={8.2} icon={Users} />);
    expect(screen.getByText('+8.2%')).toBeInTheDocument();
  });

  it('shows negative delta without + sign', () => {
    render(<StatCard label="Users" value="100" delta={-3.4} icon={Users} />);
    expect(screen.getByText('-3.4%')).toBeInTheDocument();
  });

  it('renders skeletons when loading', () => {
    const { container } = render(
      <StatCard label="Users" value="100" icon={Users} loading />
    );
    // Skeleton has animate-pulse class
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});