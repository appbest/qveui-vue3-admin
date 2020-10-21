<!-- table -->
<template>
  <div class="test-table-page">
    <dl>
      <dt>
        全选
        <Switch v-model="the.select.desc"
                @onEvent="checkedAll" />
        <input v-model="the.select.desc"
               type="checkbox">
      </dt>
      <!-- <dd>
        <CheckboxGroup v-model="the.select.sort_field">
          <CheckItem v-for="(item, index) in the.columns"
                     :key="index"
                     v-model="the.select.sort_field"
                     :value="item.key">
            {{ item.title }}
          </CheckItem>
        </CheckboxGroup>
      </dd> -->
      <dd>
        {{ the.select.sort_field }}
        <Checkbox v-model="the.select.desc"
                  @onEvent="checkedAll" />
      </dd>
      <dd>
        <span v-for="(item, index) in the.columns"
              :key="index">

          <Checkbox v-model="the.select.sort_field"
                    :value="item.key" />

          {{ item.title }};
        </span>
      </dd>
      <dd></dd>
    </dl>
    {{ the.checkeds }}
    <Table border
           :columns="the.columns"
           :data="the.dataTest"
           :foots="the.foots"
           :checkeds="the.checkeds"
           show-foot
           show-check
           show-index
           style="width:70%"
           @onEvent="tableEvent">
    </Table>
    <br />
    <Table border
           show-check
           show-index
           :columns="the.columns"
           :data="the.data"
           @onEvent="tableEvent" />
    <!-- 分页 -->
    <Paged :count="the.paged.count"
           :current="the.paged.index"
           :page-size="the.paged.size"
           :page-size-opts="the.paged.sizes"
           @onEvent="pagedEvent" />
    <div class="page-foot"></div>
  </div>
</template>

<script>
import { reactive, markRaw, h } from '../../components/vue.api';
import { frame, confirm, message, onSubscribeGlobal } from '../../components'

/** 测试数据 */
const testData = [
  {
    name: 'John Start',
    age: 1,
    address: '<b>New York</b> No. 1 Lake Park',
    date: '2016-10-03'
  },
  {
    name: 'Jim Green',
    age: 2,
    address: 'London No. 1 Lake Park',
    date: '2016-10-01'
  },
  {
    name: 'Joe Black',
    age: 3,
    address: 'Sydney No. 1 Lake Park',
    date: '2016-10-02'
  },
  {
    name: 'Jon Snow',
    age: 4,
    address: 'Ottawa No. 2 Lake Park',
    date: '2016-10-04'
  },
  {
    name: 'John Brown',
    age: 18,
    address: '<b>New York</b> No. 1 Lake Park',
    date: '2016-10-03'
  },
  {
    name: 'Jim Green',
    age: 24,
    address: 'London No. 1 Lake Park',
    date: '2016-10-01'
  },
  {
    name: 'Joe Black',
    age: 30,
    address: 'Sydney No. 1 Lake Park',
    date: '2016-10-02'
  },
  {
    name: 'Jon Snow',
    age: 26,
    address: 'Ottawa No. 2 Lake Park',
    date: '2016-10-04'
  }, {
    name: 'John Brown',
    age: 18,
    address: '<b>New York</b> No. 1 Lake Park',
    date: '2016-10-03'
  },
  {
    name: 'Jim Green',
    age: 24,
    address: 'London No. 1 Lake Park',
    date: '2016-10-01'
  },
  {
    name: 'Joe Black',
    age: 30,
    address: 'Sydney No. 1 Lake Park',
    date: '2016-10-02'
  },
  {
    name: 'Jon Snow',
    age: 26,
    address: 'Ottawa No. 2 Lake Park',
    date: '2016-10-04'
  }, {
    name: 'John Brown',
    age: 18,
    address: '<b>New York</b> No. 1 Lake Park',
    date: '2016-10-03'
  },
  {
    name: 'Jim Green',
    age: 24,
    address: 'London No. 1 Lake Park',
    date: '2016-10-01'
  },
  {
    name: 'Joe Black',
    age: 30,
    address: 'Sydney No. 1 Lake Park',
    date: '2016-10-02'
  },
  {
    name: 'Jon Snow',
    age: 26,
    address: 'Ottawa No. 2 Lake Park',
    date: '2016-10-04'
  },
  {
    name: 'John Brown',
    age: 18,
    address: '<b>New York</b> No. 1 Lake Park',
    date: '2016-10-03'
  },
  {
    name: 'Jim Green',
    age: 24,
    address: 'London No. 1 Lake Park',
    date: '2016-10-01'
  },
  {
    name: 'Joe Black',
    age: 30,
    address: 'Sydney No. 1 Lake Park',
    date: '2016-10-02'
  },
  {
    name: 'Jon End',
    age: 26,
    address: 'Ottawa No. 2 Lake Park',
    date: '2016-10-04'
  }
]

