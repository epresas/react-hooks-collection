import { useRef, useEffect } from 'react';

/**
 * A hook that stores the previous value of a variable.
 * 
 * Design decisions:
 * - Uses `useRef` to store the value as it doesn't trigger re-renders.
 * - The `useEffect` runs after the component renders, so the ref always holds the "previous" value during the render phase.
 * 
 * @param value - The value to track.
 * @returns The value from the previous render.
 * 
 * @example
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
