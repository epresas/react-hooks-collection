# useClickAway

Custom hook that detects clicks away from a target element. Essential for modals, dropdowns, and tooltips.

### The problem it solves
Closing a dropdown menu or a modal when clicking anywhere else on the screen is a universal UX pattern. Implementing it requires manually managing global event listeners and performing node hierarchy checks (`contains`), which is prone to cleanup errors.

### Design Decisions
- **Ref Abstraction**: The hook manages its own `ref`, so the library user only needs to attach it to the desired element.
- **Touch Support**: Registers both `mousedown` and `touchstart` to ensure "click away" behavior works perfectly on mobile devices.
- **Latest Handler Pattern**: Uses a Ref for the callback, preventing the global effect from re-attaching unnecessarily if the close function changes (achieving more stable performance).

### Real-World Example: Close Dropdown on Outside Click
```tsx
function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickAway<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Menu</button>
      
      {isOpen && (
        <div ref={dropdownRef} className="dropdown-panel">
          <a href="/profile">Profile</a>
          <a href="/settings">Settings</a>
          <button onClick={() => setIsOpen(false)}>Logout</button>
        </div>
      )}
    </div>
  );
}
```

### Edge Cases Covered
- Prevents accidental closures when clicking inside child elements.
- Total cleanup of global listeners on unmount.
