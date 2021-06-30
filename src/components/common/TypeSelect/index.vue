<template>
  <div class="type-box flex-dom">
    <div class="type-item" v-for="(item,index) in list" :class="{'active':checkIndex === index}" @click="selectEvent(item,index)">{{item}}</div>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: ['list'],
    data () {
      return {
        checkIndex: 0
      }
    },
    methods: {
      selectEvent (item,index) {
        this.checkIndex = index;
        this.$emit('getType',item)
      }
    }
  }
</script>

<style scoped lang="scss">
  .type-box {
    column-gap: 16px;
    .type-item{
      width: 80px;
      height: 36px;
      line-height: 32px;
      border-radius: 4px;
      text-align: center;
      color: setWhite(.5);
      font-size: 24px;
      border: 2px solid rgba(15, 149, 145, 0.66);
      background: linear-gradient(180deg,rgba(7,10,16,.66) 0%,rgba(21,94,99,.66) 100%);
      cursor: pointer;
    }
    .active{
      color: setWhite(1);
      border: 2px solid rgba(35, 255, 237, 1);
      background: linear-gradient(180deg,rgba(7,10,16,1) 0%,rgba(21,94,99,1) 100%);
    }
  }
</style>
