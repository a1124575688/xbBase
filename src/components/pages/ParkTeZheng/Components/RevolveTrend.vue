<template>
  <div class="trend-box">
    <CommonTitle :name="title" :icon="icon" :btn="filter" :list="['本日','本月']"
                 @getType="getType" top="30"/>
    <div class="line-chart" ref="lineChart"></div>
  </div>
</template>

<script>
  export default {
    name: "RevolveTrend",
    props: {
      title:{
        default:'周转率走势'
      },
      icon:{
        default:require('@image/tzzl/icon_zs.png')
      },
      color:{
        default: 'green'
      },
      valueName:{
        default: '周转率走势'
      },
      yUnit: {
        default: ''
      },
      filter: {
        default: true
      },
      url: {
        default: '/api/parkZongLan/all/zhouZhuanLine',
      },
      params: {
        default() {
          return {

          }
        }
      }
    },
    data() {
      return {
        type: '本日'
      }
    },
    methods: {
      getType(i) {
        this.type = i;
        this.getData()
      },
      getData() {
        this.$axios({
          method: 'post',
          url: this.url,
          data: {
            ...this.params,
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
            left: '10%',
            top: '13%',
            right: '2%'
          },
          tooltip: {
            trigger: 'axis',

            // showContent: false
          },
          yAxis: {
            type: 'value',
            name: this.yUnit,
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
            name: this.valueName,
            type: 'line',
            symbol: 'circle',
            symbolSize: 10,
            showSymbol: false,
            itemStyle: {
              color: this.color === 'green' ? 'rgba(50, 194, 194, 1)' : 'rgba(52, 109, 226, 1)',
              borderColor: this.color === 'green' ? 'rgba(50, 194, 194, .3)' : 'rgba(52, 109, 226, .3)',
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
                  color: this.color === 'green' ? 'rgba(50, 194, 194, 1)' : 'rgba(52, 109, 226, 1)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: this.color === 'green' ? 'rgba(165, 255, 225, 1)' : 'rgba(123, 201, 255, 1)' // 100% 处的颜色
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
                  color: this.color === 'green' ? 'rgba(50, 194, 194, .2)' : 'rgba(52, 109, 226, .2)'// 0% 处的颜色
                }, {
                  offset: 1,
                  color: this.color === 'green' ? 'rgba(50, 194, 194, 0)' : 'rgba(52, 109, 226, 0)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }
          ]
        };
        chart.setOption(option)
      },
    },
    mounted() {
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
  .trend-box {
    width: 800px;

    .line-chart {
      width: 800px;
      height: 380px;
    }
  }
</style>
