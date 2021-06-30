<template>
  <div class="right-box">
    <Masks position="right"/>
    <div class="main-box">
      <EnterOutTrend url="/api/parkTaiShi/markerDetails/detailsTrend" :params="{id:info.markerId}"/>
      <ParkTime url="/api/parkTaiShi/markerDetails/detailsTime" :params="{id:info.markerId}"/>
      <RevolveTrend url="/api/parkTaiShi/markerDetails/detailsRevolve" :params="{id:info.markerId}" :icon="require('@image/tzzl/icon_zzlzs.png')"/>
      <RevolveTrend
        title="饱和度走势"
        color="blue"
        url="/api/parkTaiShi/markerDetails/detailsBaoHe"
        :params="{id:info.markerId}"
        :icon="require('@image/tzzl/icon_bhdzs.png')"/>
    </div>
  </div>
</template>

<script>
  import EnterOutTrend from '@cp/ParkTeZheng/Components/EnterOutTrend.vue'
  import ParkTime from '@cp/ParkTeZheng/Components/ParkTime.vue'
  import RevolveTrend from '@cp/ParkTeZheng/Components/RevolveTrend.vue'
  import RevolveRank from '@cp/ParkTeZheng/Components/RevolveRank.vue'
  export default {
    name: "DetailsRight",
    props: ['info'],
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
