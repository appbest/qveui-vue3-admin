
<template>
  <div class="login-page">
    <div class="page-bg">
      <ImgGlass :src="the.imgGlassUrl"
                :filter="the.imgGlassFilter"
                @click="onImgGlass" />
    </div>
    <span class="login-page-bar">
      <router-link to="/">
        <Icon type="icon-jiantou"> 主页</Icon>
      </router-link>
      |
      <Icon type="icon-quanping"
            @click="fullScreen"> 全屏</Icon>

    </span>

    <div class="login-page-box">
      <div class="head">
        Quick Engineering
      </div>
      <Form label-position="top"
            :model="the.formData"
            :rules="ruleInline"
            label-width="4rem"
            label-mark="："
            @onEvent="onFormEvent">
        <Field label="用户名"
               prop="code">
          <Input v-model="the.formData.code"
                 placeholder="Enter LoginCode"
                 autofocus />
        </Field>
        <Field label="密码"
               prop="password">
          <Input v-model="the.formData.password"
                 type="password"
                 placeholder="Enter password" />
        </Field>

        <Field label="验证码"
               prop="vailCode"
               class="vail-code-field">
          <Input v-model="the.formData.vailCode"
                 placeholder="请输入右边验证码"
                 css="vail-code"
                 :clearable="false" />
          <Tooltip content="点此刷新验证码">
            <ImgLazy class="vail-code-img"
                     :src="the.formData.vailImgUrl"
                     @click="getImgVailUrl"
                     @onEvent="onImgEvent" />
          </Tooltip>
        </Field>

        <Field class="center">
          <Button type="primary"
                  @click="sendLogin">
            登录
          </Button>
        </Field>
      </Form>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from '../../components/vue.api';
import { message } from '../../components/'

import { setAppToken } from '../../store'
import { html } from 'quick.lib';
//import { setAppToken } from '../../store'
// 路由
import router from '../../router'
import { host } from '../../router/url'

import { imgGlassList } from '../../router/url'

export default {
  setup () {

    // 引入上下文
    // const { ctx } = getCurrentInstance()
    // 全局
    // const $plus = window.$plus
    // //const $qvui = window.$plus.qvui
    // const reactive = $plus.vue.reactive
    // const onMounted = $plus.vue.onMounted

    const the = reactive({
      /** 表单数据 */
      formData: {
        code: '', password: '', vailCode: '', vailImgUrl: '',
        remember: false,
        // 是否通过验证
        isPass: false
      },
      /** 图片地址 */
      imgGlassUrl: '',
      /** 图片效果 */
      imgGlassFilter: null
    });


    // 验证规则
    const ruleInline = reactive({
      code: [
        { required: true, min: 2, message: '请输入用户名', trigger: 'blur' },
        { type: 'string', min: 3, message: '长度必须大于3位', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { type: 'string', min: 6, message: '长度必须大于6位', trigger: 'blur' }
      ],
      vailCode: [
        { required: true, message: '请输入左边图片中的内容', trigger: 'blur' },
        { type: 'string', min: 4, message: '长度必须大于4位', trigger: 'blur' }
      ]
    });


    /**
     * 回调验证事件
     */
    const onFormEvent = (resp) => {
      //  console.log('onFormEvent', val)

      switch (resp.cmd) {
        case 'validator':
          // 数据验证
          if (resp.isPass) {
            the.formData.isPass = resp.isPass
          }
          break;

        // case 'enter':
        //   //回车
        //   sendLogin()
        //   break;
      }

    }

    /**
     * 发送登录请求event
     */
    const sendLogin = () => {

      // 阻止页面提交
      // event.preventDefault();

      if (the.formData.isPass) {

        LoginPass(
          {
            "userID": the.formData.code,
            "roleID": 1,
            "groupID": 1,
            "nickName": "测试" + the.formData.code,
            "access_token": "1adb4be4",
            "expires_in": 7200,
            "refresh_token": "2f40510f4b3081"
          }

        )
      }

    };

    /**
     * 登录成功
     */
    const LoginPass = (data) => {



      let _rb = setAppToken(data)
      if (_rb) {
        // 登录跳转
        message.success('登录成功！正在跳转')

        //是否有带指定跳转地址,外网请求
        let _rurl = html.getUrlPars('redirect');
        if (_rurl) {
          //  _rurl = 'redirect=' + _rurl;
          window.location.href = _rurl;
        } else {
          //来源路由
          router.push('/workplace')
        }
      }
    }



    /**
     * 自动登陆
     */
    const AutoLogin = () => {

      // // 读取本地缓存
      // const _state = $plus.getCacheState();
      // // console.log(_state);

      // if (_state && _state.refresh_token) {
      //   // 使用 刷新票据自动登陆
      // }
    }

    /**
     * 获取验证码图片
     */
    const getImgVailUrl = () => {
      the.formData.vailImgUrl = host.base + '/Auth/ImgCode?k=login&v=' + Math.random();
      // console.log(the.formData.vailImgUrl);
    }

    const btnReg = (event) => {
      // 阻止页面提交
      event.preventDefault();
      // let _val = $quick.bll.toDecimal(4984, 3, 'f')

      // console.log(_val)
    }



    const _imgGlassArr = imgGlassList()

    /** 毛玻璃效果触发更新 */
    const onImgGlass = (e) => {
      console.log(e);
      // _imgArr.length  - 期望的最大值
      let _int = parseInt(Math.random() * (_imgGlassArr.length), 10)

      console.log('onImgGlass', _int)

      the.imgGlassUrl = _imgGlassArr[_int][0]
      the.imgGlassFilter = _imgGlassArr[_int][1]
    }

    /** 图片延迟加载触发事件 */
    const onImgEvent = (resp) => {
      console.log('onImgEvent', resp)
      switch (resp.cmd) {
        case 'onerror':
          message.error('请重新获取验证码')
          break;
      }
    }

    let _isFullScreen = false;
    /** 全屏 */
    const fullScreen = () => {
      _isFullScreen = !_isFullScreen
      html.fullScreen(_isFullScreen);
    }


    /**
     * 页面初始化
     */
    const init = () => {
      onImgGlass();
      AutoLogin()
      // 页面加载完 获取验证码
      getImgVailUrl();
    }


    // DOM 首次加载完毕之后，才能获取到元素的引用
    onMounted(init);

    return { the, ruleInline, status, sendLogin, onFormEvent, getImgVailUrl, btnReg, onImgGlass, onImgEvent, fullScreen };
  }
}
</script>
