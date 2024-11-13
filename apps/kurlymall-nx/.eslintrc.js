module.exports = {
  ignorePatterns: ['checkPrettier.js', 'setup-local-nginx-config.js'],
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest-dom/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'jest-dom', 'unused-imports', 'jsx-a11y'],
  globals: {
    context: 'readonly',
    given: 'readonly',
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    Feature: 'readonly',
    Scenario: 'readonly',
    actor: 'readonly',
    session: 'readonly',
    fail: 'readonly',
    locate: 'readonly',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    // 기본 코드 스타일
    'no-nested-ternary': 'off',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'import/export': 'off',
    // import 관련
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.ts', '**/*.test.tsx'],
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['external', 'internal'],
        'newlines-between': 'always-and-inside-groups',
      },
    ],
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
    'unused-imports/no-unused-imports-ts': 'error',

    // 리액트 관련
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['js', 'jsx', 'ts', '.tsx'],
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',

    // TypeScript 관련
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-shadow': 'error',
    'jsx-a11y/alt-text': [
      'warn',
      {
        elements: ['img', 'object', 'area', 'input[type="image"]'],
        img: ['Image'],
        object: ['Object'],
        area: ['Area'],
        'input[type="image"]': ['InputImage'],
      },
    ],
    'react/no-unstable-nested-components': ['warn'],
    '@typescript-eslint/naming-convention': 'off',
  },
};
