# `useDebounce`

Delays updating a value until a specified time has passed without any new changes.

## The problem it solves

In search inputs, auto-saving forms, or complex validations, you don't want to trigger an expensive API call or a heavy component re-render on every single keystroke. 

Without debouncing, typing "hello" triggers 5 immediate updates. With debouncing, it only triggers 1 update when the user stops typing for a specified amount of time.

## Why this implementation? (Design Decisions)

The naive implementation often uses the value directly in the cleanup function, which can create a stale closure bug in React. 

This implementation:
- Uses a `useRef` for the timeout to ensure the closure always has access to the latest timer ID.
- Automatically cleans up the pending timeout on component unmount, preventing memory leaks and React state update warnings on unmounted components.
- Uses strict TypeScript generics (`<T>`) so it can debounce strings, numbers, objects, or arrays while preserving the exact type inference at the call site.

## Usage

```tsx
import { useState, useEffect } from 'react';
import { useDebounce } from '@edmundopresas/react-hooks';

export function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // debouncedSearch will only update 500ms after the last keystroke
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearch) {
      // ✅ Safe to call API here, won't spam the server
      fetchResults(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <input 
      type="text" 
      value={searchTerm} 
      onChange={(e) => setSearchTerm(e.target.value)} 
      placeholder="Search..."
    />
  );
}
```
