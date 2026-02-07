import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  js.configs.recommended,

  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    plugins: {
      "@typescript-eslint": tsPlugin,
      import: importPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.app.json",
        tsconfigRootDir: __dirname,
      },
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        HTMLElement: "readonly",
      },
    },

    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: { project: "./tsconfig.app.json" },
        node: true,
      },
    },

    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { ignoreRestSiblings: true },
      ],
      "arrow-body-style": [2, "always"],
      curly: "error",
      "no-console": ["error", { allow: ["warn", "error"] }],
      "react/jsx-no-useless-fragment": [2, { allowExpressions: false }],
      "import/no-duplicates": "error",
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling"],
          pathGroups: [
            { pattern: "@/app/**", group: "internal", position: "before" },
            { pattern: "@/pages/**", group: "internal", position: "before" },
            { pattern: "@/widgets/**", group: "internal", position: "before" },
            { pattern: "@/features/**", group: "internal", position: "before" },
            { pattern: "@/entities/**", group: "internal", position: "before" },
            { pattern: "@/shared/**", group: "internal", position: "before" },
            { pattern: "../*/**", group: "parent", position: "after" },
            { pattern: "./*/**", group: "sibling", position: "before" },
          ],
          alphabetize: { order: "asc", caseInsensitive: false },
          distinctGroup: true,
          "newlines-between": "always",
        },
      ],
    },
  },
];
