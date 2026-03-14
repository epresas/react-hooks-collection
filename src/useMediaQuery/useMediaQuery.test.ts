import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMediaQuery } from './useMediaQuery';

describe('useMediaQuery', () => {
  const matchMediaMock = (matches: boolean) => ({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(), // Old browser support
    removeListener: vi.fn(),
  });

  beforeEach(() => {
    vi.stubGlobal('matchMedia', vi.fn().mockImplementation(query => matchMediaMock(false)));
  });

  it('should initialize with the current match state', () => {
    (window.matchMedia as any).mockImplementation(() => matchMediaMock(true));
    const { result } = renderHook(() => useMediaQuery('(max-width: 600px)'));
    expect(result.current).toBe(true);
  });

  it('should update state when media query result changes', () => {
    let handler: any;
    (window.matchMedia as any).mockImplementation(() => ({
      matches: false,
      addEventListener: (type: string, h: any) => { handler = h; },
      removeEventListener: vi.fn(),
    }));

    const { result } = renderHook(() => useMediaQuery('(max-width: 600px)'));
    expect(result.current).toBe(false);

    act(() => {
      handler({ matches: true });
    });

    expect(result.current).toBe(true);
  });

  it('should handle query changes', () => {
    renderHook(({ query }) => useMediaQuery(query), {
      initialProps: { query: '(min-width: 100px)' }
    });
    
    expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 100px)');
  });
});
