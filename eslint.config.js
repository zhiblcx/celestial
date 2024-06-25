import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    indent: 2,
  },

  react: true,
  vue: true,
  astro: true,

  rules: {
    'no-console': 'off',
    'node/prefer-global/process': 'off',
  },

  jsonc: false,
  yaml: false,
})
