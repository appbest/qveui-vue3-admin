// import { reactive, inject } from 'vue';

import { inject } from '../components/vue.api';
import { UserModel } from './model';

/**
 * 全局关键字
 */
const StoreSymbol = Symbol('global-store');

/**
 * 全局应用对象
 */
let StateModel = {};

/**
 * 创建全局状态
 * app.use(createStore())
 */
const createStore = () => {
  // console.log('createStore', 'Store');
  return {
    install(app) {
      // 初始化，用户对象
      StateModel = { user: new UserModel() };

      // console.log('install Store', StateModel);

      // 全局绑定
      app.provide(StoreSymbol, StateModel);
    },
  };
};

/**
 * 取出全局状态
 */
const useGlobalStore = () => inject(StoreSymbol);

/**
 * 获取全局用户信息
 */
const useGlobalUser = () => {
  const store = inject(StoreSymbol);
  return store.user || {};
};

export { createStore, StateModel, useGlobalStore, useGlobalUser };

// 输出全局状态方法
export * from './method';
