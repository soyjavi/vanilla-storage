module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    es6: true,
    sourceType: 'module',
  },
  plugins: ['import', 'prettier'],
  rules: {
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: ['builtin', 'external', 'internal'],
        'newlines-between': 'always',
      },
    ],
    'max-len': [1, 120, { ignoreComments: true, tabWidth: 2 }],
    'no-async-promise-executor': 'warn',
    'sort-keys': ['warn', 'asc', { caseSensitive: true, minKeys: 2, natural: false }],
  },
};
