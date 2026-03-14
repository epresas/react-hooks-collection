import { useState, useEffect, useRef } from 'react';

/**
 * A hook that returns a throttled version of the value.
 * 
 * Design decisions:
 * - Difference from debounce: Throttling ensures the value updates at most once every `interval`.
 * - Uses `setTimeout` and timestamps for precision.
 * 
 * @param value - The value to throttle.
 * @param interval - The throttle interval in ms. Default: 200.
 */
export function useThrottle<T>(value: T, interval = 200): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const now = Date.now();
    const remainingTime = interval - (now - lastExecuted.current);

    if (remainingTime <= 0) {
      setThrottledValue(value);
      lastExecuted.current = now;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setThrottledValue(value);
        lastExecuted.current = Date.now();
      }, remainingTime);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, interval]);

  return throttledValue;
}
