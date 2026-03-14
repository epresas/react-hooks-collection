import { useState, useEffect, useCallback } from 'react';

export type AsyncStatus = 'idle' | 'pending' | 'success' | 'error';

export interface AsyncState<T> {
  status: AsyncStatus;
  data: T | null;
  error: Error | null;
}

/**
 * A hook for handling asynchronous operations with full lifecycle state and race condition prevention.
 * 
 * Design decisions:
 * - Uses `AbortController` to handle signal-based cancellation.
 * - Prevents "state update on unmounted component" errors by checking signal status.
 * - Centralizes async state (idle/pending/success/error) to avoid manual flag management.
 * 
 * @param asyncFn - A function that returns a promise. It receives an AbortSignal as its first argument.
 * @param deps - Dependency array for re-triggering the effect. Defaults to `[]`.
 * 
 * @example
 * const { status, data, error } = useAsync((signal) => fetchUser(id, signal), [id]);
 */
export function useAsync<T>(
  asyncFn: (signal: AbortSignal) => Promise<T>,
  deps: React.DependencyList = []
): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    status: 'idle',
    data: null,
    error: null,
  });

  const execute = useCallback(async (signal: AbortSignal) => {
    setState({ status: 'pending', data: null, error: null });

    try {
      const data = await asyncFn(signal);
      if (!signal.aborted) {
        setState({ status: 'success', data, error: null });
      }
    } catch (error) {
      if (!signal.aborted) {
        setState({
          status: 'error',
          data: null,
          error: error instanceof Error ? error : new Error(String(error)),
        });
      }
    }
  }, [asyncFn]);

  useEffect(() => {
    const controller = new AbortController();
    execute(controller.signal);

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
