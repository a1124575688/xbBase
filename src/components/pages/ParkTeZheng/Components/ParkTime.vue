<template>
  <div class="park-time">
    <CommonTitle name="停车时长分布"
                 :icon="require('@image/tzzl/icon_scfb.png')"
                 :btn="true" :list="['本日','本月']"
                 @getType="getType"/>
    <div class="bar-chart" ref="barChart"></div>
  </div>
</template>

<script>
  export default {
    name: "ParkTime",
    props: {
      url: {
        default: '/api/parkZongLan/all/timeFenBu',
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
      initBarChart(data) {
        let chart = this.$echarts.init(this.$refs.barChart);
        let xData = data.xData;
        let percent = data.yPercent;
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
            data: xData,
          }],
          yAxis: [{
            type: "value",
            name: '(辆)',
            nameTextStyle: {
              color: 'rgba(255,255,255,.8)',
              fontSize: 22,
              padding: [0, 40, 0, 0]
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
          series: [
            {
              name: "时长",
              type: "bar",
              barWidth: 14,
              barGap: '85%',
              label: {
                show: true,
                position: 'top',
                fontSize: 24,
                align: 'center',
                color: 'rgba(255, 255, 255, 1)',
                formatter: (params) => {
                  // return params.value + '\n' + '(' + percent[params.dataIndex] + '%)'
                  return `{valueStyle|${params.value}}\n{percentStyle|(${percent[params.dataIndex]}%)}`
                },
                rich: {
                  valueStyle: {
                    color: 'rgba(255,255,255,.9)',
                    fontSize: 24
                  },
                  percentStyle: {
                    color: 'rgba(255,255,255,.9)',
                    fontSize: 20,
                    lineHeight: 20
                  }
                }
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
                      offset: 1,
                      color: 'rgba(50, 146, 194, 0.65)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                }
              },
              data: data.yData
            }
          ]
        };
        chart.setOption(option)
      },
      getType(i) {
        this.type = i;
        this.getData()
      },
      getData() {
        this.$axios({
          method: 'post',
          url: this.url,
          data: {
            type: this.type,
            ...this.params
          }
        }).then(res => {
          const data = res.data.data;
          let chartData = {
            xData: [],
            yData: [],
            yPercent: []
          };
          for (let item of data.list) {
            chartData.xData.push(item.name);
            chartData.yData.push(item.value);
            chartData.yPercent.push(item.percent)
          }
          this.initBarChart(chartData)
        })
      }
    },
    mounted() {
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
  .park-time {
    width: 800px;

    .bar-chart {
      width: 800px;
      height: 380px;
    }
  }
</style>
