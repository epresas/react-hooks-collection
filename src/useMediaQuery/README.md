# useMediaQuery

Custom hook that allows you to use CSS media queries directly in your component logic.

### The problem it solves
Detecting if the user is on mobile (`(max-width: 768px)`) or if they prefer dark mode (`(prefers-color-scheme: dark)`) is often done by manually calculating pixels in a resize listener. This is inefficient and error-prone. CSS already has a powerful engine for this, and `useMediaQuery` exposes it to React.

### Design Decisions
- **`matchMedia` API**: Instead of listening to every pixel of resize, this hook uses the browser's native `matchMedia` API. The browser only notifies the component when the breakpoint state actually changes, which is infinitely more efficient.
- **Legacy Support**: Includes compatibility for both `addEventListener('change')` and the older `addListener`, ensuring it works on older browsers.
- **State Sync**: Correctly synchronizes the initial state even in race conditions during hydration.

### Real-World Example: Dark Mode Support (OS Preference)
```tsx
function ThemeProvider({ children }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState(prefersDarkMode ? 'dark' : 'light');

  useEffect(() => {
    setTheme(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  return <div className={theme}>{children}</div>;
}
```

### Edge Cases Covered
- Dynamic changes to the `query` string.
- Prevention of memory leaks by cleaning up listeners on unmount.
- Works with complex queries (orientation, resolution, color schemes).
