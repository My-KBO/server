module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    sourceType: 'module',
    ecmaVersion: 2021,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Prettier와 충돌하는 ESLint 규칙 제거 + prettier/prettier 에러 처리
  ],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    // Prettier 연동
    'prettier/prettier': 'error',

    // 일반적인 규칙 조정 (필요에 따라 수정 가능)
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  ignorePatterns: ['dist/', 'node_modules/'],
};
