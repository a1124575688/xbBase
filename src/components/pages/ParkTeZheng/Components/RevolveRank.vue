<template>
  <div class="revolve-box">
    <CommonTitle name="周转率排行"
                 :icon="require('@image/tzzl/icon_zzlph.png')"
                 :btn="true"
                 :list="['正序','倒序']"
                 @getType="getType"
                 top="30"/>
    <div class="flex-dom-between chart-box">
      <div class="case-box">
        <div class="case-num">{{revolvePercent}}</div>
        <div class="case-name">平均周转率</div>
      </div>
      <div class="bar-chart" ref="barChart"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RevolveRank",
    data() {
      return {
        chartData: '',
        revolvePercent: 0
      }
    },
    methods: {
      getType(i) {
        i === '正序'?
          this.formatData('zx'):
          this.formatData('dx')
      },
      initBarChart(data) {
        let chart = this.$echarts.init(this.$refs.barChart);
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
            left: "2%",
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
              fontSize: 20,
            },
            data: data.xData,
          }],
          yAxis: [{
            type: "value",
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
              show: false,
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
                      color: 'rgba(217, 251, 255, 1)' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: 'rgba(106, 130, 142, 0.65)' // 100% 处的颜色
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
      getData() {
        this.$axios({
          method: 'post',
          url: '/api/parkZongLan/all/zhouZhuanRank',
        }).then(res => {
          const data = res.data.data;
          this.revolvePercent = res.data.data.revolvePercent
          this.chartData = data.list.map(item => {
            return {
              name: item.name,
              value: Number(item.value)
            }
          });
          this.formatData('zx')
        })
      },
      formatData (type) {
        this.chartData = this.chartData.sort((a, b) => type === 'zx' ? a.value - b.value : b.value - a.value);
        let chartData = {
          xData: [],
          yData: []
        };
        for (let item of this.chartData) {
          chartData.xData.push(item.name);
          chartData.yData.push(item.value);
        }
        this.initBarChart(chartData)
      }
    },
    mounted() {
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
  .revolve-box {
    height: 380px;

    .chart-box {
      padding-left: 30px;
    }

    .case-box {
      .case-num {
        text-align: center;
        line-height: 186px;
        width: 176px;
        height: 186px;
        background: url("~@image/tzzl/bj_cjajl.png") no-repeat;
        font-family: BarlowCondensed-Bold;
        font-size: 60px;
        font-weight: bold;
        color: setWhite(.8);
        text-shadow: fontFlash(rgba(255, 220, 189, .6));
      }

      .case-name {
        text-align: center;
        font-size: 28px;
        font-weight: bold;
      }
    }

    .bar-chart {
      width: 538px;
      height: 354px;
    }
  }
</style>
