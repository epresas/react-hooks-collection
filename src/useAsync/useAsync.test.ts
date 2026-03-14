import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useAsync } from './useAsync';

describe('useAsync', () => {
  it('should initialize in pending state', async () => {
    const promise = new Promise((resolve) => setTimeout(() => resolve('data'), 100));
    const { result } = renderHook(() => useAsync(() => promise));

    expect(result.current.status).toBe('pending');
    
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.data).toBe('data');
  });

  it('should handle success', async () => {
    const { result } = renderHook(() => useAsync(() => Promise.resolve('success')));

    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.data).toBe('success');
    expect(result.current.error).toBeNull();
  });

  it('should handle error', async () => {
    const error = new Error('fail');
    const { result } = renderHook(() => useAsync(() => Promise.reject(error)));

    await waitFor(() => expect(result.current.status).toBe('error'));
    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeNull();
  });

  it('should abort and not update state if unmounted', async () => {
    let resolved = false;
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolved = true;
        resolve('data');
      }, 50);
    });

    const { unmount, result } = renderHook(() => useAsync(() => promise));
    
    unmount();
    
    // Wait for the original timer to expire
    await new Promise(r => setTimeout(r, 60));
    
    expect(resolved).toBe(true);
    // State should still be 'pending' from the last render before unmount
    expect(result.current.status).toBe('pending');
  });

  it('should re-run when deps change', async () => {
    const fetchMock = vi.fn().mockResolvedValue('data');
    const { rerender } = renderHook(({ id }) => useAsync(() => fetchMock(id), [id]), {
      initialProps: { id: 1 },
    });

    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(1));

    rerender({ id: 2 });
    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(2));
  });
});
