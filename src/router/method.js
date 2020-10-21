import router from './index';

/**
 * 路由跳转
 * @param {*} url
 */
const push = (url) => {
  router.push(url);
};

/**
 * 当前路由的内容
 */
const current = () => {
  return router.currentRoute.value;
};

/**
 * 当前请求路径
 */
const path = () => {
  return router.currentRoute.value.path;
};

export { path, push, current };
