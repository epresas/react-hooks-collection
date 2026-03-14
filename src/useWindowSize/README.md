# useWindowSize

Custom hook that returns viewport dimensions with integrated performance optimization.

### The problem it solves
Listening to the window `resize` event is one of the biggest causes of performance issues in React (laggy scrolling, UI freezes). Without optimization, the browser can fire hundreds of events per second while the user drags the window corner, forcing hundreds of unnecessary re-renders.

### Design Decisions
- **Debounced Updates**: The hook waits for 150ms of "silence" after the last movement before updating the React state. This ensures the UI remains fluid during the change and accurate at the end.
- **SSR Friendly**: Does not assume `window` exists, allowing the library to be used in frameworks like Next.js/Remix without hydration errors.
- **Auto-Cleanup**: Manages the removal of the event listener and clears the pending timer to prevent memory leaks.

### Real-World Example: Conditional Layout (Sidebar vs Bottom Tray)
```tsx
function Navigation() {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  return (
    <header>
      {isMobile ? (
        <BottomTabNavigation />
      ) : (
        <aside><SidebarNavigation /></aside>
      )}
    </header>
  );
}
```

### Edge Cases Covered
- Multiple consecutive resize events only trigger one update.
- Component unmounting during the debounce period.
