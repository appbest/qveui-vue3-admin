<!-- 代码测试 -->
<template>
  <div class="test-code-page">
    <CodeRun dll="bll"
             editable>
      <pre>
        let _str = ' 77.88888 ';

        let _jsonstr = `{id:123}`;

        let _timestr = `2020-12-01`;

        let resp = {
        // // 和使用原生方法一致
        trim: _str.trim(),
        json: _jsonstr.toJson(),
        money: _str.toFloat(),
        time: _timestr.toDate(),
        };

        //console.log('ubb', resp);
        //alert('完成\r\n' + resp);
        return resp;
      </pre>
    </CodeRun>
  </div>
</template>

<script>
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
  // created(){}
  setup (props, context) {


    return {}


  },
}

</script>
<style lang='less'>
.test-code-page {
  margin: 1rem;
  .qv-code-run {
    .code-pre {
      color: #f5f5f5;
      height: 10rem;
      background-color: rgb(40, 44, 52);
      font-size: 0.8rem;
      //
    }
  }
}
</style>