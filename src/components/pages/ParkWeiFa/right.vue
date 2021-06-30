<template>
  <div class="right-box">
    <Masks position="right"/>
    <div class="main-box">
      <WeiTingType/>
      <AreaWeiTingNum/>
      <WeiTingRoad/>
      <WeiTingTime/>
    </div>
  </div>
</template>

<script>
  import WeiTingType from '@cp/ParkWeiFa/Components/WeiTingType.vue'
  import WeiTingRoad from '@cp/ParkWeiFa/Components/WeiTingRoad.vue'
  import WeiTingTime from '@cp/ParkWeiFa/Components/WeiTingTime.vue'
  import AreaWeiTingNum from '@cp/ParkWeiFa/Components/AreaWeiTingNum.vue'
  export default {
    name: "right",
    components: { WeiTingType,AreaWeiTingNum,WeiTingRoad,WeiTingTime },
  }
</script>

<style scoped lang="scss">
  .right-box {
    position: absolute;
    right: 0;
    padding-top: 181px;
    padding-right: 40px;
    height: 100%;

    .main-box {
      width: 800px;
      position: relative;
      z-index: 1;
    }
  }
</style>
