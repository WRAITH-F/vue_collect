import myDirectoryTree from './myDirectoryTree.vue'

myDirectoryTree.install = function (Vue) {
  Vue.component('my-directory-tree', myDirectoryTree)
}

export default myDirectoryTree
