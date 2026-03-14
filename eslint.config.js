import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript source files
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      // TypeScript recommended rules (flat-config style)
      ...tsPlugin.configs["recommended"].rules,

      // Enforce explicit return types on exported functions
      "@typescript-eslint/explicit-module-boundary-types": "warn",

      // Disallow `any`
      "@typescript-eslint/no-explicit-any": "error",

      // Disallow unused variables
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },

  // Ignore build output and dependencies
  {
    ignores: ["dist/**", "node_modules/**", "*.config.*"],
  },
];
