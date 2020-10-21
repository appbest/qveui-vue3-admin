module.exports = {
  root: true,
  env: {
    node: true,
    //jest: true
  },
  plugins: ['prettier'],
  extends: [
    'plugin:vue/recommended',
    // 'plugin:vue/vue3-recommended',
    'plugin:vue/strongly-recommended',
    'eslint:recommended',
  ],
  rules: {
    //'no-console': 'off',
    // 'prettier/prettier': 'warn',
    // 'no-param-reassign': 'warn',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'vue/singleline-html-element-content-newline': 'off',
    // 'vue/require-default-prop': 'off',
    // 'no-plusplus': 'off',
    //'vue/html-closing-bracket-spacing': 'off',

    // 'vue/no-parsing-error': [
    //   {
    //     'x-invalid-end-tag': false,
    //   },
    // ],
    'vue/html-self-closing': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/no-v-html': 'off',
    // 'vue/html-closing-bracket-newline': [
    //   'error',
    //   {
    //     singleline: 'never',
    //     multiline: 'always',
    //   },
    // ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 5,
        multiline: {
          max: 5,
          allowFirstLine: true,
        },
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
};

// "eslintConfig": {
//   "root": true,
//   "env": {
//     "node": true
//   },
//   "extends": [
//     "plugin:vue/essential",
//     "eslint:recommended"
//   ],
//   "rules": {
//     "generator-star-spacing": "off",
//     "semi": [
//       "error",
//       "always"
//     ],
//     "no-console": "off",
//     "vue/no-parsing-error": [
//       {
//         "x-invalid-end-tag": false
//       }
//     ]
//   },
//   "parserOptions": {
//     "parser": "babel-eslint"
//   }
// }
