# useToggle

Provides a boolean state and a cleaner way to toggle it than `setState(prev => !prev)`.

### The problem it solves
In high-seniority codebases, readability is key. Repeatedly writing `setIsOpen(prev => !prev)` adds cognitive load. `useToggle` encapsulates this pattern into a single, intuitive function.

### Design Decisions
- **Stable Identity**: The toggle function is wrapped in `useCallback` with an empty dependency array. This ensures that the function reference never changes, which is critical when passing it down to memoized child components (`React.memo`).
- **Overload Support**: The toggle function accepts an optional `boolean` argument. This allows the same function to be used for both "toggling" (checkboxes, modals) and "explicit setting" (close buttons).

### Real-World Example: Dashboard Sidebar Logic
```tsx
function AdminLayout() {
  const [isSidebarOpen, toggleSidebar] = useToggle(true);

  return (
    <div className="layout">
      <nav style={{ display: isSidebarOpen ? 'block' : 'none' }}>
        <SidebarContent />
      </nav>
      <main>
        <button onClick={() => toggleSidebar()}>
          {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
        </button>
        <Dashboard />
      </main>
    </div>
  );
}
```

### Edge Cases Covered
- Handles both initial boolean values and defaults to `false`.
- Type-safe implementation ensures only booleans can be passed or toggled.
