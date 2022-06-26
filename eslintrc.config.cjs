module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:unicorn/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false,
    },
    warnOnUnsupportedTypeScriptVersion: false,
  },
  plugins: [
    'unicorn',
    '@typescript-eslint',
    'only-warn',
  ],
  ignorePatterns: ['@generated/**', '*.config.{js,cjs,mjs}'],
  rules: {
  },
  overrides: [
    {
      files: ['*.spec.ts', '**/testing/**/*.ts'],
      rules: {
        'consistent-return': 0,
        'max-lines': 0,
      },
    },
  ],
};
