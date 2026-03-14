# useAsync

Custom hook for handling asynchronous logic with built-in race condition prevention.

### The problem it solves
The most common bug in React SPAs is updating state on an unmounted component after an async request finishes. Another frequent issue is "race conditions" where two rapid requests are made, and the first one (slower) overwrites the second one (faster).

### Design Decisions
- **AbortController Integration**: The hook creates an `AbortController` for every execution. It passes the `AbortSignal` to the async function so the consumer can cancel fetches or other abortable APIs.
- **Auto-cancellation**: If the dependencies change or the component unmounts while a request is pending, the previous controller is aborted, and state updates from that promise are safely ignored.
- **Structured State**: Instead of boolean flags like `isLoading`, it uses a state-machine style `status` field (`idle`, `pending`, `success`, `error`), making the UI logic more robust.

### Real-World Example: User Profile Fetching
```tsx
function UserProfile({ userId }) {
  const { status, data: user, error } = useAsync(
    async (signal) => {
      const response = await fetch(`/api/users/${userId}`, { signal });
      if (!response.ok) throw new Error('Failed to fetch user');
      return response.json();
    },
    [userId]
  );

  if (status === 'pending') return <SkeletonLoader />;
  if (status === 'error') return <ErrorMessage error={error} />;
  if (status === 'success') return <UserCard user={user} />;
  
  return null;
}
```

### Edge Cases Covered
- Prevents memory leaks and console warnings regarding state updates on unmounted components.
- Gracefully handles non-Error objects being thrown.
- Ensures only the latest request's data is reflected in the state.
