<template>
  <div class="my-directory-tree">
    <ul class="my-directory-tree-box">
      <li class="my-directory-tree-inner" v-for="(td,index) in treeData">
        <h4 class="my-directory-tree-inner-icon" v-if="td.children.length">></h4>
        <!-- <h4 class="my-directory-tree-inner-icon" v-if="!td.children.length">S</h4> -->
        <input type="checkbox" v-model="treeData[index].isSelect" @click="selectNode(td,index)" class="my-directory-tree-checkbox">
        <p class="my-directory-tree-inner-title" @click.stop="getSelectTree(td)">{{td.title}}</p>
        <div class="my-directory-tree-sub" v-for="(std) in td.children">
          <my-directory-tree :treeData="[std]" @handle="handle"></my-directory-tree>
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
        selectId: [],
        cancelData: []
      }
    },
    mounted() {
      this.getTreeImfo();
    },
    methods: {
      //取到数据，加入isSelect状态
      getTreeImfo() {
        let _this = this
        for (var i in _this.treeData) {
          _this.treeData[i].isSelect = false
        }
      },
      // 获取数组的子数组
      getSelectTree(item) {
        let _this = this
        this.$emit('handle', item)
      },
      //子组件中的参数传回给父组件
      handle(val) {
        this.$emit('handle', val)
      },
      //更改checkbox
      selectNode(item, ind) {
        let _this = this
        _this.treeData[ind].isSelect = !_this.treeData[ind].isSelect;
        if (item.children.length) {
          _this.selectSubNode([item], item.children)
        }
      },
      //更改children的的checkbox
      selectSubNode(data, subData) {
        let _this = this
        if (data[0].isSelect) {
          _this.selectId = _this.selectId.concat(data[0].id);
          //es6中的数据去重
          _this.selectId = Array.from(new Set(_this.selectId));
          //将数组倒序
          // _this.selectId = _this.selectId.reverse()
          sessionStorage.setItem("selectId",_this.selectId)
        } else {
          _this.cancelData = _this.cancelData.concat(data[0].id);
          //es6中的数据去重
          _this.cancelData = Array.from(new Set(_this.cancelData));
        }

        _this.selectId = sessionStorage.getItem("selectId")
        // _this.selectId = _this.selectId.splice(",")
        console.log(_this.selectId)

        for (var i in subData) {
          if (data[0].isSelect) {
            subData[i].isSelect = true
          } else if (!data[0].isSelect) {
            subData[i].isSelect = false
          }
          if (subData[i].children.length) {
            _this.selectSubNode(subData, subData[i].children)
          }
        }
        this.$forceUpdate()
      },
      //数据去重
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
    padding-left: 1em;
    line-height: 32px;
  }

  .my-directory-tree-inner-icon {
    float: left;
  }

  .my-directory-tree-inner-title {
    cursor: pointer;
    float: left;
    margin-left: 8px;
  }

  .my-directory-tree-checkbox {
    float: left;
  }
</style>
