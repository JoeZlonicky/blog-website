import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import vuePlugin from 'eslint-plugin-vue';

export default [
  js.configs.recommended,
  ...vuePlugin.configs['flat/recommended'],
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'prefer-const': 'warn',
      eqeqeq: ['warn', 'smart'],
    },
  },
  eslintConfigPrettier,
];
