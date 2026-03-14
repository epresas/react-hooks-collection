import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCopyToClipboard } from './useCopyToClipboard';

describe('useCopyToClipboard', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it('should initialize with idle state', () => {
    const { result } = renderHook(() => useCopyToClipboard());
    expect(result.current.state).toBe('idle');
    expect(result.current.isCopied).toBe(false);
  });

  it('should copy text and change state to copied', async () => {
    const { result } = renderHook(() => useCopyToClipboard());
    
    await act(async () => {
      await result.current.copy('test text');
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text');
    expect(result.current.state).toBe('copied');
    expect(result.current.isCopied).toBe(true);
  });

  it('should reset state to idle after delay', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useCopyToClipboard(100));
    
    await act(async () => {
      await result.current.copy('test text');
    });

    expect(result.current.state).toBe('copied');

    act(() => {
      vi.advanceTimersByTime(101);
    });

    expect(result.current.state).toBe('idle');
    vi.useRealTimers();
  });

  it('should handle errors', async () => {
    (navigator.clipboard.writeText as any).mockRejectedValueOnce(new Error('Failed'));
    const { result } = renderHook(() => useCopyToClipboard());
    
    await act(async () => {
      await result.current.copy('test text');
    });

    expect(result.current.state).toBe('error');
  });
});
