<template>
  <div id="vue-pagination">
    <div class="pagination-compnents">
      <vue-pagination :prevHtml="prevHtml" :nextHtml="nextHtml" :pageNum="pageNum" :page-size="pageSize" :total="total"
        :max-page="maxPage" @pagehandler="pageHandler" @pageSizeSelect="pageSizeSelect" :isShowPageSelect="isShowPageSelect" :isJumpPage="isJumpPage"></vue-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        //分页
        prevHtml: "上一页", //不定义为 <
        nextHtml: "下一页", //不定义为 >
        pageNum: 1, //默认页 第一页
        pageSize: 10, //每页显示最大条数
        total: 1000, //一共多少条数据
        maxPage: 5 ,//分页导航
        isShowPageSelect:true,
        isJumpPage:true,
      }
    },
    methods: {
      //分页 点击换页
      pageHandler(page) {
        this.pageNum = page
      },
      //每页最大显示条数
      pageSizeSelect(pageSize) {
        this.pageSize = pageSize
      }
    },
  }
</script>

<style>
  #vue-pagination{
    width: 100%;
    overflow: hidden;
    padding: 128px 32px;
  }
</style>
