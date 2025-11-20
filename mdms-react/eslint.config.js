import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      ...pluginReact.configs.recommended.rules, // start from React recommended rules
      "react/react-in-jsx-scope": "off",        // ✅ disable old rule
      "react/jsx-uses-react": "off",            // ✅ disable old rule
      "react/jsx-no-target-blank": ["warn", { allowReferrer: true }],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  js.configs.recommended,
]);
