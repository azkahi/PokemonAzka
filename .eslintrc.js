module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
    files: ['*.ts', '*.tsx'],
  },
  plugins: ['@typescript-eslint', 'prettier', 'react-native-globals', 'react', 'react-native'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'universe',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],
  env: {
    'react-native/react-native': true,
    // 'react-native-globals/all': true,
  },
  rules: {
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    'react-native/no-single-element-style-arrays': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'react/jsx-no-bind': ['warn'],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
  },
  settings: {
    react: {
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
    },
  },
}
