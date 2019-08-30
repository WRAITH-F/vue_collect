<template>
    <div class="my-Select">
      <div style="width: 200px;height: 40px;">
         <vue-select-picker @item-click="dropDownClick" :isNeedSearch="true" :itemlist="itemlist"></vue-select-picker>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        itemlist: {
          cur: {
            val: "",
            name: "所有产品"
          },
          data: [{
            val: "",
            name: "所有产品"
          }, {
            val: 1,
            name: "梦幻西游"
          }, {
            val: 2,
            name: "梦幻无双"
          }, {
            val: 3,
            name: "大话西游"
          }]
        },
      }
    },
    methods :{
      dropDownClick(e) {
        console.log(e.name, e.val)
      }
    }
  }
</script>

<style scoped>
  .my-Select{
    float: left;
    position: relative;
    left: 50%;
    top: 16px;
    transform: translateX(-50%);
  }
</style>
