import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useWindowSize } from './useWindowSize';

describe('useWindowSize', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('innerWidth', 1024);
    vi.stubGlobal('innerHeight', 768);
  });

  it('should initialize with current window size', () => {
    const { result } = renderHook(() => useWindowSize());
    expect(result.current).toEqual({ width: 1024, height: 768 });
  });

  it('should update size after debounce on resize', () => {
    const { result } = renderHook(() => useWindowSize());
    
    // Simulate resize
    vi.stubGlobal('innerWidth', 500);
    vi.stubGlobal('innerHeight', 500);
    window.dispatchEvent(new Event('resize'));

    // Should not update immediately due to debounce
    expect(result.current).toEqual({ width: 1024, height: 768 });

    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(result.current).toEqual({ width: 500, height: 500 });
  });

  it('should clear previous timeout if multiple resize events occur', () => {
    const { result } = renderHook(() => useWindowSize());
    
    vi.stubGlobal('innerWidth', 500);
    window.dispatchEvent(new Event('resize'));

    act(() => {
      vi.advanceTimersByTime(100);
    });

    vi.stubGlobal('innerWidth', 800);
    window.dispatchEvent(new Event('resize'));

    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(result.current.width).toBe(800);
  });
});
