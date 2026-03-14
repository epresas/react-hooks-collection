import { renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useDocumentTitle } from './useDocumentTitle';

describe('useDocumentTitle', () => {
  const originalTitle = 'Original Title';

  beforeEach(() => {
    document.title = originalTitle;
  });

  afterEach(() => {
    document.title = originalTitle;
  });

  it('should update the document title', () => {
    const newTitle = 'New Title';
    renderHook(() => useDocumentTitle(newTitle));
    expect(document.title).toBe(newTitle);
  });

  it('should restore the previous title on unmount if restoreOnUnmount is true', () => {
    const newTitle = 'New Title';
    const { unmount } = renderHook(() => useDocumentTitle(newTitle, true));
    expect(document.title).toBe(newTitle);

    unmount();
    expect(document.title).toBe(originalTitle);
  });

  it('should NOT restore the previous title on unmount if restoreOnUnmount is false', () => {
    const newTitle = 'New Title';
    const { unmount } = renderHook(() => useDocumentTitle(newTitle, false));
    expect(document.title).toBe(newTitle);

    unmount();
    expect(document.title).toBe(newTitle);
  });
});
