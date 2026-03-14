# useIntersectionObserver

Custom hook to detect when an element enters or leaves the viewport (or a specific container).

### The problem it solves
Logics like infinite scroll, on-scroll animations, or lazy loading images require knowing if an element is visible. Doing this by listening to the `scroll` event is expensive for the CPU. `IntersectionObserver` is the high-performance native API designed for this problem.

### Design Decisions
- **Performance Optimization**: The hook delegates visibility calculations to the browser, avoiding manual UI thrashing.
- **Freeze Once Visible**: An exclusive option for cases like lazy loading, where once the element is visible, we no longer need to observe it, immediately freeing up resources.
- **Strict TypeScript**: Full typing for both options and the returned `entry` object.

### Real-World Example: Lazy Loading Image
```tsx
function LazyImage({ src, alt }) {
  const [ref, entry] = useIntersectionObserver({
    freezeOnceVisible: true,
    rootMargin: '200px', // Starts loading 200px before entering the viewport
  });

  const isVisible = !!entry?.isIntersecting;

  return (
    <div ref={ref} style={{ minHeight: '300px', background: '#f0f0f0' }}>
      {isVisible && <img src={src} alt={alt} style={{ width: '100%' }} />}
    </div>
  );
}
```

### Edge Cases Covered
- Automatic cleanup on unmount (disconnect).
- Support for observing elements relative to a specific `root` (not just the viewport).
- Robustness against changing observation parameters.
