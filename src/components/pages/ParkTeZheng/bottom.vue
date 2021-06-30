<template>
  <div class="bottom-box">
    <BaoHeLegend/>
    <ParkLegend v-on="$listeners"/>
    <div class="park-overview">
      <div class="overview-title flex-dom">
        <div>泊位占用潮汐规律</div>
        <div></div>
        <TypeSelect :list="['本日','本月']" @getType="getType"/>
      </div>
      <div class="line-chart" ref="lineChart"></div>
    </div>
  </div>
</template>

<script>
  import BaoHeLegend from '@cp/ParkResource/Components/BaoHeLegend.vue';
  import ParkLegend from '@cp/ParkResource/Components/ParkLegend.vue';
  import TypeSelect from '@cc/TypeSelect'

  export default {
    name: "bottom",
    components: {BaoHeLegend, ParkLegend, TypeSelect},
    data() {
      return {
        type: '本日'
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getType(i) {
        this.type = i;
        this.getData()
      },
      getData() {
        this.$axios({
          method: 'post',
          url: '/api/parkZongLan/all/chaoXiGuiLv',
          data: {
            type: this.type
          }
        }).then(res => {
          const data = res.data.data;
          let chartData = {
            xData: [],
            yData: []
          };
          for (let item of data.list) {
            chartData.xData.push(item.name);
            chartData.yData.push(item.value);
          }
          this.initLineChart(chartData)
        })
      },
      initLineChart(data) {
        let chart = this.$echarts.init(this.$refs.lineChart);
        let option = {
          xAxis: {
            type: 'category',
            data: data.xData,
            axisTick: false,
            boundaryGap: false,
            axisLabel: {
              textStyle: {
                color: 'rgba(255,255,255,.5)',
                fontWeight: 'bold',
                fontSize: 16
              },
            },
            nameTextStyle: {
              padding: [7, 0, 0, -2],
              fontSize: 22,
              fontWeight: 'bold',
              color: 'rgba(255,255,255,.5)',
              verticalAlign: 'top'
            },
            axisLine: {
              lineStyle: {
                width: 2,
                color: 'rgba(255, 255, 255, .5)'
              }
            }
          },
          grid: {
            left: '3%',
            top: '13%',
            right: '1%'
          },
          tooltip: {
            trigger: 'axis',

            // showContent: false
          },
          yAxis: {
            type: 'value',
            name: '(个)泊位',
            nameTextStyle: {
              padding: [-20, 50, 0, 0],
              fontSize: 20,
              fontWeight: 'bold',
              color: 'rgba(255,255,255,.7)',
              verticalAlign: 'top'
            },
            axisTick: false,
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dotted',
                color: 'rgba(255,255,255,.7)'
              }
            },
            axisLine: {
              lineStyle: {
                width: 3,
                color: 'rgba(108, 144, 175, .5)'
              }
            },
            axisLabel: {
              textStyle: {
                color: 'rgba(255,255,255,.5)',
                fontSize: 16,
                fontWeight: 'bold',
              },
              // margin: 24
            },
          },
          series: [{
            data: data.yData,
            name: '周转率',
            type: 'line',
            symbol: 'circle',
            symbolSize: 10,
            showSymbol: false,
            itemStyle: {
              color: 'rgba(50, 194, 194, 1)',
              borderColor: 'rgba(50, 194, 194, .3)',
              borderWidth: 10
            },
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(52, 109, 226, 1)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(123, 201, 255, 1)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              },
              width: 3
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(123, 201, 255, .2)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(123, 201, 255, 0)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }
          ]
        };
        chart.setOption(option)
      }
    }
  }
</script>

<style scoped lang="scss">
  .bottom-box {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: flex-end;
    padding-left: 10px;
    width: 100%;
    background: linear-gradient(to top, #010101 0%, rgba(1, 1, 1, 0.66) 72%, rgba(1, 1, 1, 0) 100%);
    .park-overview {
      width: 2154px;
      height: 542px;
      background: url("~@image/tcts/bj_db.png") no-repeat;
      padding-top: 106px;
      margin-left: 84px;

      .overview-title {
        & > div:first-child {
          font-size: 42px;
          color: rgba(199, 239, 255, 1);
          margin-right: 10px;
          font-weight: bold;
        }

        & > div:nth-child(2) {
          flex: 1;
          height: 2px;
          margin-right: 20px;
          background: linear-gradient(90deg, setWhite(0) 0%, setWhite(.4) 10%, setWhite(.4) 90%, setWhite(0) 100%);
        }
      }

      .line-chart {
        width: 2154px;
        height: 380px;
      }
    }
  }
</style>
