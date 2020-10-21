/**
 * Web 版本
 * 路由配置
 */
import { createRouter, createWebHashHistory } from 'vue-router';

import { routes, whiteList } from './routes.js';
import { AuthHasPermission } from '../store';
import { html } from 'quick.lib';

const router = createRouter({
  //createWebHashHistory createWebHistory()两种模式根据需要选择
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // console.log(savedPosition);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition);
        } else {
          resolve({ x: 0, y: 0 });
        }
      });
    });
  },
});

router.beforeEach((to, from, next) => {
  //  console.log(to.path);

  if (to.meta && to.meta.title) {
    // 更新页面标题
    document.title = to.meta.title;
    // document.title = 'title' in to.meta ? to.meta.title : '';
  }

  if (whiteList[to.path]) {
    // 在免登录白名单，直接进入
    next();
    return;
  }

  // 头部配置
  if (to.meta) {
    // 需要权限认证
    if (to.meta.roles) {
      // 通过vuex state获取当前登陆用户的角色组
      if (!AuthHasPermission(to.meta.roles)) {
        //是否有带指定跳转地址,外网请求
        let _rurl = html.getUrlPars('redirect');
        if (_rurl) {
          to.query['redirect'] = _rurl;
        } else {
          to.query['toPath'] = to.fullPath;
        }
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
        next({ path: `/login/`, query: to.query, hash: to.hash });
        return;
      }
    }
  }

  next();
});

export default router;
