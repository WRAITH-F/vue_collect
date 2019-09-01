<template>
  <nav class="pagination">
    <div class="jump-page-box" id="show_box">
      <input type="button" value="GO" class="go_btn" readonly="readonly" @click.stop="GObtn()" />
    </div>
    <ul class="page-ul">
      <li
        @click="setPageFirst(pageList[1])"
        class="first_page"
        :class="isfirstP?'first_page_unclass':'first_page'"
      >{{firstHtml}}</li>
      <li
        @click="setPage(pageList[0])"
        class="previous_page"
        :class="hasPreviousP?'previous_page':'previous_page_unclass'"
      >{{prevHtml}}</li>
      <p>第</p>
      <input
        @keyup.stop="myFunction($event)"
        v-model="pageJumpSelect"
        @change="Resive_pageJumpSelect"
        type="text"
        class="jump-page"
      />
      <p>页</p>
      <li
        @click="setPage(pageList[pageList.length-1])"
        class="next_page"
        :class="hasnextP?'next_page':'next_page_unclass'"
      >{{nextHtml}}</li>
      <li
        @click="setPageLast(pageList[pageList.length-2])"
        class="last_page"
        :class="islastP?'last_page_unclass':'last_page'"
      >{{lastHtml}}</li>
    </ul>
    <div class="displayPage">
      <p>当前显示</p>
      <div class="selectPage" @click.stop="selectPage">
        {{ pageSize }}
        <ol style="width: 44px; font-size: 12px;" v-if="isShowPageSelect">
          <li v-for="item in pageSelect" @click.stop="enterPage(item)" :key="item.id">{{ item }}</li>
          <!-- <li>|<</li> -->
        </ol>
      </div>
      <p>
        条&nbsp;&nbsp;共
        <span>{{ total }}</span>条数据
      </p>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      // isJumpPage:true,
      isShowPageSelect: false,
      pageJumpSelect: 1,
      isfirstP: true,
      hasPreviousP: false,
      islastP: false,
      hasnextP: true
    };
  },
  props: {
    prevHtml: String, //上一页
    nextHtml: String, //下一页
    firstHtml:{
      type:String,
      default: "首页", //不定义为 <
    },
    lastHtml:{
      type:String,
      default:"尾页"
    },
    pageNum: Number, //默认页码
    total: Number, //总条数
    pageSize: Number, //每页最大显示条数
    maxPage: Number, //分页导航
    pageSelect: {
      type: Number,
      default: [10, 20, 50, 100]
    } //每页最大显示条数选择
    // isJumpPage:Boolean,
  },
  computed: {
    pageList: function() {
      var _this = this,
        pageList = [];
      let pageCount = Math.ceil(_this.total / _this.pageSize);
      let pageNum = _this.pageNum;
      let prevHtml = _this.prevHtml ? _this.prevHtml : "&lt;";
      let nextHtml = _this.nextHtml ? _this.nextHtml : "&gt;";
      let maxPage = _this.maxPage ? _this.maxPage : 5;

      let hasPrev = pageNum > 1;
      let hasNext = pageNum < pageCount;
      //上一页
      pageList.push({
        class: hasPrev ? "" : "disabled",
        pageNum: hasPrev ? pageNum - 1 : pageNum,
        html: prevHtml
      });
      //首页
      pageList.push({
        class: pageNum == 1 ? "active" : "",
        pageNum: 1,
        html: 1
      });
      var p0 = Math.floor(maxPage / 2);
      var p1 = 1 + 2 + p0; //首页+省略至少2个页码+中间页面数的一半
      var start, end;
      if (pageNum >= p1) {
        start = pageNum - p0;
        //前置省略号
        pageList.push({
          class: "dot",
          pageNum: pageNum,
          html: "..."
        });
      } else {
        start = 2;
      }
      var p2 = pageNum + p0;
      if (p2 < pageCount) {
        end = p2;
      } else {
        end = pageCount - 1;
      }
      //页码列表
      for (let i = start; i <= end; i++) {
        pageList.push({
          class: pageNum == i ? "active" : "",
          pageNum: i,
          html: i
        });
      }

      if (end < pageCount - 1) {
        //后置省略号
        pageList.push({
          class: "dot",
          pageNum: pageNum,
          html: "┅"
        });
      }
      //尾页
      if (pageCount > 1) {
        pageList.push({
          class: pageNum == pageCount ? "active" : "",
          pageNum: pageCount,
          html: pageCount
        });
      }
      //下一页
      pageList.push({
        class: hasNext ? "" : "disabled",
        pageNum: hasNext ? pageNum + 1 : pageNum,
        html: nextHtml
      });
      return pageList;
    }
  },
  methods: {
    //修改值
    Resive_pageJumpSelect(e) {
      let _this = this;
      _this.pageJumpSelect = e.target.value;
    },
    //go跳转页面
    GObtn() {
      let _this = this;
      if (_this.pageJumpSelect <= 1) {
        _this.pageJumpSelect = 1;
        this.$emit("pagehandler", 1);
        _this.isfirstP = true;
        _this.hasPreviousP = false;
        _this.islastP = false;
        _this.hasnextP = true;
      } else if (
        _this.pageJumpSelect >= Math.ceil(_this.total / _this.pageSize)
      ) {
        _this.pageJumpSelect = Math.ceil(_this.total / _this.pageSize);
        this.$emit("pagehandler", Math.ceil(_this.total / _this.pageSize));
        _this.isfirstP = false;
        _this.hasPreviousP = true;
        _this.islastP = true;
        _this.hasnextP = false;
      } else {
        this.$emit("pagehandler", parseInt(_this.pageJumpSelect));
        _this.isfirstP = false;
        _this.hasPreviousP = true;
        _this.islastP = false;
        _this.hasnextP = true;
      }
      // _this.pageJumpSelect = "";
      // console.log("dada");
    },
    // 输入跳转页面
    myFunction(e) {
      let _this = this;
      //只能输入数字
      _this.pageJumpSelect = e.target.value.replace(/[^\d]/g, "");
      //判断是否按下enter按键
      if (e.keyCode == 13) {
        if (e.target.value <= 1) {
          _this.pageJumpSelect = 1;
          this.$emit("pagehandler", 1);
          _this.isfirstP = true;
          _this.hasPreviousP = false;
          _this.islastP = false;
          _this.hasnextP = true;
        } else if (e.target.value >= Math.ceil(_this.total / _this.pageSize)) {
          _this.pageJumpSelect = Math.ceil(_this.total / _this.pageSize);
          this.$emit("pagehandler", Math.ceil(_this.total / _this.pageSize));
          _this.isfirstP = false;
          _this.hasPreviousP = true;
          _this.islastP = true;
          _this.hasnextP = false;
        } else {
          this.$emit("pagehandler", parseInt(e.target.value));
          _this.isfirstP = false;
          _this.hasPreviousP = true;
          _this.islastP = false;
          _this.hasnextP = true;
        }
        // _this.pageJumpSelect = "";
      }
    },
    //点击分页
    setPage(item) {
      let _this = this;
      if (item.class == "") {
        _this.pageJumpSelect = item.pageNum;
        this.$emit("pagehandler", item.pageNum);
        // console.log(item)
        if (item.pageNum == 1) {
          _this.isfirstP = true;
          _this.hasPreviousP = false;
          _this.islastP = false;
          _this.hasnextP = true;
        } else if (
          _this.pageList[_this.pageList.length - 2].pageNum == item.pageNum
        ) {
          _this.isfirstP = false;
          _this.hasPreviousP = true;
          _this.islastP = true;
          _this.hasnextP = false;
        } else {
          _this.isfirstP = false;
          _this.hasPreviousP = true;
          _this.islastP = false;
          _this.hasnextP = true;
        }
      }
    },
    // 跳转到首页
    setPageFirst(item) {
      let _this = this;
      if (item.class == "") {
        this.pageJumpSelect = 1;
        this.$emit("pagehandler", 1);
        _this.isfirstP = true;
        _this.hasPreviousP = false;
        _this.islastP = false;
        _this.hasnextP = true;
      }
    },
    // 跳转到尾页
    setPageLast(item) {
      let _this = this;
      if (item.class == "") {
        this.pageJumpSelect = item.pageNum;
        this.$emit("pagehandler", item.pageNum);
        _this.isfirstP = false;
        _this.hasPreviousP = true;
        _this.islastP = true;
        _this.hasnextP = false;
      }
    },
    //显示每页显示条数
    selectPage() {
      this.isShowPageSelect = true;
    },
    //每页最大显示条数
    enterPage(item) {
      this.$emit("pageSizeSelect", item);
      this.$emit("pagehandler", 1);
      this.pageJumpSelect = 1;
      this.isShowPageSelect = false;
    }
  },
  mounted() {
    document.addEventListener("click", e => {
      if (!this.$el.contains(e.target)) {
        this.isShowPageSelect = false;
      }
    });
  }
};
</script>

