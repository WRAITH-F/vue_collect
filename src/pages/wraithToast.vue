<template>
  <div class="wraith-toast">
    <div class="wraith-toast-box">
      <div class="wraith-toast-button" @click="postbirdAlert()">窗口1</div>
      <div class="wraith-toast-button" @click="postbirdConfirm()">窗口2</div>
      <div class="wraith-toast-button" @click="postbirdPrompt()">窗口3</div>
    </div>
  </div>
</template>

<script>
  // 弹窗组件
  import {PostbirdAlertBox} from "@/components/wraithToast/wraithToast.js";
  export default {
    data() {
      return {

      }
    },
    methods: {
      postbirdAlert() {
        console.log(2222)
        ///判断用户名
        PostbirdAlertBox.alert({
          title: "提示",
          content: "弹出窗口1",
          okBtn: "好的",
          contentColor: "red",
          okBtnColor: "#0e90d2",
          onConfirm: function() {
            // console.log("回调触发后隐藏提示框");
          }
        });
      },
      postbirdConfirm() {
        PostbirdAlertBox.confirm({
          title: "!提示",
          content: "弹出窗口2",
          okBtn: "好的",
          contentColor: "red",
          onConfirm: function() {
            console.log("OK - 回调触发后隐藏提示框");
          },
          onCancel: function() {
            console.log("Cancel-回调触发后隐藏提示框");
          }
        });
      },
      postbirdPrompt() {
        PostbirdAlertBox.prompt({
          title: "弹出窗口3",
          okBtn: "提交",
          onConfirm: function(data) {
            console.log("输入框内容是：" + data);
          },
          onCancel: function(data) {
            console.log("输入框内容是：" + data);
          }
        });
      }
    }
  }
</script>

<style>
  @import url("../components/wraithToast/wraithToast.css");
  .wraith-toast-box {
    float: left;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  .wraith-toast-button {
    margin-bottom: 20px;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c4c4c4;
    color: #1f2d3d;
    margin: 0;
    padding: 10px 15px;
    border-radius: 4px;
    margin: 32px 16px;
  }

  .wraith-toast-button:hover {
    transition-duration: .25s;
    border: 1px solid rgb(126, 192, 238);
    color: rgb(126, 192, 238);
  }
</style>
