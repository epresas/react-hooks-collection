# useDocumentTitle

Synchronizes the browser's `document.title` with the provided string.

### The problem it solves
In Single Page Applications (SPAs), the document title doesn't change automatically when the user navigates between "pages" (which are actually just component swaps). This hook provides a declarative way to manage the page title from within any component.

### Design Decisions
- **declarative API**: Just like `useEffect`, the title update is a side effect of the component being mounted or the `title` variable changing.
- **Unmount Restoration**: One common UX issue in SPAs is navigating to a modal/sub-page that changes the title, but not reverting it back when closing. This hook includes a `restoreOnUnmount` option to handle look-back scenarios (e.g., reverting "Product Details" back to "Search Results").

### Real-World Example: Chat Application with Dynamic Unread Notifications
```tsx
function ChatRoom({ roomName, unreadCount }) {
  const title = unreadCount > 0 
    ? `(${unreadCount}) ${roomName} | ChatApp` 
    : `${roomName} | ChatApp`;

  // Syncs title to e.g. "(3) Support | ChatApp"
  useDocumentTitle(title, true);

  return <div>Welcome to {roomName}</div>;
}
```

### Edge Cases Covered
- Updates the title immediately on mount.
- Handles changes to the `title` prop dynamically.
- Prevents memory leaks by only updating the title when necessary via dependency arrays.