export default {
  // components: {},
  // props: {},
  // data () {
  //   return {
  //   };
  // },
  // computed: {},
  // mounted: {},
  // methods: {},
  // created(){},
  setup () {
    // 引入上下文
    // const { ctx } = getCurrentInstance()



    // 触发按钮
    const btnIndex = (index) => {
      console.log(index, 'index')
      frame.open({
        title: '测试函数组件',
        model: {
          props: the.data[index],
          // 进行组件标记
          // 函数组件
          component: (props) => {
            return h('div', `${props.name}`)
          }
        }
      })
    }

    const the = reactive({
      // 查询组合
      select: {
        // 查询排序的字段，默认是ID
        sort_field: ['name'],
        // 查询模式：降序还是升序
        desc: false,
        // 是否开启多条件查询
        cate_more: false,
        // 选择的查询条件符号
        cate: '=',
        // 查询字段
        field: 'name',
        // 查询组合条件
        where: [],
        // 查询内容
        word: '',
      },
      columns: [
        {
          title: '姓名',
          key: 'name',
          // node 不排序
          type: 'none'
        },
        {
          title: '年龄',
          key: 'age',
          type: 'int',

        },
        {
          title: '地址',
          key: 'address',
          type: 'string',
          /**
           * 事件触发
          * 
          */
          eventKey: 'address'
        },
        {
          title: '日期',
          key: 'date',
          type: 'date'
        }
      ],
      // 默认选择
      checkeds: [0, 2],
      dataTest: [
        {
          name: 'John Brown',
          age: 1,
          address: '<b>New York</b> No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 2,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 3,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        }
      ],
      // 表格底部
      foots: [
        {
          name: '合计',
          // 绑定方法(表格数据)
          age: (data) => {
            let value = 0;
            data.map(item => {
              value += item.age
            });
            //求和
            return value
          }
        }
      ],
      data: [],
      // 查询分页标签
      paged: {
        // 查询地址
        api: '',
        // 查询模板类型 1:接口属性,2:只查询数据，不返回属性,其它自定义
        tpl: 2,
        // 查询条件
        where: [],
        // 查询扩展参数
        par: null,
        // 扩展外键查询
        join: null,
        // join: [
        //   {
        //     tField: 'QF_Group_ID',
        //     cTable: 'AP10000DB.[dbo].[QF_Group]',
        //     cTitle: 'NameShort'
        //   }
        // ],
        // 当前页码
        index: 1,
        // 每页取数据条数
        size: 5,
        // 分页数
        sizes: [5, 10, 30, 50, 100],
        /** 总条数 */
        count: 0,
        // 是否小型分页
        // small: true,
        // 最大页码按钮数
        // max: 4,
        // 页码按钮
        // layout: 'count, sizes, prev, pager, next, jumper',
      },
    });


    /** 
 * 表格触发事件
 * 
 */
    const tableEvent = (resp) => {
      // 触发事件
      console.log('tableEvent', resp)
      switch (resp.cmd) {
        case 'td':
          if (resp.key === 'btn-td-index') {
            // 数据行点击
            btnIndex(resp.index)
          } else {
            // 数据行点击 ，获取点击对象      
            resp.event.currentTarget.innerHTML = "ok";
          }

          break;
        case 'checked':
          // 表格勾选
          the.checkeds = resp.list
          break;
        //thSort 表头排序
        case 'error_thSort':
          // 排序报错
          console.error('test.error_thSort', resp.error)
          message.error('排序错误，请检查配置:' + resp.data.key)
          break;
        default:
          console.log('test.tableEvent', JSON.stringify(resp))
          break;
      }

    }


    const btnSearch = () => {
      the.paged.count = testData.length
      let _start = the.paged.index - 1
      _start = _start * the.paged.size

      let _data = testData.slice(_start, _start + the.paged.size)

      console.log('btnSearch:' + _start, _data)

      the.data = _data


    }

    /** 分页触发事件 */
    const pagedEvent = (val) => {
      console.log('paged', JSON.stringify(val))
      switch (val.cmd) {
        case 'change':
          the.paged.index = val.index;
          btnSearch()
          break;
        case 'size':
          the.paged.size = val.data;
          btnSearch()
          break;
      }

    }

    /**  全选 */
    const checkedAll = (resp) => {
      // console.log('checkedAll', resp);
      if (!resp.checked) {
        //实现反选
        the.select.sort_field = [];
      } else {
        //实现全选
        let _field = [];
        for (let i = 0; i < the.columns.length; i++) {
          _field.push(the.columns[i].key);
        }

        the.select.sort_field = _field
      }
      // console.log(JSON.stringify(the.checkList));

    }


    return { the, tableEvent, checkedAll, pagedEvent }

  }
}

</script>

<style lang="less">
.test-table-page {
  margin: 0.25rem;
}

.page-foot {
  height: 2rem;
}
</style>