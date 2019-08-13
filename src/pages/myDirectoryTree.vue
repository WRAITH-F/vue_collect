<template>
  <div class="my-directory-tree-use">
    <my-directory-tree :treeData="treeData" @handle="handle"></my-directory-tree>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        treeData: [{
          "id": 2,
          "parentId": 1,
          "path": "/1/",
          "depth": 1,
          "title": "com",
          "description": "company",
          "createTime": 1562563780000,
          "updateTime": 1562563780000,
          "children": [{
            "id": 3,
            "parentId": 2,
            "path": "/1/2/",
            "depth": 2,
            "title": "wdzg",
            "description": "wang de zhong gui",
            "createTime": 1562563780000,
            "updateTime": 1562563780000,
            "children": [{
              "id": 4,
              "parentId": 3,
              "path": "/1/2/3/",
              "depth": 3,
              "title": "chuangxin",
              "description": "chuang xin",
              "createTime": 1562563780000,
              "updateTime": 1562563780000,
              "children": [{
                "id": 5,
                "parentId": 4,
                "path": "/1/2/3/4/",
                "depth": 4,
                "title": "西安",
                "description": "xi an",
                "createTime": 1562563780000,
                "updateTime": 1562563780000,
                "children": [{
                  "id": 6,
                  "parentId": 5,
                  "path": "/1/2/3/4/5/",
                  "depth": 5,
                  "title": "技术部",
                  "description": "ji shu bu",
                  "createTime": 1562563780000,
                  "updateTime": 1562563780000,
                  "children": [{
                      "id": 7,
                      "parentId": 6,
                      "path": "/1/2/3/4/5/6/",
                      "depth": 6,
                      "title": "java 组",
                      "description": "java group",
                      "createTime": 1562563780000,
                      "updateTime": 1562563780000,
                      "children": []
                    },
                    {
                      "id": 8,
                      "parentId": 6,
                      "path": "/1/2/3/4/5/6/",
                      "depth": 6,
                      "title": "测试组",
                      "description": "test group",
                      "createTime": 1562563780000,
                      "updateTime": 1562563780000,
                      "children": []
                    },
                    {
                      "id": 9,
                      "parentId": 6,
                      "path": "/1/2/3/4/5/6/",
                      "depth": 6,
                      "title": "web 组",
                      "description": "web group",
                      "createTime": 1562563780000,
                      "updateTime": 1562563780000,
                      "children": []
                    }
                  ]
                }]
              }]
            }]
          }]
        }]
      }
    },
    methods: {
      handle(val) {
        // console.log(val)
      }
    },
  }
</script>

<style>
</style>
