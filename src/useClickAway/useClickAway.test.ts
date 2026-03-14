import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useClickAway } from './useClickAway';

describe('useClickAway', () => {
  it('should call the callback when clicking outside the element', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useClickAway<HTMLDivElement>(callback));
    
    // Simulate attaching ref to an element
    const element = document.createElement('div');
    Object.defineProperty(result.current, 'current', { value: element });

    // Click outside
    document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should NOT call the callback when clicking inside the element', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useClickAway<HTMLDivElement>(callback));
    
    const element = document.createElement('div');
    Object.defineProperty(result.current, 'current', { value: element });

    // Click inside
    const insideElement = document.createElement('span');
    element.appendChild(insideElement);
    
    const clickEvent = new MouseEvent('mousedown', { bubbles: true });
    Object.defineProperty(clickEvent, 'target', { value: insideElement });
    
    element.dispatchEvent(clickEvent);
    // Since we mock the event on the element, the document listener will catch it
    document.dispatchEvent(clickEvent);
    
    expect(callback).not.toHaveBeenCalled();
  });
});
