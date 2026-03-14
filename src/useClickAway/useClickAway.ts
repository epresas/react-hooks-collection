import { useEffect, useRef, RefObject } from 'react';

/**
 * A hook that detects clicks away from a target element.
 * 
 * Design decisions:
 * - Uses a ref for the callback to prevent stale closures without re-attaching listeners.
 * - Handles both mouse and touch events for consistent behavior across devices.
 * 
 * @param callback - Function to execute when clicking away.
 * @returns A ref object to be attached to the target element.
 */
export function useClickAway<T extends HTMLElement>(
  callback: () => void
): RefObject<T> {
  const ref = useRef<T>(null);
  const savedHandler = useRef(callback);

  useEffect(() => {
    savedHandler.current = callback;
  }, [callback]);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const element = ref.current;
      if (!element || element.contains(event.target as Node)) {
        return;
      }
      savedHandler.current();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, []);

  return ref as RefObject<T>;
}
