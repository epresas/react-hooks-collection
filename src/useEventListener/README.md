# useEventListener

Custom hook to manage native event listeners with automatic cleanup and stale-closure prevention.

### The problem it solves
Adding manual event listeners (`window.addEventListener`) in React is a constant source of bugs:
1. **Memory Leaks**: Forgetting `removeEventListener`.
2. **Stale Closures**: The listener uses variables from a previous render because the effect wasn't re-run when the handler changed.
3. **Complexity**: Verbose to write in every component.

### Design Decisions
- **Latest Handler Ref**: We use a Ref to store the handler function. This allows the component to use the latest handler without needing to unbind and re-bind the native browser event every time the function changes (which is expensive).
- **Generic Types**: Supports native TypeScript event types for `window`, `document`, and HTML elements, providing full autocomplete.
- **Window by Default**: Assumes `window` by default, which is the most common use case (global clicks, scrolls, resizes).

### Real-World Example: Mouse Tracker for Image Zoom
```tsx
function ImageZoom({ src }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Automatic cleanup and stale-closure safe
  useEventListener('mousemove', (e) => {
    setCoords({ x: e.clientX, y: e.clientY });
  });

  return (
    <div className="zoom-view">
      <img src={src} style={{ transformOrigin: `${coords.x}px ${coords.y}px` }} />
    </div>
  );
}
```

### Edge Cases Covered
- Guaranteed cleanup on unmount.
- Support for optional parameters (`capture`, `passive`, etc.).
- Robustness against dynamic changes of the target element.
