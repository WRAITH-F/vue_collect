import ImageUploader from './ImageUploader.vue'

ImageUploader.install = (Vue) => {
    Vue.component('vue-img-upload', ImageUploader)
}

export default ImageUploader
