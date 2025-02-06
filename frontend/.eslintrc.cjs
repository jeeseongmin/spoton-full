module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended",
    "plugin:prettier/recommended",
    "plugin:storybook/recommended",
  ],
  ignorePatterns: ["dist", "vite.config.ts", "*.cjs", "*.mjs", "*.js"],
  parser: "@typescript-eslint/parser",
  plugins: [
    "react-refresh",
    "react",
    "prettier",
    "@typescript-eslint",
    "unused-imports",
    "no-relative-import-paths"
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Your TypeScript files extension
      parserOptions: {
        project: ["./tsconfig.json"], // Specify it only for TypeScript files
      },
    },
  ],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "prefer-const": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-template": "error",
    eqeqeq: "error",
    "prefer-arrow-callback": "error",
    "no-plusplus": "error",
    "no-unneeded-ternary": "error",
    "no-prototype-builtins": "error",
    "react/react-in-jsx-scope": "off",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "interface",
        format: ["PascalCase"],
      },
      {
        selector: "typeAlias",
        format: ["PascalCase"],
      },
      {
        selector: "variable",
        format: ["PascalCase", "camelCase", "UPPER_CASE"],
      },
      {
        selector: "variable",
        types: ["function"],
        format: ["PascalCase", "camelCase"],
      },
      {
        selector: "variable",
        types: ["boolean"],
        format: ["PascalCase"],
        prefix: ["is", "has"],
      },
    ],
    "unused-imports/no-unused-imports": "error",
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "const", next: "return" },
    ],
    "no-relative-import-paths/no-relative-import-paths": [
      "error",
      { allowSameFolder: false, rootDir: "src", prefix: "@"}
    ]
  },
};
