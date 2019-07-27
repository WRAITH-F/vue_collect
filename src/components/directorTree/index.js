import VueTree from './VueTree.vue'

VueTree.install = function (Vue) {
  Vue.component('vue-tree', VueTree)
}

export default VueTree
