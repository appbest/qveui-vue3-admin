<!--  -->

<script>
import { reactive } from '../../components/vue.api';
import { message } from '../../components'
//import { json } from 'quick.lib'
const testdb = [
  { "ID": 101, "Title": "初始化" },
  { "ID": 201, "Title": "组织2" },
  { "ID": 302, "Title": "组织3" }
]

export default {
  setup () {

    const the = reactive({
      url: '',
      radioGroupList: {
        '初始': 0, '正常': 1, '已审': 2, '撤审': 3, '删除': 4
      }, typeList: ['初始', '正常', '已审', '撤审', '删除'],
      data: {
        // 演示 json 类型适应，可改为对象测试
        jsonValue: '',
        ID: 123,
        modelID: 0,
        userId: 0,
        name: '',
        password: 'abc',
        type: '初始',
        typeCk: [3],
        ubb: '&lt;b&gt;sdfdsf&lt;/b&gt;',
        tel: 1890000000,
        startDate: '2020-09-02',
        startTime: '12:51:32',
        endTime: '2020-09-08 12:01',
        pop: '商家名',
        bool: false,
      },
      /** 规则 */
      rules: {
        password: [
          { "required": true, "message": "请输入密码", "trigger": "blur" },
          { "type": "string", "min": 6, "message": "长度必须大于6位", "trigger": "blur" },
          { 'tip': '测试规则提示' }
        ]
      },
      ui: {
        attr: {
          ID: { v: 0, t: 'Int64', c: 'panel', api: '/Api/QF_Group/' },
          modelID: { v: 0, t: 'Int64', c: 'panel', api: '/Api/QF_Model/' },
          userId: { v: 0, t: 'Int64', c: '' },
          type: {
            ls: "0:初始,1:正常,2:已审,3:撤审,4:删除"
          },
          bool: { t: 'bool' },
          tel: { t: 'tel' },
          name: {},
        }
      },
      /** 对话框 */
      modal: {
        title: '请勾选',
        show: false
      },
      /** 面板 */
      panel: {
        // 数据源地址
        api: '',
        // 返回绑定的主键
        named: '',
        // 查询字段
        field: {},
        // 查询数据
        list: []
      },
      tag: {
        key: '',
        css: ['default', 'info', 'primary', 'success', 'error', 'warning']
      },
      pop: {
        // 样式定位
        styled: {}
      }
    });

    const onRespEvent = (resp) => {
      console.log('onRespEvent', resp)
      switch (resp.cmd) {
        case 'error':
          message.error('错误', { text: resp.message })
          break;
      }
    }

    // 组织点击
    const onGroupEvent = (resp) => {
      console.log('onGroupEvent:', resp);

      switch (resp.cmd) {
        case 'icon':
          // 字段
          the.panel.field = {
            "ID": "编号",
            "Title": "描述"
          }

          // 数据
          the.panel.list = testdb
          the.modal.show = true
          break;

        case 'search':
          // 查询
          break
      }
    }

    /** 输入事件 */
    const onInputEvent = (resp) => {

      console.log('onInput:', resp);

      // the.panel.api = '/Api/QF_Group/'


      let _api = '';

      if (the.ui.attr && resp.id) {
        _api = the.ui.attr[resp.id].api || ''
      }


      console.log('onInput:' + resp.id, _api);

      the.panel.api = _api
      the.panel.named = resp.id
      // the.modal.show = true
    }

    /** 日期触发 */
    const onDateEvent = (resp) => {
      console.log('onDateEvent', resp)
      switch (resp.cmd) {
        case 'InputPlus':
          // 输入框外挂事件
          break
      }

    }

    /** 面板触发事件 */
    const onPanelEvent = (resp) => {
      console.log('onGroupEvent:', JSON.stringify(resp));

      switch (resp.cmd) {
        case 'checkAll':
          // 全选
          break;
        case 'checked':
          if (resp.item) {
            // 选择的数据选项
            the.data[resp.named] = resp.item.ID
          }
          // the.modal.show = false
          break;

        case 'close':
          // 关闭窗口
          the.modal.show = false
          break;
      }


    }


    /** 标签事件 */
    const onTagEvent = (resp) => {

      switch (resp.cmd) {

        case 'close':
          // 关闭
          the.tag.css.splice(parseInt(resp.name), 1)
          break;
        case 'click':
        default:
          console.log('onTagEvent:', resp);
          break;
      }
    }

    const onSwitch = (resp) => {
      console.log('onSwitch:', resp);
    }

    /** 全选 */
    const onCheckEvent = (resp) => {
      console.log('onCheckEvent:', resp);

      //resp.value 是组件自定义绑定值，根据实际应用定义
      if (resp.value === 'all') {
        // 全选
        let _list = []
        if (resp.checked) {
          // 选中
          for (let i in the.typeList) {
            _list.push(i)
          }
        }
        the.data.typeCk = _list
      }
    }

    const onBtnEvent = (res) => {
      console.log(res);
    }

    const onRdoEvent = (resp) => {
      the.data.typeCk = [];
      the.data.typeCk.push(resp.value)
      console.log('onRdoEvent', resp);
    }


    const onPlusEvent = (resp) => {
      switch (resp.cmd) {
        case 'InputPlus': //触发控件事件   

          if (resp.event) {
            // 触发当前对象
            const dom = resp.event;
            let _pop = {
              l: dom.offsetLeft,
              t: dom.offsetTop,
              cx: dom.clientX,
              cy: dom.clientY,
              sx: dom.clientX,
              sy: dom.screenX,
              w: dom.screenY,
              h: dom.clientHeight,
              x: dom.layerX,
              y: dom.layerY,
              z: dom.zIndex,
            }
            console.log(_pop)
            the.pop.styled.left = dom.offsetLeft + 'px'
          }

          the.data.bool = !the.data.bool
          break;
        default:

          break;
      }

      console.log(resp)
    }

    return { the, onRespEvent, onGroupEvent, onInputEvent, onPanelEvent, onTagEvent, onSwitch, onCheckEvent, onDateEvent, onPlusEvent, onBtnEvent, onRdoEvent }
  },
}

