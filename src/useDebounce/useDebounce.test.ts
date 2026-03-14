import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce the value update', () => {
    let value = 'initial';
    const { result, rerender } = renderHook(() => useDebounce(value, 500));

    value = 'updated';
    rerender();

    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(result.current).toBe('updated');
  });

  it('should cancel the timeout if value changes before the delay finishes', () => {
    let value = 'initial';
    const { result, rerender } = renderHook(() => useDebounce(value, 500));

    value = 'update 1';
    rerender();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    value = 'update 2';
    rerender();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe('update 2');
  });
});
