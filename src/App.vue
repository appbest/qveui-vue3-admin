<template>
  <!-- 注入到index.html > #appTopBody -->
  <teleport to="#appTopBody">
    <!-- LoadingBar 全局加载进度组件 -->
    <LoadingBar />
    <!-- Message 全局提示通知组件 -->
    <Message />
  </teleport>
  <!-- router 全局路由 -->

  <router-view></router-view>

  <teleport to="#endOfBody">
    <!-- Frames 全局浮动窗口组件 -->
    <Frames />
  </teleport>
</template>

<script>
import { onMounted } from './components/vue.api'
import { version, html } from 'quick.lib'

export default {
  name: 'App',
  setup () {
    //const $plus = window.$plus;
    console.log('quick.lib', version)

    const onResize = () => {
      // 页面基础字体 缩放
      let size = html.fontRem();
      console.log('onResize:' + version, size);
    }
    onMounted(() => {
      // 执行基础字体缩放
      onResize()
      // 窗口发生变化时
      window.onresize = onResize;
    })
  }
}
</script>

<style lang="less">
//@import "qveui/dist/fonts/iconfont.css";
@import "qveui/dist/styles/index.less";
@import "./assets/styles/app.less";
</style>