</script>

<template>
  <div class="text-test-page">
    <Modal :title="the.modal.title"
           :show="the.modal.show"
           footer-hide
           @onEvent="onPanelEvent">
      高级组件 选择查询面板

      <!-- <PanelForm :named="the.panel.named"
                 :api="the.panel.api"
                 :field="the.panel.field"
                 :list="the.panel.list"
                 @onEvent="onPanelEvent" /> -->
    </Modal>

    <Form class="text-test-page-form"
          label-width="7rem"
          label-mark="："
          :model="the.data"
          :rules="the.rules">
      <Field label="密码测试"
             prop="password">
        <Input v-model="the.data.password"
               type="password"
               placeholder="Enter password" />
      </Field>
      <Field label="组织ID"
             prop="ID">
        <Input v-model="the.data.ID"
               placeholder="请输入组织ID"
               type="number"
               icon="icon-sousuo"
               @onEvent="onGroupEvent" />
      </Field>

      <Field label="外键查询"
             prop="ID">
        <Input v-model="the.data.ID"
               placeholder="请输入ID"
               style="width:12rem"
               type="number"
               icon="icon-sousuo"
               @onEvent="onGroupEvent" />
      </Field>

      <Field>
        <Input v-model="the.url"
               disabled
               placeholder="测试同步，请在下面多行输入" />
      </Field>

      <Field>
        <Textarea v-model="the.url"
                  placeholder="请输入多行文本框"
                  spellcheck="false"
                  rows="3"
                  @onEvent="onRespEvent" />
      </Field>
      <Field>
        <Textjson v-model="the.data.jsonValue"
                  placeholder="请输入json"
                  spellcheck="false"
                  rows="10"
                  @onEvent="onRespEvent" />
      </Field>
      <Field>
        <TextUbb v-model="the.data.ubb"
                 spellcheck="false"
                 rows="5"
                 @onEvent="onRespEvent" />
      </Field>
      <Field label="图标">
        <Icon type="icon-star" />

        <Badge dot>
          测试dot
        </Badge>

        <Badge text="99+">
          测试文本
        </Badge>
      </Field>
      <Field>
        <Tag v-for="(item, index) in the.tag.css"
             :key="index"
             :name="index"
             :css="item"
             closable
             @onEvent="onTagEvent">
          {{ item }}
        </Tag>
      </Field>

      <Field label="基础组件选项"
             tip="测试">
        <Select v-model="the.data.type"
                @onEvent="onRespEvent">
          <option v-for="(item,index) in the.typeList"
                  :key="index"
                  :value="item">
            {{ item }}
          </option>
        </Select>
      </Field>

      <Field label="多选">
        <Checkbox value="all"
                  @onEvent="onCheckEvent" /> 全选
        <template v-for="(item, index) in the.typeList">
          <Checkbox v-model="the.data.typeCk"
                    :value="index" />
          {{ item }}
        </template>
      </Field>
      <Field label="群组">
        <!-- name:自定义群组名 -->
        <RadioGroup :list="the.radioGroupList"
                    @onEvent="onRdoEvent" />
      </Field>
      <Field label=" 单项用">
        <Switch v-model="the.data.bool"
                @onEvent="onSwitch" />

        <span style="padding:0 0.5rem;">
          <!--   @onEvent="监听事件" -->
          <Radio v-model="the.data.bool"
                 value="true"
                 name="test-radio-text2" />

          是1

          <Radio v-model="the.data.bool"
                 value="false"
                 name="test-radio-text2" />
          否0
        </span>
      </Field>
      <Field label="开始日期"
             prop="startDate">
        <DatePicker v-model="the.data.startDate"
                    type="date"
                    placeholder="请选择日期" />
        <TimePicker v-model="the.data.startTime"
                    placeholder="请选择日期与时间" />
      </Field>

      <Field label="截止时间"
             prop="endTime">
        <DatePicker v-model="the.data.endTime"
                    type="datetime"
                    placeholder="请选择日期与时间" />
        <Tooltip content="时间选择">
          ？
        </Tooltip>
      </Field>

      <Field label="外键商家">
        <Input v-model="the.data.pop"
               icon="icon-shangdian"
               placeholder="请输入商家ID"
               @onEvent="onPlusEvent" />
        <Poptip v-if="the.data.bool"
                :style="the.pop.styled"
                class="pop-shop-text">
          <ul>
            <li>全局测试列表</li>
            <li>测试列表2</li>
          </ul>
        </Poptip>
      </Field>
      <Field>
        <Button type="primary"
                @onEvent="onBtnEvent">
          <Icon type="icon-sousuo" /> 提交
        </Button>

        <Tooltip content="重置sdfdasfasfasf数据fas3344sadfasdfs触发当前对象触发当前对象触发当前对象触发当前对象"
                 style="margin-left:1rem">
          <Button>
            重置
          </Button>
        </Tooltip>
      </Field>
    </Form>
    <div class="data-test">
      {{ the.data }}
    </div>
  </div>
</template>

<style lang='less' >
.text-test-page {
  .data-test {
    padding: 0.5rem 1rem;
  }

  &-form {
    padding: 0.5rem;
  }

  .pop-shop-text {
    li {
      padding: 1rem;
      border-bottom: 1px solid #eee;
    }

    li:hover {
      background-color: aqua;
    }
  }
}
</style>