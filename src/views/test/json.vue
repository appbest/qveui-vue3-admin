<template>
  <div class="test-json-page">
    <Toolbar>
      <Button @click="btnEvent('tree')">
        转为树
      </Button>
    </Toolbar>
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
import { reactive, computed, watchEffect } from "vue";
import { json } from 'quick.lib'

const testJsonData = {
  index: 0,
  total: 0,
  count: 0,
  "tpl": {
    "sql": "@ID,@Code,@Title,@AppKey,@DBName,@TableName,@AttrJson,@StateFlag,@Record,@Verify,@Encode,@EncodeField,@Remark,@Q_Time,@Q_UserID,@Q_StateFlag",
    "field": {
      "ID": "编号",
      "Code": "索引编码",
      "Title": "描述",
      "AppKey": "应用Key",
      "DBName": "分布数据库名",
      "TableName": "数据表名", "AttrJson": "属性", "StateFlag": "启用审核", "Record": "启用操作记录", "Verify": "启用验证", "Encode": "启用加密", "EncodeField": "加密多字段", "Remark": "备注", "Q_Time": "编辑时间", "Q_UserID": "编辑者", "Q_StateFlag": "编辑状态"
    },
    "attr": {
      "ID": { "v": "编号", "r": 1 },
      "Code": { "v": "索引编码", "n": true, "t": "String", "max": 100 },
      "Title": { "v": "描述", "n": false, "t": "String", "max": 200, "d": 1 },
      "AppKey": { "v": "应用Key", "n": false, "t": "String", "max": 100 },
      "DBName": { "v": "分布数据库名", "n": false, "t": "String", "max": 50 },
      "TableName": { "v": "数据表名", "n": false, "t": "String", "max": 50 },
      "AttrJson": { "v": "属性", "n": false, "t": "String" },
      "StateFlag": { "v": "启用审核", "n": true, "t": "Int32", "tip": "数据审批", "ls": "0:未用,1:启用" },
      "Record": { "v": "启用操作记录", "n": true, "t": "Int32", "tip": "数据验证算法", "ls": "0:未用,1:启用" },
      "Verify": { "v": "启用验证", "n": true, "t": "Int32", "tip": "数据验证算法", "ls": "0:未用,1:启用" },
      "Encode": { "v": "启用加密", "n": true, "t": "Int32", "tip": "数据加密", "ls": "0:未用,1:启用" },
      "EncodeField": { "v": "加密多字段", "n": false, "t": "String", "max": 500, "tip": "多个用,号隔开" },
      "Remark": { "v": "备注", "n": false, "t": "String" },
      "Q_Time": { "v": "编辑时间", "n": true, "t": "DateTime", "r": 1, "e": 1 },
      "Q_UserID": { "v": "编辑者", "n": true, "t": "Int64", "r": 1, "e": 1 },
      "Q_StateFlag": { "v": "编辑状态", "n": true, "t": "Int32", "r": 1, "e": 1, "a": 1 }
    }, "act": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 16]
  }, "code": 1, "err": false, "objType": 1, "statusCode": 200
};

export default {
  setup () {

    const the = reactive({
      colL: 12,
      colR: 12,
      /** 对象 */
      jsonObject: testJsonData,
      /** 树 */
      jsonTree: []
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
    const btnEvent = () => {
      //  if (isValidJson(the.jsonObject)) {
      the.jsonTree = json.makeTree(the.jsonObject);
      // }
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
  .qv-top-tools {
    width: 100%;
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
}
</style>