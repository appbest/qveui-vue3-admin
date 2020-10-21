<!-- 首页 -->


<script>
import { reactive } from '../../components/vue.api';

import { testRoutes } from '../../router/views'
import { top } from '../../router/menu'
// 路由
import router from '../../router'

// 描述页面
import HomeInfoPage from './info.vue'

export default {
  components: {
    HomeInfoPage
  },
  setup () {

    /** 组件参数 */
    const the = reactive({
      tabs: {
        active: 0,
        list: [],
      }
    })

    //创建动态选项卡
    let _menu = testRoutes.map(item => {
      return {
        icon: 'icon-menu',
        path: item.path,
        title: item.meta.title,
      };
    });

    // 结合
    the.tabs.list = top.concat(_menu);

    /**
     * 选项卡事件
     */
    const onTabEvent = (resp) => {
      // console.log('menu', resp);
      switch (resp.cmd) {
        case 'click':
          // 切换回主路由
          router.push(resp.item.path)
          break;
        case 'close':

          the.tabs.list.splice(resp.index, 1)
          the.tabs.active = the.tabs.list.length - 1
          break;
      }
    }

    const btnEvent = () => {
      console.log('btnEvent')
      the.tabs.list.push({ title: '文22', body: 'sadsadsadsa' + Math.random(), dot: true, close: true, })
      the.tabs.active = the.tabs.list.length - 1
    }

    return { the, onTabEvent, btnEvent }
  }
}
</script>

<template>
  <div class="home-page">
    <Tabs scrolled
          :list="the.tabs.list"
          :active="the.tabs.active"
          @onEvent="onTabEvent">
      <template v-slot:extra>
        <span class="tab-ext">
          <Icon type="icon-jiahao"
                @click="btnEvent" />
        </span>
      </template>
      <template v-slot:qv-tabs-0>
        <HomeInfoPage />
      </template>
    </Tabs>
    <router-view></router-view>
  </div>
</template>

<style lang="less">
.home-page {
  // .qv-tabs-bar {
  //   background-color: #eee;
  //   // .qv-tabs-bar-item {
  //   //   background-color: #eee;
  //   // }
  //   // .qv-tabs-bar-item .active {
  //   //   background-color: #fff;
  //   // }
  // }
  .tab-ext {
    display: inline-block;
    line-height: 2rem;
    margin-right: 0.5rem;
  }
  .icon-jiahao {
    // position: absolute;
    //  right: 0.1rem;
    // margin-top: 1rem;
    //
    border: 0.1rem solid coral;
    padding: 0.15rem;
    border-radius: 50%;
    color: coral;
    cursor: pointer;
  }
}
</style>