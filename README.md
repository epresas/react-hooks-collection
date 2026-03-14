# React Hooks Collection: Patterns & Implementations

> A curated collection of production-ready React Hooks, focused on API design, TypeScript strictness, and solving real-world architecture challenges.

## The "Why" Behind This Repository

The React ecosystem is filled with massive hook libraries and quick copy-paste snippets. However, after years of scaling frontend applications and working in cross-functional squads, I've found that the real challenge isn't just writing a hook that "works"—it's writing a hook that is safe, predictable, and resilient across a shared codebase.

I created this repository to document my approach to solving common UI, performance, and state management problems. This isn't intended to be just another utility library; it's a demonstration of **technical intentionality**. 

When abstracting logic into custom hooks, my primary focus is on:
*   **API Design:** Creating intuitive, minimalistic interfaces that are hard for other developers to misuse.
*   **TypeScript Strictness:** Leveraging generics to ensure robust type inference and safety at the call site.
*   **Resilience & Edge Cases:** Proactively handling stale closures, preventing memory leaks (proper cleanup phases), and avoiding silent bugs like async race conditions.
*   **Behavioral Testing:** Ensuring every implementation is backed by tests that verify user behavior rather than internal implementation details.

## What You'll Find Here

This repository is structured to prioritize context over sheer volume. I believe that *why* a decision was made is often more important than the code itself. 

Therefore, instead of a monolithic file, every hook lives in its own isolated module within the `src/` directory. For each hook, you will find:

1.  **The Implementation (`use[Name].ts`):** The source code itself, annotated with the design decisions behind the chosen approach (e.g., why a `useRef` was used instead of a `useState` for a specific problem).
2.  **The Test Suite (`use[Name].test.ts`):** Robust, behavior-driven tests validating the hook under various scenarios and edge cases.
3.  **Dedicated Documentation (`README.md`):** Every hook has its own README explaining the specific problem it solves, the trade-offs considered, and how to use it safely in production.

## Repository Structure

```text
react-hooks-collection/
├── src/
│   ├── use[HookName]/
│   │   ├── use[HookName].ts       # Source code with design comments
│   │   ├── use[HookName].test.ts  # RTL / Vitest test suite
│   │   └── README.md              # Context, trade-offs, and examples
│   └── ...
├── package.json                   
└── README.md                      # You are here
```
