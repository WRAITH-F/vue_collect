<template>
  <div id="directorTree">
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          <!-- <p class="lead">vue-tree 示例 <a href="https://github.com/jiaxincui/vue-tree">github</a></p> -->
        </div>
        <div class="col-md-6">
          <vue-tree
            :tree-data="treeData"
            v-model="ids"
            :options="options"
            @handle="handle"
          />
        </div>
        <div class="col-md-6">
          <p class="lead">设置</p>
          <div class="form-group">
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="options.checkbox"> 显示复选框
              </label>
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="options.checkedOpen"> 已选择是否展开
              </label>
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="options.folderBold"> 目录加粗
              </label>
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="options.idsWithParent"> 复选是否包含目录
              </label>
            </div>
          </div>
          <div class="form-group">
              <label>初始展开层级</label>
              <input type="number" class="form-control" v-model="options.depthOpen" disabled>
          </div>
          <h3>Events</h3>
          <p>单击节点名称触发<code>handle</code>事件</p>
          <p v-for="item in message"><pre v-html="item"></pre></p>
          <h3>Checked ids</h3>
          <p>{{ids}}</p>
          <h3>Options</h3>
          <p>{{options}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'directorTree',
    data: function () {
      return {
        ids: [4],
        options: {
          title: 'title',
          checkbox: true,
          checkedOpen: true,
          folderBold: true,
          idsWithParent: true,
          depthOpen: 2,
          openIcon: 'fa fa-angle-right',
          closeIcon: 'fa fa-angle-down',
          halfCheckedIcon: 'fa fa-minus-square-o fa-fw text-primary',
          checkedIcon: 'fa fa-check-square-o fa-fw text-danger',
          uncheckedIcon: 'fa fa-square-o fa-fw'
        },
        message: [],
        treeData: [{
          title: '根目录[1]',
          id: 1,
          children: [
            {
              title: '一级节点[4]',
              id: 4,
              children: [
                {
                  title: '二级节点[5]',
                  id: 5,
                  children: [
                    {title: '三级节点[6]', id: 6},
                    {title: '三级节点[8]', id: 8},
                    {title: '三级节点[30]', id: 30},
                    {
                      title: '三级节点[31]',
                      id: 31,
                      children: [
                        {title: '四级节点[36]', id: 36},
                        {title: '四级节点[38]', id: 38},
                        {title: '四级节点[39]', id: 39},
                        {title: '四级节点[48]', id: 48}
                      ]
                    }
                  ]
                },
                {title: '二级节点[9]', id: 9},
                {title: '二级节点[10]', id: 10},
                {
                  title: '二级节点[11]',
                  id: 11,
                  children: [
                    {title: '三级节点[12]', id: 12},
                    {title: '三级节点[13]', id: 13},
                    {
                      title: '三级节点[14]',
                      id: 14,
                      children: [
                        {title: '四级节点[15]', id: 15},
                        {title: '四级节点[16]', id: 16},
                        {title: '四级节点[17]', id: 17},
                        {title: '四级节点[18]', id: 18},
                        {
                          title: '四级节点[19]',
                          id: 19,
                          children: [
                            {title: '五级节点[20]', id: 20},
                            {title: '五级节点[21]', id: 21},
                            {title: '五级节点[22]', id: 22},
                            {title: '五级节点[23]', id: 23},
                            {title: '五级节点[24]', id: 24}
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {title: '一级节点[2]', id: 2},
            {
              title: '一级节点[59]',
              id: 59,
              children: [
                {title: '二级节点[60]', id: 60},
                {title: '二级节点[61]', id: 61},
                {title: '二级节点[62]', id: 62},
                {title: '二级节点[63]', id: 63},
                {title: '二级节点[64]', id: 64}
              ]
            },
            {title: '一级节点[3]', id: 3}
          ]
        },
        {
          title: '根目录[99]',
          id: 99,
          children: [
            {title: '二级节点[70]', id: 70},
            {title: '二级节点[71]', id: 71},
            {title: '二级节点[72]', id: 72},
            {title: '二级节点[73]', id: 73},
            {
              title: '二级节点[74]',
              id: 74,
              children: [
                {title: '三级节点[82]', id: 82},
                {title: '三级节点[83]', id: 83}
              ]
            }
          ]
        }]
      }
    },

    methods: {
      handle (item) {
        this.message.push(`节点 ${JSON.stringify(item)} 作为事件参数传递`)
      }
    }
  }
</script>
