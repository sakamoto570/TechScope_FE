module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier'
  ],
  parserOptions: { ecmaVersion: 2021, sourceType: 'module' },
  rules: {
    indent: ['error', 2], // 2スペースを強制
    semi: ['error', 'never'], // セミコロンなし
    quotes: ['error', 'single'], // シングルクォート
    'vue/multi-word-component-names': 'off',
    'vue/component-definition-name-casing': ['error', 'PascalCase'], // アッパーキャメルケース
  },
}
