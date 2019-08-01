<template>
  <div class="img-upload">
    <vue-img-upload @onChange='imgChange' :maxSize="maxSize" placeholder="选择或拖放图片"></vue-img-upload>
  </div>
</template>

<script>
  export default {
    name: 'img-upload',
    data () {
      return {
        maxSize: 3072
      }
    },
    methods: {
      imgChange (files) {
        if (files) {
          console.log(files)
        }
      }
    }
  }
</script>

<style scoped>
  .img-upload{
    padding: 32px 0;
  }
</style>
