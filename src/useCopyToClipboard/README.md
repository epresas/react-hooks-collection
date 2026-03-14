# useCopyToClipboard

Abstraction over the Clipboard API with state management for user feedback.

### The problem it solves
Copying text is simple, but providing clean and consistent visual feedback ("Copied!") is not. Most implementations require the dev to manually manage the "copied" state and a timer to reset it.

### Design Decisions
- **Modern API**: Uses `navigator.clipboard.writeText`, which is the current standard.
- **Feedback Loop**: Exposes an explicit state (`idle`, `copied`, `error`) and an `isCopied` boolean, allowing the library user to apply CSS classes or change text conditionally with a single line of logic.
- **Auto-reset**: The state returns to `idle` after x milliseconds, clearing the visual feedback without developer intervention.

### Real-World Example: Copy API Key with Tooltip
```tsx
function ApiKeyManager({ apiKey }) {
  const { copy, isCopied } = useCopyToClipboard(3000);

  return (
    <div className="key-container">
      <code>{apiKey}</code>
      <button onClick={() => copy(apiKey)}>
        {isCopied ? "✓ Copied!" : "Copy Key"}
      </button>
    </div>
  );
}
```

### Edge Cases Covered
- Permission errors or Clipboard API failures.
- Support for different reset times via parameters.
