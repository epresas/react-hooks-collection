# useDebounce

Delays updating a value until a specified time has passed without changes.

### The problem it solves
In search inputs or form validation, you don't want to trigger an 
API call on every keystroke. This hook ensures the effect only fires 
after the user stops typing.

### Design Decisions
- **Generic Support**: Works with any type (strings, objects, numbers).
- **Stale Closure Prevention**: Uses internal effect cleanup to ensure only the latest timer survives.

### Real-World Example: Live Search with API calls
```tsx
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearch) {
      // This only fires 500ms after the user stops typing
      api.search(debouncedSearch).then(results => {
        // ... update UI
      });
    }
  }, [debouncedSearch]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Type to search..."
    />
  );
}
```

### Edge Cases Covered
- Cancels pending timeout on component unmount (memory leak prevention).
- Handles changing delay values correctly.
- Works with any type (generic T).
