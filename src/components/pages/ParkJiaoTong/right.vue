<template>
  <div class="right-box">
    <Masks position="right"/>
    <div class="main-box">
      <CommonTitle name="公交态势" :icon="require('@image/ggjt/ic_gjts.png')"/>
      <div class="run-info">
        <ParkBlockInfo v-for="item in parkList" :key="item.name" :params="item" color="rgba(255,255,255,1)"/>
      </div>
      <CommonTitle name="车辆状态" :icon="require('@image/ggjt/ic_clzt.png')" top="56"/>
      <CarStatusPie/>
      <CommonTitle name="近七日运营状态" :icon="require('@image/ggjt/ic_yyzt.png')" top="56"/>
      <div class="status-line" ref="statusLine"></div>
      <RevolveTrend :titleShow="false"
                    yUnit="(辆)"
                    :icon="require('@image/ggjt/ic_clzt.png')"
                    title="发车时段"
                    valueName="车辆数"
                    url="/api/gongJiao/all/carTime"
                    :filter="false"/>
    </div>
  </div>
</template>

<script>
  import ParkBlockInfo from '@cp/ParkResource/Components/ParkBlockInfo.vue'
  import RevolveTrend from '@cp/ParkTeZheng/Components/RevolveTrend.vue'
  import CarStatusPie from '@cp/ParkJiaoTong/Components/CarStatusPie.vue'

  export default {
    name: "right",
    components: {ParkBlockInfo, RevolveTrend, CarStatusPie},
    data() {
      return {
        parkList: [
          {
            name: '线路总数',
            value: 472,
            icon: require('@image/ggjt/ic_gjts_xlzs.png'),
            unit: 'km'
          },
          {
            name: '车辆总数',
            value: 472,
            icon: require('@image/ggjt/ic_gjts_clzs.png'),
            unit: 'km'
          },
          {
            name: '驾驶员总数',
            value: 472,
            icon: require('@image/ggjt/ic_gjts_jsyzs.png'),
            unit: 'km'
          },
          {
            name: '线路总里程',
            value: 472,
            icon: require('@image/ggjt/ic_gjts_xlzlc.png'),
            unit: 'km'
          }
        ]
      }
    },
    mounted() {
      this.getLineChartData();
      this.getGongJiaoData();
    },
    methods: {
      getLineChartData() {
        this.$axios({
          method: 'post',
          url: '/api/gongJiao/all/runOption',
        }).then(res => {
          const data = res.data.data;
          let chartData = {
            xData: [],
            valueArray: [],
            percentArray: []
          };
          for (let item of data.list) {
            chartData.xData.push(this.$tool.formatDay(item.name));
            chartData.valueArray.push(item.value);
            chartData.percentArray.push(item.percent);
          }
          this.initLineChart(chartData)
        })
      },
      initLineChart(data) {
        let chart = this.$echarts.init(this.$refs.statusLine);
        let option = {
          legend: {
            data: ['运营车次', '到站率'],
            icon: "rect",
            itemGap: 24,
            itemWidth: 13,
            itemHeight: 6,
            right: '5%',
            orient: "horizontal",
            textStyle: {
              color: "rgba(255,255,255,0.7)",
              fontSize: 22,
              padding: [0, 0, 0, 3],
              fontFamily: "SourceHanSansCN-Regular"
              // lineHeight: 30
            }
          },
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
            },
          },
          grid: {
            left: "10%",
            // "top":0,
            bottom: "16%",
            right: "5%",
            textStyle: {
              color: "#fff"
            }
          },
          barWidth: 20,
          calculable: true,
          xAxis: [{
            type: "category",
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.2)',
                width: 2
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0,
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 'bold',
              fontSize: 22
            },
            data: data.xData,
          }],
          yAxis: [{
            name: '(次)',
            nameTextStyle: {
              color: 'rgba(255,255,255,0.7)',
              fontSize: 20,
              align: 'right',
              padding: [3, 6, 5, 3]
            },
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dotted',
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.2)',
                width: 2
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              color: 'rgba(255,255,255,0.5)',
              fontSize: 20

            },
            splitArea: {
              show: false
            }
          }, {
            name: '(%)',
            nameTextStyle: {
              color: 'rgba(255,255,255,0.7)',
              fontSize: 20,
              align: 'right',
              padding: [0, -35, 0, 0]
            },
            type: "value",
            splitLine: {
              show: false,
              lineStyle: {
                type: 'dotted',
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.2)',
                width: 2
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              color: 'rgba(255,255,255,0.5)',
              fontSize: 20

            },
            splitArea: {
              show: false
            }
          }],
          series: [{
            name: "运营车次",
            type: "bar",
            barMaxWidth: 35,
            barGap: "10%",
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
            data: data.valueArray,
            yAxisIndex: 0,
          }, {
            name: "到站率",
            type: "line",
            symbolSize: 10,
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: 'rgba(254, 201, 97, 1)',
              }
            },
            lineStyle: {
              normal: {
                width: 4,
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
                }
              }
            },
            data: data.percentArray,
            yAxisIndex: 1,
          }]
        };
        chart.setOption(option)
      },
      getGongJiaoData() {
        this.$axios({
          method: 'post',
          url: '/api/gongJiao/all/gongJiaoTaiShi',
        }).then(res => {
          const data = res.data.data;
          this.parkList = [
            {
              name: '线路总数',
              value: data.xl,
              icon: require('@image/ggjt/ic_gjts_xlzs.png'),
              unit: 'km'
            },
            {
              name: '车辆总数',
              value: data.cl,
              icon: require('@image/ggjt/ic_gjts_clzs.png'),
              unit: 'km'
            },
            {
              name: '驾驶员总数',
              value: data.jsy,
              icon: require('@image/ggjt/ic_gjts_jsyzs.png'),
              unit: 'km'
            },
            {
              name: '线路总里程',
              value: data.lc,
              icon: require('@image/ggjt/ic_gjts_xlzlc.png'),
              unit: 'km'
            }
          ]
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .right-box {
    position: absolute;
    right: 0;
    padding-top: 181px;
    padding-right: 40px;
    height: 100%;

    .main-box {
      width: 800px;
      position: relative;
      z-index: 1;

      .run-info {
        display: flex;
        flex-wrap: wrap;
        row-gap: 25px;
        column-gap: 30px;
        margin-top: 42px;
        padding-left: 36px;
      }

      .status-line {
        width: 800px;
        height: 390px;
        margin-top: 30px;
      }
    }
  }
</style>
