module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  globals: {
    describe: 'readonly',
    test: 'readonly',
    expect: 'readonly',
    beforeEach: 'readonly',
    beforeAll: 'readonly',
    afterEach: 'readonly',
    afterAll: 'readonly',
    jest: 'readonly',
  },
  overrides: [
    {
      files: ['**/__tests__/**/*', '**/*.test.ts', '**/*.spec.ts'],
      env: {
        jest: true,
      },
    },
  ],
};