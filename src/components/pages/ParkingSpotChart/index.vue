<template>
  <div class="grid-box">
    <div class="grid-item" v-for="item in 135" :key="item" :class="{'grid-item-active':item <= gridNum}"></div>
  </div>
</template>

<script>
  export default {
    name: "ParkingSpotChart",
    props: ['percent'],
    data () {
      return {
        gridNum: 0
      }
    },
    created () {
      this.setGridNum(this.percent)
    },
    methods: {
      setGridNum (percent) {
        this.gridNum = percent * 1.35
      }
    }
  }
</script>

<style scoped lang="scss">
  .grid-box {
    display: grid;
    grid-template-columns: repeat(15,23px);
    grid-template-rows: repeat(9,23px);
    grid-gap: 8px;
    .grid-item{
      background: setWhite(.25);
    }
    .grid-item-active{
      background: white;
    }
  }
</style>
