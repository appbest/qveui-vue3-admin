import {
  reactive,
  watchEffect,
  computed,
  h,
  ref,
  provide,
  inject,
  markRaw,
  onMounted,
  defineAsyncComponent,
  getCurrentInstance,
} from 'vue';
//} from '@vue/composition-api';

/**
 * 全局使用
 * $vue.
 *
 */
export {
  /**
   * render函数组件渲染
   * @param {*} key
   * @param {*} element
   */
  h,
  /**
   * 创建响应式数据对象,代替data
   *  @param {*} val 数据对象json
   */
  reactive,
  /**
   * 响应式对象
   */
  ref,
  /** 定义全局变量 */
  provide,
  /** 接收全局变量 */
  inject,
  /**
   * 时时计算
   */
  computed,
  /**
   * 标记对象，使其永远不会转换为代理。返回对象本身
   * 动态组件引用需要
   */
  markRaw,
  /**
   * 获取当前实例
   */
  getCurrentInstance,
  /**
   * 监听对象变化
   */
  watchEffect,
  /**
   * 异步加载组件defineAsyncComponent
   */
  defineAsyncComponent,
  /**
   * 组件加载完毕
   */
  onMounted,
};
