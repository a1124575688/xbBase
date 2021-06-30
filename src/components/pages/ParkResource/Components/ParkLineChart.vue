<template>
  <div class="park-chart" ref="parkChart"></div>
</template>

<script>
  export default {
    name: "ParkLineChart",
    methods: {
      initParkChart(data) {
        let chart = this.$echarts.init(this.$refs.parkChart);
        let option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              shadowStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(50, 146, 194, 0)' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'rgba(50, 146, 194, .3)' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              }
            }
          },
          legend: {
            show: true,
            itemWidth: 13,
            itemHeight: 6,
            right: 28,
            textStyle: {
              color: 'rgba(255,255,255,.8)',
              fontSize: 22,
              fontWeight: 'bold'
            }
          },
          calculable: true,
          grid: {
            left: "10%",
            top: '15%',
            bottom: "8%",
            right: "2%"
          },
          xAxis: [{
            type: "category",
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.5)'
              }
            },
            splitLine: {
              "show": false
            },
            axisTick: {
              "show": false
            },
            splitArea: {
              "show": false
            },
            axisLabel: {
              "interval": 0,
              color: 'rgba(255,255,255,0.7)',
              fontSize: 22,
              fontWeight: 'bold'
            },
            data: data.xData,
          }],
          yAxis: [{
            type: "value",
            name: '(个)停车场',
            nameTextStyle: {
              color: 'rgba(255,255,255,1)',
              fontSize: 22,
              padding: [0, 0, 0, 0]
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dotted',
                color: 'rgba(255,255,255,.3)'
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              color: 'rgba(255,255,255,0.7)',
              fontSize: 20,
              fontWeight: 'bold'
            },
            splitArea: {
              show: false
            },

          }],
          series: [{
            name: "开放式",
            type: "bar",
            barWidth: 14,
            barGap: '85%',
            label: {
              show: true,
              position: 'top',
              fontSize: 24,
              fontWeight: 'bold',
              color: 'rgba(255, 255, 255, 1)'
            },
            itemStyle: {
              normal: {
                barBorderRadius: 2,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(97, 255, 255, 1)' // 0% 处的颜色
                  }, {
                    offset: 0.5,
                    color: 'rgba(50, 146, 194, 0.65)' // 100% 处的颜色
                  }, {
                    offset: 1,
                    color: 'rgba(50, 146, 194, 0)' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              }
            },
            data: data.openData,
          },
            {
              name: "封闭式",
              type: "bar",
              barWidth: 14,
              barGap: '85%',
              label: {
                show: true,
                position: 'top',
                fontSize: 24,
                fontWeight: 'bold',
                color: 'rgba(255, 255, 255, 1)'
              },
              itemStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0,
                      color: 'rgba(217, 251, 255, 1)' // 0% 处的颜色
                    }, {
                      offset: 0.5,
                      color: 'rgba(106, 130, 142, 0.65)' // 100% 处的颜色
                    }, {
                      offset: 1,
                      color: 'rgba(106, 130, 142, 0)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                }
              },
              data: data.closeData
            }
          ]
        };
        chart.setOption(option)
      },
      getData() {
        this.$axios({
          method: 'post',
          url: '/api/parkTaiShi/all/parkFenBu',
        }).then(res => {
          const data = res.data.data;
          let chartData = {
            xData: [],
            openData: [],
            closeData: []
          };
          for(let item of data.list){
            chartData.xData.push(item.name);
            chartData.openData.push(item.openVal);
            chartData.closeData.push(item.closeVal);
          }
          this.initParkChart(chartData)
        })
      }
    },
    mounted() {
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
  .park-chart {
    width: 800px;
    height: 370px;
  }
</style>
