import { describe, it, expect } from 'vitest';
import { formatDate } from '../utils/format';

describe('formatDate', () => {
  it('formats ISO date to readable string', () => {
    const result = formatDate('2026-01-15T10:00:00');
    expect(result).toContain('Jan');
    expect(result).toContain('2026');
  });
});