# @epresas/react-hooks-collection

A premium collection of high-seniority React hooks, designed to solve real-world problems inspired by the most common technical challenges on StackOverflow.

Developed with **TypeScript**, **Vitest**, and **GitHub Actions**.

## 🚀 Hooks Catalog

| # | Hook | Problem Solved |
|---|------|----------------|
| 1 | `useDebounce` | Prevent excessive API calls during search or validation. |
| 2 | `useAsync` | Handle async logic with `AbortController` and race condition prevention. |
| 3 | `usePrevious` | Track the value from the previous render. |
| 4 | `useWindowSize` | Get viewport dimensions with optimized, debounced resize handling. |
| 5 | `useIntersectionObserver` | Visibility detection for lazy loading and infinite scroll. |
| 6 | `useLocalStorage` | Persist state in localStorage with cross-tab synchronization. |
| 7 | `useMediaQuery` | Declarative CSS media queries using the native `matchMedia` API. |
| 8 | `useToggle` | Clean and stable API for boolean state management. |
| 9 | `useClickAway` | Detect clicks outside an element (perfect for modals/dropdowns). |
| 10 | `useCopyToClipboard` | Abstract Clipboard API with user feedback status. |
| 11 | `useEventListener` | Safe event listener management with automatic cleanup. |
| 12 | `useDocumentTitle` | Declarative `document.title` synchronization with unmount restoration. |
| 13 | `useThrottle` | Rate-limit high-frequency updates (scroll, mousemove). |

## 🛠 Installation

```bash
npm install @epresas/react-hooks-collection
```

## 💎 Why this library?

Unlike many generic collections, every hook here is built with **Seniority Patterns** in mind:
- **Performance**: Optimized re-renders using `useCallback`, `useRef`, and debouncing/throttling.
- **Robustness**: Proper handling of memory leaks, stale closures, and component unmounting.
- **TypeScript First**: Full type inference and strict generic support.
- **Well Documented**: Each hook includes its own README explaining the "Why" behind the "How".

## 📦 Developer Experience

- **CI/CD**: Fully automated testing and semantic versioning on every PR.
- **Zero Config Build**: Powered by `tsup` for lightning-fast ESM/CJS exports.
- **Tests**: 100% test coverage using Vitest and React Testing Library.

---
Created by [Edmundo Presas](https://github.com/epresas).
