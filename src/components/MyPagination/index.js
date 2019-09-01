import MyPagination from './pagination.vue'

MyPagination.install = (Vue) => {
    Vue.component('vue-my-pagination', MyPagination)
}

export default MyPagination
