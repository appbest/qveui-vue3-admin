/**
 * 路由配置
 */

// 引入页面组件
import { Home, Login, More_404, Help } from './views';
// 引入测试页面组件
import { testRoutes } from './views';

/**
 *  白名单免认证路径
 */
const whiteList = ['/login', '/help'];

/**
 * 主路由配置
 */
let routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home', // 组件名称
    component: Home,
    meta: {
      title: '首页',
    },
    children: testRoutes,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/help',
    component: Help,
  },
  { path: '/:catchAll(.*)', component: More_404 },
];

export { routes, whiteList };
