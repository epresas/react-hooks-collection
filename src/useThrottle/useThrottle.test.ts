import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useThrottle } from './useThrottle';

describe('useThrottle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 1, 1, 12, 0, 0));
  });

  it('should update immediately if interval has passed', () => {
    const { result, rerender } = renderHook(({ value }) => useThrottle(value, 200), {
      initialProps: { value: 0 },
    });

    expect(result.current).toBe(0);

    // Skip time manually
    act(() => {
      vi.advanceTimersByTime(250);
      vi.setSystemTime(new Date(2024, 1, 1, 12, 0, 0, 250));
    });

    // Re-render with new value. The effect should trigger state update.
    act(() => {
      rerender({ value: 1 });
    });

    // Run any pending effects/states
    act(() => {
        vi.runAllTimers();
    });

    expect(result.current).toBe(1);
  });

  it('should throttle updates', () => {
    const { result, rerender } = renderHook(({ value }) => useThrottle(value, 200), {
      initialProps: { value: 0 },
    });

    act(() => {
      rerender({ value: 1 });
    });
    expect(result.current).toBe(0); // Should still be 0

    act(() => {
      vi.advanceTimersByTime(201);
      vi.setSystemTime(new Date(2024, 1, 1, 12, 0, 0, 201));
    });

    act(() => {
        vi.runAllTimers();
    });

    expect(result.current).toBe(1);
  });
});
