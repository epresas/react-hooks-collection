import { useEffect, useRef } from 'react';

/**
 * A hook that synchronizes the document title with a provided string.
 * 
 * Design decisions:
 * - Stores the original title in a ref to properly restore it if `restoreOnUnmount` is true.
 * - Updates the title in `useEffect` to ensure it happens after the render.
 * 
 * @param title - The new document title.
 * @param restoreOnUnmount - Whether to restore the previous title when the component unmounts. Default: false.
 * 
 * @example
 * useDocumentTitle("Settings | MyApp", true);
 */
export function useDocumentTitle(title: string, restoreOnUnmount = false): void {
  const previousTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    const original = previousTitle.current;
    return () => {
      if (restoreOnUnmount) {
        document.title = original;
      }
    };
  }, [restoreOnUnmount]);
}
