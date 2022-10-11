module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['react', 'jest', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
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
    'no-console': 0,
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-trailing-spaces': 'error',
  },
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
};
