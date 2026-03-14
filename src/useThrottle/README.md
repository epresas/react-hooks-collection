# useThrottle

Custom hook that guarantees a value is updated at most once every specified time interval.

### The problem it solves
Unlike `useDebounce` (which waits for you to stop doing something), `useThrottle` allows an action to happen rhythmically. It is essential for handling high-frequency events like `scroll`, `mousemove`, or `resize` when you need the UI to respond *while* the user interacts, but in a controlled manner.

### Design Decisions
- **Execution Guarantee**: Unlike a naive implementation, this hook guarantees that the last value received during the throttle period is captured and applied when the interval ends, preventing the final state of the interaction from being lost.
- **Stable Identity**: Uses timers and timestamps to accurately calculate the remaining time.

### Real-World Example: Scroll Progress Bar
```tsx
function ReadingProgressBar() {
  const [scrollPercent, setScrollPercent] = useState(0);
  
  // Throttle updates to 100ms for smooth performance while scrolling
  const throttledPercent = useThrottle(scrollPercent, 100);

  useEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;
    setScrollPercent((currentScroll / scrollHeight) * 100);
  });

  return (
    <div 
      style={{ 
        width: `${throttledPercent}%`, 
        height: '4px', 
        background: 'blue', 
        position: 'fixed' 
      }} 
    />
  );
}
```

### Edge Cases Covered
- Immediate update if enough time has passed since the last change.
- Timer cleanup on unmount to prevent orphaned state updates or memory leaks.
