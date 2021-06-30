<template>
  <div class="park-block-info flex-dom">
    <img :src="params.icon">
    <div class="block-info">
      <div class="info-value flex-unit" :style="{color:color}">
        <div>{{params.value}}</div>
        <div v-if="params.unit">{{params.unit}}</div>
      </div>
      <div class="info-name">{{params.name}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ParkBlockInfo",
    props: {
      params: {
        type: Object
      },
      color: {
        default: 'rgba(35, 255, 237, 1)'
      }
    }
  }
</script>

<style scoped lang="scss">
  .park-block-info{
    position: relative;
    width: 340px;
    height: 158px;
    padding-left: 28px;
    background: url("~@image/tcts/parkBlock.png") no-repeat;
    .block-info{
      margin-left: 25px;
      .info-value{
        div:last-child{
          font-size: 22px;
        }
        div:first-child{
          font-family: Barlow Condensed;
          line-height: 44px;
          font-size: 44px;
          font-weight: bold;
        }
      }
      .info-name{
        font-size: 24px;
        color: setWhite(.7);
      }
    }
  }
</style>
