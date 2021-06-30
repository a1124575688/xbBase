<template>
  <div class="trend-box">
    <div class="line-chart" ref="lineChart"></div>
  </div>
</template>

<script>
  export default {
    name: "WeiTingTrend",
    props: [],
    data() {
      return {

      }
    },
    methods: {
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
            left: '6%',
            top: '13%',
            right: '6%'
          },
          legend: {
            data: ['全部', '昨日同比'],
            right: '5%',
            top: '2%',
            icon: "rect",
            itemWidth: 13,
            itemHeight: 6,
            textStyle: {
              fontSize: 20,
              color: 'rgba(255,255,255,.8)'
            }
          },
          tooltip: {
            trigger: 'axis',

            // showContent: false
          },
          yAxis: {
            type: 'value',
            name: '(件)',
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
            data: data.enterData,
            name: '昨日同比',
            type: 'line',
            symbol: 'circle',
            symbolSize: 10,
            showSymbol: false,
            itemStyle: {
              color: 'rgba(255, 202, 97, 1)',
              borderColor: 'rgba(255, 202, 97, .3)',
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
                  color: 'rgba(255, 202, 97, 1)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(194, 122, 50, 1)' // 100% 处的颜色
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
                  color: 'rgba(255, 202, 97, .2)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(255, 202, 97, 0)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          },
            {
              data: data.outData,
              type: 'line',
              name: '全部',
              symbol: 'circle',
              symbolSize: 10,
              showSymbol: false,
              itemStyle: {
                color: 'rgba(123, 201, 255, 1)',
                borderColor: 'rgba(123, 201, 255, .3)',
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
                    color: 'rgba(52, 109, 226, .2)' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: 'rgba(52, 109, 226, 0)' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              }
            }
          ]
        };
        chart.setOption(option)
      },
      getData() {
        this.$axios({
          method: 'post',
          url: '/api/parkZongLan/all/jinChuChang',
          data: {
            type: this.type
          }
        }).then(res => {
          const data = res.data.data;
          let chartData = {
            xData: [],
            enterData: [],
            outData: []
          };
          for(let item of data.list){
            chartData.xData.push(item.name);
            chartData.enterData.push(item.enterVal);
            chartData.outData.push(item.outVal)
          }
          this.initLineChart(chartData)
        })
      }
    },
    mounted() {
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
  .trend-box {
    width: 744px;

    .line-chart {
      width: 744px;
      height: 380px;
      margin-top: 30px;
    }
  }
</style>
