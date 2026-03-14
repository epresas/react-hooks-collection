# usePrevious

Custom hook that returns the value from the previous render.

### The problem it solves
React components often need to compare the current value of a prop or state with its value from the last render (e.g., to trigger an animation or an effect only when a specific value changes in a specific way). React doesn't provide a built-in way to "remember" the previous value during the render phase.

### Design Decisions
- **`useRef` over `useState`**: We use a Ref because updating a Ref doesn't trigger a re-render. Since we want to capture the value *after* the render is committed, using a Ref inside `useEffect` is the standard, most performant way to do this.
- **Generic Type `<T>`**: This ensures that `prevValue` has the exact same type as `currentValue`, providing full static analysis and autocomplete.

### Real-World Example: Tracking State Transitions for Notifications
```tsx
function OrderStatus({ status }) {
  const prevStatus = usePrevious(status);

  useEffect(() => {
    if (prevStatus === 'pending' && status === 'shipped') {
      toast.success("Your order is on the way!");
    }
  }, [status, prevStatus]);

  return <div>Current status: {status}</div>;
}
```

### Edge Cases Covered
- Returns `undefined` on the first render (standard behavior as there is no "previous" yet).
- Correctly handles rapid updates by leveraging the `useEffect` lifecycle.
