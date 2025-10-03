import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'
import { globalIgnores } from 'eslint/config'

export default [
  // Ignore the 'dist' directory.
  {
    ...globalIgnores(['dist']),
  },
  // Recommended JavaScript rules.
  js.configs.recommended,

  // Add the official React plugin configuration.
  {
    files: ['**/*.{js,jsx}'],
    ...react.configs.recommended,
  },

  // Recommended rules for React Hooks.
  {
    files: ['**/*.{js,jsx}'],
    ...reactHooks.configs['recommended-latest'],
  },

  // Rules for React Fast Refresh (HMR).
  {
    files: ['**/*.{js,jsx}'],
    ...reactRefresh.configs.vite,
  },

  // Your custom configuration for .js and .jsx files.
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // This is the crucial line to enable JSX parsing.
        },
      },
    },
    rules: {
      // You can add or override rules here.
      // These two rules are often disabled for React 17+
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
  },
]