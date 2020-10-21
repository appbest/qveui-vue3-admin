<!-- test -->
<template>
  <div>
    <NavTop />
    <Tabs scrolled
          :list="the.tabs.list"
          :active="the.tabs.active">
      <template v-slot:qv-tabs-0>
        <TestMessagePage />
      </template>
      <template v-slot:qv-tabs-1>
        <TestLoadPage />
      </template>
      <template v-slot:qv-tabs-2>
        <TestTablePage />
      </template>
      <template v-slot:qv-tabs-3>
        <TestTreePage />
      </template>
      <template v-slot:qv-tabs-4>
        <TestTextPage />
      </template>
      <template v-slot:qv-tabs-5>
        <TestCodePage />
      </template>
    </Tabs>
  </div>
</template>

<script>
import { reactive } from '../../components/vue.api';

//import { getCurrentInstance } from '../../../packages'

import TestTextPage from './text.vue'
import TestMessagePage from './message.vue'
import TestLoadPage from './load.vue'
import TestTablePage from './table.vue'
import TestTreePage from './tree.vue'
import TestCodePage from './code.vue'

export default {
  components: { TestTextPage, TestMessagePage, TestLoadPage, TestTablePage, TestTreePage, TestCodePage },
  setup () {
    const the = reactive({
      tabs: {
        active: 0,
        list: [
          {
            title: '消息',
          },
          {
            title: '视图',
          },
          {
            title: '表格',
          },
          {
            title: '树组件',
          },
          {
            title: '文本框',
          },
          {
            title: '测试',
          },
        ],
      }
    })
    return { the }
  }
}

</script>
