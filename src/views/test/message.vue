<!-- 消息提示 -->
<template>
  <div class="test-page">
    <div style="margin:1rem">
      <Button type="dashed"
              @click="btnInfo('all')">
        按钮触发消息提示
      </Button>
      <Button type="error"
              @click="btnInfo('error')">
        消息error
      </Button>
      <Button type="warning"
              @click="btnInfo('warning')">
        消息warning
      </Button>
      <Button type="success"
              @click="btnInfo('success')">
        消息success
      </Button>
      <Button type="info"
              @click="btnInfo('info')">
        消息info
      </Button>
      <Button type="text"
              @click="btnInfo('text')">
        内容消息text
      </Button>
      <Button type="primary"
              @click="btnInfo('clear')">
        <Badge dot>
          清除所有消息
        </Badge>
      </Button>

      <notice title="测试消息"
              show
              type="warning"
              style="top:2rem;right:2rem">
        <div style="padding:0.4rem;padding-top:0">
          <Icon type="icon-star" /> 我是自动关闭的
        </div>
      </notice>
    </div>

    <div style="margin:1rem">
      <!-- <Input v-model="the.frameId" /> -->

      <input v-model="the.frameId"
             class="qv-input"
             style="width:5rem">
      <ButtonGroup>
        <Button type="info"
                @click="close">
          关闭指定id窗口
        </Button>
        <Button type="error"
                @click="clear">
          关闭所有窗口
        </Button>
        <Button type="primary"
                @click="btnWin">
          弹窗
        </Button>
      </ButtonGroup>
      <Button @click="btnWin('model')">
        组件窗口
      </Button>

      <Button @click="btnWin('render')">
        函数组件窗口
      </Button>

      <Button @click="btnWin('html')">
        Html窗口
      </Button>
    </div>

    <Row>
      <Col span="4"><b>注销提示</b></Col>
      <Col span="12">2</Col>
      <Col span="8">3</Col>
    </Row>

    <div>
      <Modal title="注销提示"
             body="是否需要注销当前用户？"
             :show="the.modal.show"
             @onEvent="ModalEvent">
      </Modal>

      <Button @click="the.modal.show=true">
        打开对话框
      </Button>
      <Button @click="btnConfirm">
        打开订阅对话框
      </Button>

      <Button @click="btnConfirm('error')">
        打开订阅对话框
      </Button>
    </div>
  </div>
</template>

