<template>
  <div class="park-legend">
    <div class="park-item flex-dom" v-for="item in parkList" :key="item.name" :class="{'park-active':item.active}">
      <img :src="require('@image/tcts/ico_gx_off.png')" @click="parkEvent(item)">
      <div>{{item.name}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ParkLegend",
    data () {
      return {
        parkList: [
          {
            active: false,
            name: '公交车辆'
          },
          {
            active: false,
            name: '公共监控'
          },
          {
            active: false,
            name: '公共站点'
          }
        ],
      }
    },
    methods: {
      parkEvent (item) {
        item.active = !item.active;
        this.$emit('getEvent','legendActive',item)
      }
    }
  }
</script>

<style scoped lang="scss">
  .park-legend {
    width: 500px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid setWhite(.5);
    border-radius: 20px;
    margin-left: 149px;
    margin-bottom: 40px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px 58px 0 58px;
    .park-item {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 10px;
      img {
        margin-right: 23px;
        cursor: pointer;
      }
    }

    .park-active {
      img {
        content: url("~@image/tcts/ico_gx_on.png");
      }
    }
  }
</style>
