<template>
  <div class="right-box">
    <Masks position="right"/>
    <div class="main-box">
      <EnterOutTrend/>
      <ParkTime/>
      <RevolveTrend/>
      <RevolveRank/>
    </div>
  </div>
</template>

<script>
  import EnterOutTrend from '@cp/ParkTeZheng/Components/EnterOutTrend.vue'
  import ParkTime from '@cp/ParkTeZheng/Components/ParkTime.vue'
  import RevolveTrend from '@cp/ParkTeZheng/Components/RevolveTrend.vue'
  import RevolveRank from '@cp/ParkTeZheng/Components/RevolveRank.vue'
  export default {
    name: "right",
    components: { EnterOutTrend,ParkTime,RevolveTrend,RevolveRank },
  }
</script>

<style scoped lang="scss">
  .right-box {
    position: absolute;
    right: 0;
    padding-top: 181px;
    padding-right: 40px;
    height: 100%;
    .main-box{
      position: relative;
      z-index: 1;
    }
  }
</style>
