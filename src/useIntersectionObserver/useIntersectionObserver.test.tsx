import React from 'react';
import { render, renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useIntersectionObserver } from './useIntersectionObserver';

describe('useIntersectionObserver', () => {
  const observe = vi.fn();
  const disconnect = vi.fn();
  const unobserve = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Regular function can be used as a constructor
    const MockObserver = vi.fn(function() {
      return {
        observe,
        disconnect,
        unobserve,
      };
    });
    
    vi.stubGlobal('IntersectionObserver', MockObserver);
  });

  it('should return a ref and null entry initially', () => {
    const { result } = renderHook(() => useIntersectionObserver());
    expect(result.current[0].current).toBeNull();
    expect(result.current[1]).toBeNull();
  });

  it('should initialize the observer when element is rendered', () => {
    function TestComponent() {
      const [ref] = useIntersectionObserver({ threshold: 0.5 });
      return <div ref={ref as React.RefObject<HTMLDivElement>}>Test Element</div>;
    }

    render(<TestComponent />);

    expect(vi.mocked(IntersectionObserver)).toHaveBeenCalled();
    expect(observe).toHaveBeenCalled();
  });
});
