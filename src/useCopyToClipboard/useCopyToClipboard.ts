import { useState, useCallback } from 'react';

export type CopyState = 'idle' | 'copied' | 'error';

/**
 * A hook for copying text to the clipboard with status feedback.
 * 
 * Design decisions:
 * - Uses the modern `navigator.clipboard` API.
 * - Provides a clear status ('idle', 'copied', 'error') for UI feedback.
 * - Automatically resets the status after a delay.
 * 
 * @param resetDelay - Time in ms before state reverts to 'idle'. Default: 2000.
 */
export function useCopyToClipboard(resetDelay = 2000): {
  copy: (text: string) => Promise<void>;
  state: CopyState;
  isCopied: boolean;
} {
  const [state, setState] = useState<CopyState>('idle');

  const copy = useCallback(async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setState('copied');
    } catch (error) {
      console.error('Copy failed:', error);
      setState('error');
    } finally {
      setTimeout(() => setState('idle'), resetDelay);
    }
  }, [resetDelay]);

  return { copy, state, isCopied: state === 'copied' };
}
