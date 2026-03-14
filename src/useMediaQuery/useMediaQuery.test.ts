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
    vi.stubGlobal('matchMedia', vi.fn().mockImplementation((_query: string) => matchMediaMock(false)));
  });

  it('should initialize with the current match state', () => {
    vi.mocked(window.matchMedia).mockImplementation(() => matchMediaMock(true) as unknown as MediaQueryList);
    const { result } = renderHook(() => useMediaQuery('(max-width: 600px)'));
    expect(result.current).toBe(true);
  });

  it('should update state when media query result changes', () => {
    let handler: ((event: MediaQueryListEvent) => void) | undefined;
    vi.mocked(window.matchMedia).mockImplementation(() => ({
      matches: false,
      addEventListener: (_type: string, h: (event: MediaQueryListEvent) => void) => { handler = h; },
      removeEventListener: vi.fn(),
    } as unknown as MediaQueryList));

    const { result } = renderHook(() => useMediaQuery('(max-width: 600px)'));
    expect(result.current).toBe(false);

    act(() => {
      handler?.({ matches: true } as MediaQueryListEvent);
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