<style scoped>
p,
ol {
  margin: 0;
  padding: 0;
}

.pagination {
  min-width: 518px;
  float: left;
  text-align: right;
  font-family: arial;
  clear: both;
  height: 32px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top: 19px;
}

.pagination ul {
  float: right;
  padding: 0 8px;
  /* position: relative;
    top: 3px;
    left: 23px; */
}

.pagination ul li {
  -webkit-user-select: none;
  display: inline-block;
  /* color: #222222; */
  margin: 0 4px;
  padding: 0 12px;
  border: 1px solid #ccc;
  background: #fff;
  font-size: 12px;
  min-width: 24px;
  height: 32px;
  line-height: 32px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 4px;
}

.pagination ul li:last-child {
  border-right: 1px solid #d1dbe5;
}

.pagination ul li.active {
  border-color: #529ae1;
  background-color: #529ae1;
  color: #fff;
  cursor: default;
}

.pagination ul li.active:hover {
  color: #fff;
}

.pagination ul li.disabled {
  cursor: not-allowed;
  color: #cccccc;
}

.pagination ul li.dot {
  cursor: default;
}

.pagination .displayPage {
  float: right;
  height: 32px;
  line-height: 32px;
  margin-right: 24px;
  /* color: #222222; */
  display: flex;
  align-items: center;
}

