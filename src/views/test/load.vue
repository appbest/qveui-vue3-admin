<!-- 加载组件 -->
<template>
  <div class="test-load-page">
    <dl>
      <dt>局部</dt>
      <dd>
        <LoadingBar named="test"
                    style="top:1rem"
                    color="error" />
      </dd>
      <dd>
        <Button @click="btnLoad('start','test')">
          进度条开始
        </Button>
        <Button @click="btnLoad('finish','test')">
          进度条结束
        </Button>

        <Button @click="btnLoad('update','test')">
          指定进度
        </Button>
      </dd>
    </dl>

    <dl>
      <dt>全局</dt>

      <dd>
        <Button @click="btnLoad('start')">
          进度条开始
        </Button>
        <Button @click="btnLoad('finish')">
          进度条结束
        </Button>

        <Button @click="btnLoad('update')">
          指定进度
        </Button>
      </dd>
    </dl>

    <dl>
      <dt>订阅事件</dt>
      <dd>
        <Button @click="btnSubscribe('keys')">
          所有订阅事件ID
        </Button>
      </dd>
      <dd>{{ the.keys }}</dd>
      <dd></dd>
    </dl>
  </div>
</template>

<script>
import { loading, subscribe } from '../../components';
import { reactive } from '../../components/vue.api';

export default {
  setup () {
    const the = reactive({
      url: '/page/help/index',
      keys: []
    });


    const btnLoad = (val, named) => {
      named = named || 'base'
      let resp
      switch (val) {

        /** 进度开始 */
        case 'start':
          // console.log(qveui);
          resp = loading.start(null, named)
          console.log(JSON.stringify(resp))
          break;

        case 'finish': // 加载完成
          resp = loading.finish(named)
          console.log(JSON.stringify(resp))
          break;
        case 'update':
          console.log(val)
          resp = loading.update({
            start: false,
            show: true,
            percent: 30,
          }, named)
          console.log(JSON.stringify(resp))
          break;

      }
    }

    // 当前监听的事件ID
    const btnSubscribe = (val) => {
      switch (val) {
        case 'keys':
          // 全局组件keys
          the.keys = subscribe.keys()
          // console.log()
          break
      }

    }

    return { btnLoad, btnSubscribe, the }
  },
}

</script>
<style lang='less'>
.test-load-page {
  dl {
    padding: 0.5rem;
    dt {
      padding: 0.5rem;
      font-size: 0.8rem;
    }
    dd {
      padding: 0.5rem;
    }
  }
}
</style>