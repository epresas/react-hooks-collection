import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useEventListener } from './useEventListener';

describe('useEventListener', () => {
  it('should call the handler when the event is triggered on window', () => {
    const handler = vi.fn();
    renderHook(() => useEventListener('click', handler));

    window.dispatchEvent(new MouseEvent('click'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should call the handler when the event is triggered on a specific element', () => {
    const handler = vi.fn();
    const element = document.createElement('div');
    renderHook(() => useEventListener('mouseenter', handler, element));

    element.dispatchEvent(new MouseEvent('mouseenter'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should update the handler without re-attaching the listener', () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();
    const addSpy = vi.spyOn(window, 'addEventListener');
    
    const { rerender } = renderHook(({ h }) => useEventListener('click', h), {
      initialProps: { h: handler1 }
    });

    rerender({ h: handler2 });
    
    window.dispatchEvent(new MouseEvent('click'));
    
    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).toHaveBeenCalledTimes(1);
    // Should have only been called once on initial mount
    expect(addSpy).toHaveBeenCalledTimes(1);
    
    addSpy.mockRestore();
  });

  it('should cleanup on unmount', () => {
    const handler = vi.fn();
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useEventListener('click', handler));

    unmount();
    expect(removeSpy).toHaveBeenCalled();
    
    removeSpy.mockRestore();
  });
});
