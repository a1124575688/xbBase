<template>
  <div class="right-box">
    <Masks position="right"/>
    <div class="right-main">
      <CommonTitle name="实时饱和度" :icon="require('@image/tcts/icon_bhd.png')"/>
      <div class="bubble-layout">
        <div v-if="bubbleShow" class="flex-dom">
          <BubbleChart :percent="item.percent" :type="item.type" v-for="item in bubbleList" :key="item.name" :name="item.name"/>
        </div>
      </div>
      <CommonTitle name="停车周转率" :icon="require('@image/tcts/icon_zzl.png')" top="35"/>
      <RevolvePercent/>
      <CommonTitle name="停车场分布" :icon="require('@image/tcts/icon_zzl.png')" top="35"/>
      <ParkLineChart/>
      <CommonTitle name="泊车资源分布" :icon="require('@image/tcts/icon_zzl.png')" top="60"/>
      <ResourceLineChart/>
    </div>
  </div>
</template>

<script>
  import RevolvePercent from './Components/RevolvePercent.vue'
  import BubbleChart from './Components/BubbleChart.vue'
  import ParkLineChart from './Components/ParkLineChart.vue'
  import ResourceLineChart from './Components/ResourceLineChart.vue'

  export default {
    name: "right",
    components: {BubbleChart, RevolvePercent, ParkLineChart, ResourceLineChart},
    data() {
      return {
        bubbleShow: false,
        bubbleList: [
          {
            name: '海陵区',
            percent: 0,
            type: 'orange'
          },
          {
            name: '高港区',
            percent: 0,
            type: 'green'
          },
          {
            name: '姜堰区',
            percent: 0,
            type: 'red'
          }
        ]
      }
    },
    mounted() {
      this.getBubbleData();
    },
    methods: {
      getType(type) {

      },
      getBubbleData() {
        this.$axios({
          method: 'post',
          url: '/api/parkTaiShi/all/realTimeBaoHe',
        }).then(res => {
          const color = ['orange','green','red'];
          this.bubbleList = res.data.data.list.map((item,index)=>{
            return {
              name: item.name,
              percent: item.percent,
              type: color[index]
            }
          });
          this.bubbleShow = true
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .right-box {
    position: absolute;
    right: 0;
    padding-top: 195px;
    padding-right: 40px;
    height: 100%;

    .right-main {
      width: 800px;
      position: relative;
      z-index: 1;

      .bubble-layout {
        margin-top: 50px;
        height: 241px;
        &>div{
          justify-content: space-around;
        }
      }
    }
  }
</style>
