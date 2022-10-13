module.exports = {
  extends: ['airbnb', 'prettier', 'plugin:cypress/recommended'],
  plugins: ['react', 'jest', 'prettier', 'cypress'],
  rules: {
    'no-console': 0,
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-trailing-spaces': 'error',
    'prettier/prettier': ['error'],

    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/display-name': [2, { ignoreTranspilerName: false }],

    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelComponents: ['label'],
        labelAttributes: ['htmlFor'],
        controlComponents: ['input'],
      },
    ],

    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,

    'cypress/no-assigning-return-values': 'error',
    'cypress/no-unnecessary-waiting': 'error',
    'cypress/assertion-before-screenshot': 'warn',
    'cypress/no-force': 'warn',
    'cypress/no-async-tests': 'error',
    'cypress/no-pause': 'error',
  },
  env: {
    browser: true,
    es2021: true,
    jest: true,
    'cypress/globals': true,
  },
};
