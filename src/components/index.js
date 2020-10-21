/** 引入Ui组件库 */
import qveui from 'qveui';
import 'qveui/dist/fonts/iconfont.css';

import { version } from 'qveui';

// 导航组件
import NavTop from './Nav/top.vue';

/**
 * 本地组件库
 */
const components = {
  NavTop,
};

/**
 * vue 组件挂载
 * @param {*} app
 * @param {*} opts
 */
const install = function(app, opts) {
  // 判断是否安装
  if (install.installed) return;

  // 安装组件库
  Object.keys(components).forEach(key => {
    app.component(key, components[key]);
  });

  // 引入组件库
  app.use(qveui, opts);

  // 日志
  let _resp = `version:${version}`;

  // 调试日志
  if (typeof opts.log !== 'undefined') {
    //调试日志输出
    console.log('quick-vue-ui', _resp);
  }
};

/**
 * 导出QuickVueUi组件库
 */
export * from 'qveui';

// 导出
export default {
  install,
};
