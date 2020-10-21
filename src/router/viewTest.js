/** 测试页面 */
import TestTextPage from '../views/test/text.vue';
import TestMessagePage from '../views/test/message.vue';
import TestLoadPage from '../views/test/load.vue';
import TestTablePage from '../views/test/table.vue';
import TestTreePage from '../views/test/tree.vue';
import TestCodePage from '../views/test/code.vue';
import TestJsonPage from '../views/test/json.vue';
import TestXMLPage from '../views/test/xml.vue';

/**
 * 测试路由
 */
const testRoutes = [
  {
    path: '/TestText',
    component: TestTextPage,
    name: 'TestTextPage', // 组件名称
    meta: {
      // 需要权限认证
      // roles: [1],
      title: '表单',
      // 不可重复创建tab,跟组件名一样
      one: 'TestTextPage',
    },
  },
  {
    path: '/testMessage',
    component: TestMessagePage,
    name: 'TestMessagePage', // 组件名称
    meta: {
      // 需要权限认证
      // roles: [1],
      title: '提示窗口',
      // 不可重复创建tab,跟组件名一样
      one: 'TestMessagePage',
    },
  },
  {
    path: '/TestLoad',
    component: TestLoadPage,
    name: 'TestLoadPage', // 组件名称
    meta: {
      // 需要权限认证
      // roles: [1],
      title: '进度条',
      // 不可重复创建tab,跟组件名一样
      one: 'TestLoadPage',
    },
  },
  {
    path: '/TestTable',
    component: TestTablePage,
    name: 'TestTablePage', // 组件名称
    meta: {
      // 需要权限认证
      // roles: [1],
      title: '表格',
      // 不可重复创建tab,跟组件名一样
      one: 'TestTablePage',
    },
  },
  {
    path: '/TestTree',
    component: TestTreePage,
    name: 'TestTreePage', // 组件名称
    meta: {
      // 需要权限认证
      // roles: [1],
      title: '树列表',
      // 不可重复创建tab,跟组件名一样
      one: 'TestTreePage',
    },
  },
  {
    path: '/TestJson',
    component: TestJsonPage,
    name: 'TestJsonPage', // 组件名称
    meta: {
      // 需要权限认证
      // roles: [1],
      title: 'Json',
      // 不可重复创建tab,跟组件名一样
      one: 'TestJsonPage',
    },
  },
  {
    path: '/TestXML',
    component: TestXMLPage,
    name: 'TestXMLPage', // 组件名称
    meta: {
      // 需要权限认证
      // roles: [1],
      title: 'XML',
      // 不可重复创建tab,跟组件名一样
      one: 'TestXMLPage',
    },
  },
  {
    path: '/TestCode',
    component: TestCodePage,
    name: 'TestCodePage', // 组件名称
    meta: {
      // 需要权限认证
      // roles: [1],
      title: '代码显示',
      // 不可重复创建tab,跟组件名一样
      one: 'TestCodePage',
    },
  },
];

/**
 * 测试菜单列表
 */
const testMenuByRoute = () => {
  let _menu = testRoutes.map(item => {
    return {
      icon: 'icon-menu',
      path: item.path,
      title: item.meta.title,
    };
  });
  // console.log('menu', _menu);
  return _menu;
};

// 读取菜单
// console.log('menu', JSON.stringify(testMenuByRoute()));

export {
  testRoutes,
  TestTextPage,
  TestMessagePage,
  TestLoadPage,
  TestTablePage,
  TestTreePage,
  TestCodePage,
  TestJsonPage,
};