<script>
import { reactive, markRaw, h } from '../../components/vue.api';
import { frame, confirm, message, onSubscribeGlobal } from '../../components'
// 引入帮助页面
import { Help } from '../../router/views';
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
  // created () { }
  setup () {

    //const $plus = window.$plus

    //  const $vue = $plus.vue


    // 引入上下文
    // const { ctx } = $vue.getCurrentInstance()

    // const ctx = $plus

    const the = reactive({
      frameId: 'qv-win-drag_1',
      modal: {
        show: false
      }
    });

    const btnWin = (type) => {
      let resp
      let _val = {}
      switch (type) {

        case 'model':

          //  console.log('model', List)
          _val = {
            title: '组件窗口',
            //body: '<h5>body</h5',
            model: {
              props: {
                title: ' 传入的参数'
              },
              // 进行组件标记
              component: markRaw(Help)
            }
          }
          //   console.log('model', _val.model.component)
          break;

        case 'render':
          _val = {
            title: '函数组件窗口',
            //body: '<h5>body</h5',
            model: {
              props: {
                title: ' 传入的参数222'
              },
              // 函数组件
              component: (props,) => {
                //let _text = props.text || ''
                return h('div', `${props.title}`)
                // return () => (
                //   <div>{props.text}</div>
                // )
              }
            }
          }
          break;

        case 'html':
          _val = {
            body: '<h2>body</h2>',
            title: 'html窗口'
          }
          break;

        default:
          resp = frame.open(`网页可见区域宽：document.body.clientWidth
网页可见区域高：document.body.clientHeight
网页可见区域宽：document.body.offsetWidth (包括边线的宽)
网页可见区域高：document.body.offsetHeight (包括边线的宽)
网页正文全文宽：document.body.scrollWidth
网页正文全文高：document.body.scrollHeight
网页被卷去的高：document.body.scrollTop
网页被卷去的左：document.body.scrollLeft
网页正文部分上：window.screenTop
网页正文部分左：window.screenLeft
屏幕分辨率的高：window.screen.height
屏幕分辨率的宽：window.screen.width
屏幕可用工作区高度：window.screen.availHeight
屏幕可用工作区宽度：window.screen.availWidth`,
            'JS获取浏览器窗口大小 获取屏幕，浏览器，网页高度宽度',
            {
              onClose: (opts) => {
                console.log(JSON.stringify(opts))
                // $plus.message.info('点击关闭')
                // 返回当前对话框对象
                confirm({
                  title: '全局订阅事件对话框',
                  body: '<p>是否关闭当前窗口？</p>',
                  // 按钮事件
                  onEvent: (val) => {
                    console.log('JSON.stringify(opts)', val)
                    switch (val.cmd) {
                      case 'ok':
                        // 关闭当前窗口
                        opts.close && opts.close()
                        //对话框确认
                        setTimeout(function () {

                          // $plus.confirm({ show: false })
                          // 异步强制关闭指定窗口，不触发onClose 事件
                          //$plus.frame.close(resp.data.id, true)

                          // 关闭对话框
                          val.close && val.close();
                        }, 2000);

                        break;
                      case 'close':
                      case 'cancel':
                        // 对话框取消
                        // 关闭对话框
                        val.close && val.close();
                        break;
                    }
                    message.info('点击：' + val.cmd)
                    // console.log('ModalEvent', val)
                  }
                })
              }
            })
          break;
      }

      if (!resp) {
        resp = frame.open(_val);
      }

      if (resp && resp.finish && resp.data.id) {

        // 返回当前窗口id,用于更新管理
        the.frameId = resp.data.id
        console.log(the.frameId)
      }
    }

    const close = () => {
      if (the.frameId) {
        console.log(the.frameId)
        let resp = frame.close(the.frameId);
        console.log(JSON.stringify(resp))
      }
    }

    const clear = () => {
      let resp = frame.clear();
      console.log(JSON.stringify(resp))
    }

    /** 消息框 */
    const btnInfo = (type) => {

      // const message =$plus.message;
      let resp;
      switch (type) {
        case 'clear':
          resp = message.clear()
          break
        case 'error':
          resp = message.error('网络异常提示！', { pars: 'errorid121212' })
          break
        case 'warning':
          resp = message.warning('网络警告提示！', { text: '网络警告内容', pars: { id: 5 } })
          break
        case 'success':
          resp = message.success('成功提示！')
          break
        case 'info':
          resp = message.info('info提示！', {
            text: '消息提示内容',
            pars: '点击传递的参数',
            // 不自动关闭
            timeout: 0
          })
          break
        case 'text':
          resp = message.text('消息提示', {
            text: '消息提示内容',
            pars: '点击传递的参数',
            // 不自动关闭
            timeout: 0
          })
          break
        default:
          resp = message.notice({
            title: '点击标题的参数',
            /** 传入点击标题的参数 */
            pars: 'ddd',
            text: `<p>网页可见区域宽：document.body.clientWidth</p>
网页可见区域高：<b>document.body.clientHeight</b>
网页可见区域宽：document.body.offsetWidth (包括边线的宽)
网页可见区域高：document.body.offsetHeight (包括边线的宽)
屏幕可用工作区宽度：window.screen.availWidth`,
            timeout: 80,
            type: 'success' //'info', 'error', 'success', 'warning', 'loading'

          })

      }
      console.log('message', resp)
    }



    /**
     * @param {string} id 收到的事件id
     *  @param {object} data 收到的内容
     *  
     * */
    onSubscribeGlobal(({ id, data }) => {
      console.log('onGlobal:' + id, data)
    })

    /**
     * 对话框按钮触发事件
     */
    const ModalEvent = (val) => {
      console.log('ModalEvent', val)
      switch (val.cmd) {
        case 'ok':
          //对话框确认
          the.modal.show = !the.modal.show
          message.info('点击确认')
          break;
        case 'close':
        case 'cancel':
          // 对话框取消
          the.modal.show = !the.modal.show
          message.info('点击取消')
          break;
      }

    }


    // 订阅方式打开全局对话框
    const btnConfirm = (val) => {
      console.log(val);
      let _resp = {
        title: '全局订阅事件对话框',
        body: '<p>通过订阅事件调用全局对话框</p><p>Content of dialog</p>',
        // 按钮事件
        onEvent: (val) => {
          console.log('btnConfirm', val)
          switch (val.cmd) {
            case 'ok':
              //对话框确认
              setTimeout(function () {
                // 关闭对话框
                resp.data.show = false
                val.close()
              }, 1000);

              break;
            case 'close':
            case 'cancel':
              // 对话框取消
              resp.data.show = false
              break;
          }
          message.info('点击：' + val.cmd)

        },
        // 自定义按钮
        btns: [{
          cmd: 'cancel',
          text: '不卖了'
        }, {
          cmd: 'ok',
          type: 'primary',
          /** 是否显示加载图标 */
          loading: true,
          text: '继续购买'
        }],
      }

      switch (val) {
        case 'error':
          _resp.type = "error"
          break;
        default:
          break
      }

      // 返回当前对话框对象
      console.log(_resp);
      let resp = confirm(_resp)
      console.log(resp, 'confirm')
    }

    return { the, btnWin, close, clear, ModalEvent, btnInfo, btnConfirm }
  }
}

</script>
<style lang='less'>
.test-page {
  padding: 1rem;
  .test-tools {
    margin-bottom: 1rem;
    height: 2rem;
    line-height: 2rem;

    font-size: 0.7rem;
    vertical-align: middle;
    border-bottom: 1px solid #dcdee2;
  }

  .input-css {
    // border: 1px solid chartreuse;
    width: 50%;
    height: 1.6rem;
    vertical-align: middle;
  }

  .input-pre {
    background-color: #dcdee2;
    display: inline-block;
    vertical-align: middle;
    padding: 0 1rem;
    text-align: center;
  }

  .btnSo {
    vertical-align: middle;
    display: inline-block;
    background-color: chocolate;
    padding: 0 0.4rem;
    color: #fff;
    height: 1.6rem;
    line-height: 1.6rem;
    font-size: 0.7rem;
    margin-left: 0.5rem;
  }
  .qv-row {
    margin: 1rem;
  }
  .qv-col {
    background: rgba(5, 97, 143, 0.7);
  }
  .qv-col:nth-child(2n + 1) {
    background: rgba(0, 153, 229, 0.7);
  }

  .qv-btn-group {
    .qv-btn {
      margin: 0;
    }
  }

  .qv-btn {
    margin: 0.25rem;
  }
}
</style>