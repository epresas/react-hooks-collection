import { useState, useEffect, useRef, RefObject } from 'react';

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

/**
 * A hook for tracking the intersection of an element with its parent or the viewport.
 * 
 * Design decisions:
 * - Uses the native `IntersectionObserver` API.
 * - Supports "freeze once visible" for one-time triggers (like lazy loading).
 * - Centralizes observer logic to prevent redundant observer instances.
 * 
 * @param options - IntersectionObserver configuration.
 * @returns A tuple containing a ref for the target element and the latest entry.
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): [RefObject<HTMLElement | null>, IntersectionObserverEntry | null] {
  const { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false } = options;
  const ref = useRef<HTMLElement>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    const element = ref.current;
    if (!element || frozen || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([newEntry]) => {
        setEntry(newEntry);
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);
    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, frozen]);

  return [ref, entry];
}