.pagination .displayPage p,
.pagination .displayPage div {
  float: left;
}

.pagination .displayPage div.selectPage {
  width: 44px;
  height: 32px;
  line-height: 32px;
  border: solid 1px #f4f4f4;
  margin: 0 4px;
  margin-bottom: 0;
  cursor: pointer;
  text-align: left;
  padding: 0 4px;
  position: relative;
  border-radius: 4px;
  box-sizing: border-box;
}

.pagination .displayPage div.selectPage:after {
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #cccccc;
  content: "";
  position: absolute;
  right: 4px;
  top: 12px;
  width: 0;
}

.pagination .displayPage div.selectPage ol {
  list-style: none;
  position: absolute;
  bottom: 30px;
  left: -1px;
  background: #fff;
  width: 52px;
  border: solid 1px #f4f4f4;
  z-index: 999;
}

.pagination .displayPage div.selectPage ol li {
  padding: 0 4px;
}

.pagination .displayPage div.selectPage ol li:hover {
  background-color: #f1f7fc;
}

.pagination .displayPage p span {
  color: #529ae1;
}

.jump-page-box {
  float: right;
  position: relative;
  left: 0;
  top: 0;
  font-size: 12px;
}

.jump-page {
  float: left;
  width: 32px;
  height: 32px;
  outline: none;
  margin-right: 2px;
  border-radius: 4px;
  border: 1px solid rgb(218, 218, 218);
  text-align: center;
}
.displayPage {
  position: relative;
  right: -16px;
  font-size: 12px;
}
.go_btn {
  cursor: pointer;
  width: 42px;
  height: 32px;
  line-height: 32px;
  border: 1px solid rgb(218, 218, 218);
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  text-align: center;
  font-size: 12px;
  color: #606266;
  /* margin-left: 8px; */
}

.first_page {
  cursor: pointer !important;
  color: #606266 !important;
}

.previous_page {
  cursor: pointer !important;
  color: #606266 !important;
}

.last_page {
  cursor: pointer !important;
  color: #606266 !important;
}
.next_page {
  cursor: pointer !important;
  color: #606266 !important;
}

.first_page_unclass {
  cursor: not-allowed !important;
  color: #cccccc !important;
}

.previous_page_unclass {
  cursor: not-allowed !important;
  color: #cccccc !important;
}

.last_page_unclass {
  cursor: not-allowed !important;
  color: #cccccc !important;
}
.next_page_unclass {
  cursor: not-allowed !important;
  color: #cccccc !important;
}

.page-ul li {
  font-size: 14px;
  font-weight: bold;
}

.page-ul li,
.page-ul p {
  float: left;
}
.page-ul p {
  line-height: 32px;
  font-size: 12px;
  margin: 0 4px;
}
</style>
