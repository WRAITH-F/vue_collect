<template>
  <div class="demo-container">
    <vue-cascading-address @confirm="confirmCity" input-class="input-sm" :readonly="true"></vue-cascading-address>

    <pre class="pre">{{ confirmData || 'confirm事件中的data将显示在此处' }}</pre>
  </div>
  </div>
</template>

<script lang="babel">
  export default {
    data() {
      return {
        confirmData: ''
      }
    },
    methods: {
      confirmCity(data) {
        this.confirmData = data;
        console.log(data)
      }
    }
  }
</script>

<style>
  .demo-container {
    width: 300px;
    margin: 32px auto;
  }

  .text-center {
    text-align: center;
  }

  .pre {
    border: 1px solid #aaa;
    padding: 20px;
    border-radius: 2px;
    background-color: #eee;
    margin: 32px 0;
  }
</style>
