import { useState, useEffect } from 'react';

/**
 * A hook for handling CSS media queries in JavaScript.
 * 
 * Design decisions:
 * - Uses the native `matchMedia` API for efficiency instead of resize listeners.
 * - Supports SSR by checking `window` availability.
 * 
 * @param query - The CSS media query to match.
 * @returns `true` if the query matches, `false` otherwise.
 * 
 * @example
 * const isDark = useMediaQuery('(prefers-color-scheme: dark)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    // Modern browsers use addEventListener, older ones use addListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
    } else {
      (mediaQuery as any).addListener(handler);
    }

    // Set initial value in case it changed between initializer and effect
    setMatches(mediaQuery.matches);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handler);
      } else {
        (mediaQuery as any).removeListener(handler);
      }
    };
  }, [query]);

  return matches;
}
