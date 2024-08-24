import js from '@eslint/js';
import eslintConfigPrettier from '@vue/eslint-config-prettier';
import eslintConfigTypescript from '@vue/eslint-config-typescript';
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
  eslintConfigTypescript,
  eslintConfigPrettier,
];
