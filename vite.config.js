/**
 * 扩展配置
 */

import json from '@rollup/plugin-json';

console.log('vite.config');

import path from 'path';
// 是否为生产环境
// const isProduction = process.env.NODE_ENV === 'production';
// 路径
const resolve = (dir) => {
  let _path = path.join(__dirname, dir);
  console.log('vite', _path);
  return _path;
};

module.exports = {
  // devServer: {
  //   port: 8080,
  // },
  // root: 'packages',
  // outDir: 'ui',
  // output: {
  //   format: 'esm',
  //   file: './dist/bundle.js',
  // },
  // input: 'packages/index.js',
  // external: ['vue'],
  // output: {
  //   format: 'esm',
  //   file: 'dist/bundle.js',
  // },

  alias: {
    '@': resolve('src'),
    // 带完整组件编译执行
    vue: 'vue/dist/vue.esm-bundler.js',
    //qvui: resolve('packages'),
  },

  plugins: [
    //   // resolve({
    //   //   extensions: ['.vue', '.js', '.css'],
    //   // }),
    //   // vue({
    //   //   template: {
    //   //     isProduction: true,
    //   //   },
    //   // }),
    //   // postcss({
    //   //   extract: 'bundle.css',
    //   // }),
    //json读取
    json(),
    //   copy({
    //     targets: [{ src: 'src/assets/*', dest: 'dist/assets' }],
    //   }),
  ],
};
