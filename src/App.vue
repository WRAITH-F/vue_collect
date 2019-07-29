<strong></strong><template>
  <div id="app">
    <ul class="index-box">
      <li class="index-left-menu" :style="{height:fullHeight + 'px'}">
        <div class="index-menu-name" v-for="(ml,index) in menuList" @click="switchMenu(index)">{{ml.name}}</div>
      </li>
      <li class="index-right-content" :style="{height:fullHeight + 'px'}">
        <div class="index-right-content-title">{{menuTitle}}</div>
        <div :style="{height:fullHeight + '-46px'}" class="index-right-content-content">
          <router-view></router-view>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        menuTitle:'',
        fullHeight: document.documentElement.clientHeight,
        menuList: [{
            name: "无限级目录树",
            path: "/directorTree"
          },
          {
            name: "日期选择器",
            path: "/calendarSelect"
          },
          {
            name: "翻页组件",
            path: "/vuePagination"
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
        // 标题
        _this.menuTitle = _this.menuList[ind].name
        // 路由跳转
        _this.$router.push({
          path: _this.menuList[ind].path
        })
        // 选中样式变化
        for (var i in this.menuList) {
          var menuStyle = document.getElementsByClassName("index-menu-name")[i]
          menuStyle.style.transitionDuration = ".25s"
          if (i == ind) {
            menuStyle.style.color = "#FFFFFF";
            menuStyle.style.background = "#7EC0EE"
          }
          if (i != ind) {
            menuStyle.style.color = "#333333";
            menuStyle.style.background = "#f8fbf8"
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
  body,ul,li,div,p{
    margin: 0;
    padding: 0;
    text-decoration: none;
    list-style: none;
    -webkit-user-select: none;
    outline: none;
  }
  .index-box {
    width: 100%;
    overflow: hidden;
  }

  .index-left-menu {
    float: left;
    width: 18%;
    overflow-y: auto;
    background: #f8fbf8;
  }

  .index-menu-name {
    cursor: pointer;
    text-align: center;
    width: 100%;
    height: 42px;
    line-height: 42px;
  }

  .index-right-content {
    float: left;
    width: 82%;
    overflow-y: auto;
  }
  .index-right-content-title{
    text-align: center;
    font-weight: bold;
    width: 100%;
    height: 42px;
    line-height: 42px;
    padding: 0 0 0 16px;
    font-size: 18px;
    color: rgb(126, 192, 238);
    background: #f6f6f6;
  }
</style>
