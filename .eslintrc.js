module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    page: true,
  },
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/default': 0,
    'import/no-named-as-default-member': 0,
    'import/named': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'no-restricted-globals': 0,
    'no-continue': 0,
    'no-shadow': 'warn',
    'no-console': 0,
    'no-underscore-dangle': 0,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@docs-utils', './docs/__utils__'],
          ['@e2e-utils', './e2e/__utils__'],
          ['@test-utils', './tests/__utils__'],
        ],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
