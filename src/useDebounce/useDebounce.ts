import { useState, useEffect, useRef } from 'react';

/**
 * Delays updating a value until a specified time has passed without changes.
 * 
 * Design decisions:
 * - Uses a ref for the timeout to prevent stale closure issues.
 * - Cleans up the timeout on unmount or value change to avoid memory leaks.
 * - Uses a generic <T> to ensure full type inference at the call site.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
}
