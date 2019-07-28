<template>
  <nav class="pagination">
     <div class="jump-page-box" id="show_box"  v-if="isJumpPage">
      跳转到
      <input @keyup.stop="myFunction($event)" v-model="pageJumpSelect" type="text" class="jump-page"/>页
    </div>
    <ul class="page-ul">
      <li :key="index" v-for="(item,index) in pageList" :class="item.class" @click.stop="setPage(item)" v-html="item.html">
      </li>
    </ul>
    <div class="displayPage">
      <p>当前显示</p>
      <p class="selectPage" @click.stop="selectPage">
        {{ pageSize }}
        <ol style="width: 44px; font-size: 12px;" v-if="isShowPageSelect">
          <li v-for="item in pageSelect" @click.stop="enterPage(item)" :key="item.id">{{ item }}</li>
        </ol>
      </p>
      <p>条&nbsp;&nbsp;共<span>{{ total }}</span>条数据</p>
    </div>
  </nav>
</template>

<script>
  export default {
    data() {
      return {
        isShowPageSelect: false,
        pageSelect: [10,20, 50, 100], //每页最大显示条数选择
        pageJumpSelect: ''
      }
    },
    props: {
      prevHtml: String, //上一页
      nextHtml: String, //下一页
      pageNum: Number, //默认页码
      total: Number, //总条数
      pageSize: Number, //每页最大显示条数
      maxPage: Number, //分页导航
      isJumpPage:Boolean
    },
    computed: {
      pageList: function() {
        var _this = this,
          pageList = [];
        let pageCount = Math.ceil(_this.total / _this.pageSize);
        let pageNum = _this.pageNum;
        let prevHtml = _this.prevHtml ? _this.prevHtml : '&lt;';
        let nextHtml = _this.nextHtml ? _this.nextHtml : '&gt;';
        let maxPage = _this.maxPage ? _this.maxPage : 5;

        let hasPrev = pageNum > 1;
        let hasNext = pageNum < pageCount;
        //上一页
        pageList.push({
          class: hasPrev ? '' : 'disabled',
          pageNum: hasPrev ? pageNum - 1 : pageNum,
          html: prevHtml
        });
        //首页
        pageList.push({
          class: pageNum == 1 ? 'active' : '',
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
            class: 'dot',
            pageNum: pageNum,
            html: '...'
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
            class: pageNum == i ? 'active' : '',
            pageNum: i,
            html: i
          });
        }

        if (end < pageCount - 1) {
          //后置省略号
          pageList.push({
            class: 'dot',
            pageNum: pageNum,
            html: '┅'
          });
        }
        //尾页
        if (pageCount > 1) {
          pageList.push({
            class: pageNum == pageCount ? 'active' : '',
            pageNum: pageCount,
            html: pageCount
          });
        }
        //下一页
        pageList.push({
          class: hasNext ? '' : 'disabled',
          pageNum: hasNext ? pageNum + 1 : pageNum,
          html: nextHtml
        });
        return pageList;
      }
    },
    methods: {
      // 输入跳转页面
      myFunction(e) {
        let _this = this
        //只能输入数字
        _this.pageJumpSelect = e.target.value.replace(/[^\d]/g,'');
        //判断是否按下enter按键
        if (e.keyCode == 13) {
          if(e.target.value <=0){
             this.$emit('pagehandler', 1);
          }
          else if(e.target.value > Math.ceil(_this.total / _this.pageSize)){
            this.$emit('pagehandler', Math.ceil(_this.total / _this.pageSize));
          }
          else{
            this.$emit('pagehandler', parseInt(e.target.value));
          }
          _this.pageJumpSelect = ''
        }
      },
      //点击分页
      setPage(item) {
        if (item.class == '') {
          this.$emit('pagehandler', item.pageNum);
        }
      },
      //显示每页显示条数
      selectPage() {
        this.isShowPageSelect = true;
      },
      //每页最大显示条数
      enterPage(item) {
        this.$emit('pageSizeSelect', item);
        this.isShowPageSelect = false;
      }
    },
    mounted() {
      document.addEventListener('click', (e) => {
        if (!this.$el.contains(e.target)) {
          this.isShowPageSelect = false;
        }
      })
    }
  }
</script>

<style scoped>
  p,
  ol {
    margin: 0;
    padding: 0;
  }

  .pagination {
    text-align: right;
    font-family: arial;
    color: #48576a;
    width: 100%;
    clear: both;
    height: 30px;
    margin: 26px 0;
  }

  .pagination ul {
    float: right;
    padding: 0 12px;
    margin-top: 2px;
  }

  .pagination ul li {
    -webkit-user-select: none;
    cursor: pointer;
    display: inline-block;
    color: #222222;
    margin: 0 3px;
    padding: 0 12px;
    border: 1px solid #ccc;
    background: #fff;
    font-size: 12px;
    min-width: 24px;
    height: 24px;
    line-height: 26px;
    cursor: pointer;
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
    height: 30px;
    line-height: 30px;
    margin-right: 24px;
    color: #222222;
  }

  .pagination .displayPage p {
    float: left;
  }

  .pagination .displayPage p.selectPage {
    width: 44px;
    height: 28px;
    line-height: 28px;
    border: solid 1px #f4f4f4;
    margin: 0 4px;
    margin-bottom: 0;
    cursor: pointer;
    text-align: left;
    padding: 0 4px;
    position: relative;
    border-radius: 4px;
  }

  .pagination .displayPage p.selectPage:after {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #cccccc;
    content: "";
    position: absolute;
    right: 4px;
    top: 9px;
    width: 0;
  }

  .pagination .displayPage p.selectPage ol {
    list-style: none;
    position: absolute;
    bottom: 22px;
    left: -1px;
    background: #fff;
    width: 52px;
    border: solid 1px #f4f4f4;
    z-index: 999;
  }

  .pagination .displayPage p.selectPage ol li {
    padding: 0 4px;
  }

  .pagination .displayPage p.selectPage ol li:hover {
    background-color: #f1f7fc;
  }

  .pagination .displayPage p span {
    color: #529ae1;
  }

  .jump-page-box{
    float: right;
    position: relative;
    left: 0px;
    top: 0px;
    font-size: 14px;
  }

  .jump-page{
    width: 33px;
    height: 28px;
    outline: none;
    margin-right:2px;
    border-radius: 4px;
    border: 1px solid rgb(218, 218, 218);
    padding-left: 3px;
  }
  .displayPage{
    position: relative;
    right: -16px;
    font-size: 14px;
  }
</style>
