import pluginJs from "@eslint/js";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs}"] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ["**/*.test.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  pluginJs.configs.recommended,
];
