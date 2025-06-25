module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    'no-unused-vars': 'off',
    'no-undef': 'off'
  }
}
