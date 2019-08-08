<template>
  <div class="my-directory-tree">
    <ul class="my-directory-tree-box">
      <li class="my-directory-tree-inner" v-for="(td,index) in treeData">
        <h4 class="my-directory-tree-inner-icon" v-if="td.children.length">></h4>
        <!-- <h4 class="my-directory-tree-inner-icon" v-if="!td.children.length">S</h4> -->
        <p class="my-directory-tree-inner-title">{{td.title}}</p>
        <div class="my-directory-tree-sub" v-for="(std,subInd) in td.children" @click="getTreeImfo(subInd)">
          <my-directory-tree :treeData="[std]"></my-directory-tree>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      // 目录树的数据
      treeData: {
        type: Array,
        default: function() {
          return [];
        }
      },
    },
    data() {
      return {
        treeDataSub: []
      }
    },
    mounted() {

    },
    methods: {
      // 获取数组的子数组
      getTreeImfo(ind) {
        let _this = this
        console.log(ind)
      }
    }
  }
</script>

<style>
  .my-directory-tree,
  .my-directory-tree-box {
    width: 100%;
    overflow: hidden;
  }

  .my-directory-tree-inner {
    width: 100%;
    padding: 0 1em;
    line-height: 32px;
  }

  .my-directory-tree-inner-icon {
    float: left;
    display: block;
  }

  .my-directory-tree-inner-title {
    float: left;
    display: block;
    margin-left: 8px;
  }
</style>
