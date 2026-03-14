import { useState, useCallback } from 'react';

/**
 * A hook that provides a boolean state and a function to toggle it.
 * 
 * Design decisions:
 * - Uses `useCallback` for the toggle function to ensure stable identity, preventing unnecessary re-renders of child components.
 * - Supports an optional explicit value in the toggle function for "set" behavior.
 * 
 * @param initialValue - The initial boolean state. Defaults to `false`.
 * @returns A tuple containing the boolean state and a toggle function.
 * 
 * @example
 * const [isVisible, toggleVisible] = useToggle(false);
 * // toggleVisible() -> flips state
 * // toggleVisible(true) -> forces true
 */
export function useToggle(
  initialValue = false
): [boolean, (value?: boolean) => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback((newValue?: boolean) => {
    setValue((prev) => (typeof newValue === 'boolean' ? newValue : !prev));
  }, []);

  return [value, toggle];
}
