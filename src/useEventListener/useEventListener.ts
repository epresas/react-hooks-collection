import { useEffect, useRef } from 'react';

/**
 * A hook for managing event listeners with automatic cleanup.
 * 
 * Design decisions:
 * - Uses a ref for the handler to prevent stale closures.
 * - Supports window, document, and custom HTML elements.
 * - Strongly typed using TypeScript's event maps.
 * 
 * @param eventName - The name of the event (e.g., 'click', 'scroll').
 * @param handler - The callback function.
 * @param element - The target element (window, document, or HTMLElement). Defaults to `window`.
 * @param options - Optional event listener options.
 */
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element: Window | Document | HTMLElement | null = typeof window !== 'undefined' ? window : null,
  options?: boolean | AddEventListenerOptions
): void {
  // Use a ref to store the handler so the effect doesn't need to re-run
  // every time the handler function (which is likely a closure) changes.
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!element || !element.addEventListener) return;

    const eventListener = (event: Event) => savedHandler.current(event as WindowEventMap[K]);

    element.addEventListener(eventName, eventListener, options);

    return () => {
      element.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, element, options]);
}
