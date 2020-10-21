import { createApp } from 'vue';
import App from './App.vue';

// 引入路由
import router from './router';
// 引入状态
//import store from './store';

// 引入组件库与外挂
import comp from './components/index.js';

import { createStore } from './store';

createApp(App)
  .use(router)
  .use(createStore())
  .use(comp, {
    //输出日志
    log: { isPrint: true },
    // 外挂
    plus: true,
    // 初始化原生函数扩展
    init: true,
  })
  .mount('#app');
