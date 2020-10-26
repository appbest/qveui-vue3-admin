

<script>
import { reactive } from '../../components/vue.api';
import { json } from 'quick.lib'

const testList = [
  {
    title: '组织',
    key: '1',
    children: [
      {
        title: '组织 1',
        key: '1-1',
        children: [
          {
            title: '组织 1-1',
            key: '1-1-1',
            expand: true,
            children: [
              {
                title: '组织 1-1-1',
                key: '1-1-1-1'
              },
              {
                title: '组织 1-1-2',
                key: '1-1-1-2',
              },
              {
                title: '组织 1-1-3',
                key: '1-1-1-3',
              }
            ]
          },
          {
            title: '组织 1-2',
            key: '1-1-2',
          }
        ]
      },
      {
        title: '组织 2',
        key: '1-2',
        children: [
          {
            title: '组织 2-1',
            key: '1-2-1'
          },
          {
            title: '组织 2-2',
            key: '1-2-2'
          }
        ]
      }
    ]
  },
  {
    title: '角色组 2',
    key: '2',
    children: [
      {
        title: '角色组 2-1',
        key: '2-1',

      },
      {
        title: '角色组 2-2',
        key: '2-2',
        children: []
      }
    ]
  }
]

export default {

  setup () {

    const the = reactive({
      tree: {
        /** 点击节点 */
        active: '0.1',
        onItem: {},
        list: [{
          title: '组织',
          key: '1',
          children: []
        }, {
          title: '角色',
          key: '2',
          children: []
        }]
      }
    })

    /**
     * 获取对象
     */
    const getTree = (resp) => {

      console.log('getTree:', resp.active);

      json.find({
        // 数据源
        data: testList,
        // 搜索子项节点
        // subs: 'children',
        // 查询条件
        where: `data.key=="${resp.item.key}"`,
        //异步回调(对象,level:层次,序号)
        callback: (obj, level, index) => {
          console.log('find2:', level, index)

          if (obj && obj.children) {
            // console.log('find3:', JSON.stringify(obj))
            /**
             * 回调树节点绑定
             * @param {*} resp 子节点数组
             */
            resp.bind(obj.children)
            return 1;
          }
        }
      })
    }


    const onTreeEvent = (resp) => {
      console.log('onTreeEvent', resp)

      switch (resp.cmd) {
        case 'open':
          getTree(resp)
          break;

        case 'click':
          the.onItem = resp
          break
      }
    }

    return { the, onTreeEvent }
  }
}

</script>

<template>
  <div class="tree-test-page">
    <Row>
      <Col span="6">
      <Tree :data="the.tree.list"
            :active="the.tree.active"
            @onEvent="onTreeEvent" />
      </Col>
      <Col span="18">
      {{ the.onItem }}
      </Col>
      <Row>
      </row>
    </row>
  </div>
</template>

<style lang='less'>
.tree-test-page {
  .qv-tree {
    margin: 0.5rem;
  }
}
</style>