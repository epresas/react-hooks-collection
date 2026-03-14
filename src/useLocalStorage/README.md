# useLocalStorage

Declarative custom hook to persist state in `localStorage` with cross-tab synchronization.

### The problem it solves
Persisting user preferences (like dark mode or tokens) is trivial in theory, but in practice, it requires handling JSON serialization, managing quota errors (`quotaExceeded`), handling private navigation, and most importantly: synchronizing changes if the user has the application open in multiple tabs.

### Design Decisions
- **Lazy Initialization**: It reads from `localStorage` only during initial state creation, avoiding expensive disk access on every render.
- **Cross-tab Sync**: Listens to the native `storage` event so if the user changes the theme in Tab A, Tab B updates instantly without a refresh.
- **SSR Friendly**: Verifies the existence of `window` to avoid breaking Server Side Rendering environments.

### Real-World Example: User Preferences (Theme & Settings)
```tsx
function App() {
  const [settings, setSettings] = useLocalStorage('user-settings', {
    theme: 'dark',
    fontSize: 16,
    notificationsEnabled: true,
  });

  const toggleTheme = () => {
    setSettings(prev => ({ 
      ...prev, 
      theme: prev.theme === 'dark' ? 'light' : 'dark' 
    }));
  };

  return (
    <div className={settings.theme}>
      <h1>User Settings</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
      {/* settings are saved automatically in localStorage */}
    </div>
  );
}
```

### Edge Cases Covered
- Parsing errors (malformed JSON).
- Environments without `localStorage` access (extreme Privacy mode).
- Deserialization of complex types (objects/arrays).
