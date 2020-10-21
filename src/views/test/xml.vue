<template>
  <div class="test-json-page">
    <Toolbar>
      <Button @click="btnEvent('xml')">
        转为JSON
      </Button>

      <Button @click="btnEvent('core')">
        转为JSON-Core
      </Button>
    </Toolbar>
    <Textarea v-model="the.xmlDoc"
              class="xml-test"
              placeholder="xml" />
    <Row>
      <Col :span="the.colL">
      <Textjson v-model="the.jsonObject"
                placeholder="请输入json"
                spellcheck="false"
                rows="35" />
      <HandleWidth @onEvent="onHandleChange" />
      </Col>
      <Col :span="the.colR">
      <TreeJson :data="the.jsonTree"
                @onEvent="onTreeEvent" />
      </Col>
    </Row>
  </div>
</template>

<script >
import { reactive, watchEffect } from "vue";
import { json, xml } from 'quick.lib'



export default {
  setup () {

    const the = reactive({
      colL: 12,
      colR: 12,
      /** 对象 */
      jsonObject: {},
      /** 树 */
      jsonTree: [],
      xmlDoc: `<?xml version="1.0"?>
<doc>
    <assembly>
        <name>Quick.Plus</name>
    </assembly>
    <members>
        <member name="T:Quick.Plus.QuickViewBLL">
            <summary>
            页面 View 压缩 筛选器
            </summary>
        </member>
        <member name="M:Quick.Plus.QuickViewBLL.#ctor(System.IO.Stream,System.Func{System.String,System.String})">
            <summary>
            页面压缩
            </summary>
            <param name="body">返回内容</param>
            <param name="filter">过滤规则</param>
        </member>
        <member name="M:Quick.Plus.QuickViewBLL.Write(System.Byte[],System.Int32,System.Int32)">
            <summary>
            模板输出
            </summary>
            <param name="buffer"></param>
            <param name="offset"></param>
            <param name="count"></param>
        </member>
        <member name="T:Quick.Plus.QuickViewFilterAttribute">
            <summary>
            视图Html Js Css压缩，清除注释与空格，保留/**/ 块注释，
            QuickBLL.HtmlMin(压缩内容)，处理耗时较长
            建议实际运行启用户缓存默认 CacheBool=true
            </summary>
        </member>
        <member name="P:Quick.Plus.QuickViewFilterAttribute.isViewMin">
            <summary>
            是否启用缓存
            </summary>
        </member>
        <member name="M:Quick.Plus.QuickViewFilterAttribute.#ctor">
            <summary>
             视图Html Js Css压缩
            </summary>
        </member>
        <member name="M:Quick.Plus.QuickViewFilterAttribute.#ctor(System.Boolean)">
            <summary>
            视图Html Js Css压缩
            </summary>
            <param name="_isViewMin">是否启用压缩</param>
        </member>
        <member name="M:Quick.Plus.QuickViewFilterAttribute.OnActionExecuting(Microsoft.AspNetCore.Mvc.Filters.ActionExecutingContext)">
            <summary>
            Action执行前 输出控制
            </summary>
            <param name="filterContext"></param>
        </member>
    </members>
</doc> 
        `
    })


    /** json 树 */
    // const jsonTree = ref("");

    /**
     * 验证是否是 json 字符串
     */
    // const isValidJson = (_obj) => {
    //   return json.isString(_obj);
    // };

    // 自动转换对象到树型
    watchEffect(() => {
      //  if (isValidJson(the.jsonObject)) {
      the.jsonTree = json.makeTree(the.jsonObject);
      // }
    });

    /**
     * 工具按钮事件
     */
    const btnEvent = (cmd) => {
      console.log('btnEvent', cmd)
      switch (cmd) {
        case 'xml':
          the.jsonObject = xml.toJson(the.xmlDoc)
          break;
        case 'core':
          the.jsonObject = xml.toCore(xml.toJson(the.xmlDoc))
          break;
      }
    }

    const onTreeEvent = (resp) => {
      console.log('tree', resp)
    }


    /** 调整宽度 */
    const onHandleChange = (resp) => {

      // if (the._move.w + resp.value > 100) {
      //   the._move.w += resp.value;
      // }

      if (resp.value < 0) {
        the.colL = the.colL + resp.value
        the.colR = the.colR - resp.value
      } else {
        the.colL = the.colL + resp.value
        the.colR = the.colR - resp.value
      }
      console.log(the.colL, the.colR, resp)
      // if (resp.value < 0) {
      //   the.colL--
      //   the.colR++
      // } else {
      //   the.colL++
      //   the.colR--
      // }

    };

    return { the, btnEvent, onTreeEvent, onHandleChange };
  },
};
</script>

<style lang="less">
.test-json-page {
  padding: 1rem;
  .qv-toolbar {
    width: 100%;
    .qv-btn {
      margin-right: 1rem;
    }
  }

  .qv-input-json,
  .qv-tree-json {
    width: 90%;
    margin: 0.25rem;
    height: 80vh;
    overflow: auto;
    border-radius: 0.25rem;
  }

  .qv-input-json,
  .qv-handle-x {
    display: inline-block;
  }
  .qv-handle-x {
    width: 0.25rem;
    background-color: #333;
    height: 10rem;
  }

  .xml-test {
    width: 100%;
  }
}
</style>