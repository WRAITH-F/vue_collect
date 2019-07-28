<template>
  <div class="index">
    <ul class="index-box">
      <li class="index-left-menu" :style="{height:fullHeight + 'px'}">
        <div class="index-menu-name" v-for="(ml,index) in menuList" @click="switchMenu(index)">{{ml.name}}</div>
      </li>
      <li class="index-right-content" :style="{height:fullHeight + 'px'}">
        <router-view></router-view>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fullHeight: document.documentElement.clientHeight,
        menuList: [{
            name: "无限级目录树",
            path: "/directorTree"
          },
          {
            name: "日期选择器",
            path: "/calendar"
          },
        ]
      }
    },
    mounted() {
      const that = this
      that.switchMenu(0)
      window.onresize = () => { //监听屏幕可用高度
        return (() => {
          window.fullHeight = document.documentElement.clientHeight
          that.fullHeight = window.fullHeight
        })()
      }
    },
    methods: {
      switchMenu(ind) {
        var _this = this
        _this.$router.push({
          url: _this.menuList[ind].path
        })
        for (var i in this.menuList) {
          var menuStyle = document.getElementsByClassName("index-menu-name")[i]
          menuStyle.style.transitionDuration = ".25s"
          if (i == ind) {
            menuStyle.style.color = "#FFFFFF";
            menuStyle.style.background = "#7EC0EE"
          }
          if (i != ind) {
            menuStyle.style.color = "#333333";
            menuStyle.style.background = "#F0FFF0"
          }
        }
      }
    },
    watch: {
      //监听屏幕可用高度
      fullHeight(val) {
        if (!this.timer) {
          this.fullHeight = val
          this.timer = true
          let that = this
          setTimeout(function() {
            that.timer = false
          }, 400)
        }
      }
    }
  }
</script>

<style>
  .index-box {
    width: 100%;
    overflow: hidden;
  }

  .index-left-menu {
    float: left;
    width: 18%;
    overflow-y: auto;
    background: #F0FFF0;
  }

  .index-menu-name {
    cursor: pointer;
    text-align: center;
    width: 100%;
    overflow: hidden;
    padding: 12px 0;
  }

  .index-right-content {
    float: left;
    width: 82%;
    overflow-y: auto;
  }
</style>
