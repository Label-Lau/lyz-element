/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'plugin:vue/vue3-recommended', // 使用 Vue3 的规则
    'eslint:recommended', // 使用 ESLint 推荐的规则
    '@vue/eslint-config-typescript', // 使用 Vue 的 TypeScript 规则
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest' // 使用最新的 ECMAScript 版本
  },
  rules: {
    'vue/multi-word-component-names': 0, // 关闭 vue/multi-word-component-names 规则
    'vue/max-attributes-per-line': 0
  },
  globals: {
    defineOptions: 'readonly' // 将 defineOptions 设置为只读全局变量
  }
}
