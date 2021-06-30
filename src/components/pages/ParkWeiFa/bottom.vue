<template>
  <div class="bottom-box">
    <div class="hot-legend flex-dom">
      <div class="legend-box" v-for="(item,index) in legendList" :key="item">
        <div class="legend-item" :class="'legend-item-' + (index + 1)"></div>
        <div class="legend-title flex-dom">
          <div></div>
          <div>{{item}}</div>
        </div>
      </div>
    </div>
    <div class="weiTing-box">
      <div class="weiTing-event">
        <div class="weiTing-title">
          <div>违停事件</div>
          <div></div>
        </div>
        <div class="stats-box flex-dom">
          <div class="weiTing-stats">
            <div class="stats-info">
              <div class="info-value flex-unit">
                <div>{{weiTingCase.today.value}}</div>
                <div>个</div>
              </div>
              <div class="info-percent flex-unit">
                <div class="percent-title">昨日同比:</div>
                <div class="percent-num flex-unit" :class="weiTingCase.today.ratio > 0 ? 'font-green' : 'font-red'">
                  <div>{{weiTingCase.today.ratio > 0 ? '+' + weiTingCase.today.ratio : weiTingCase.today.ratio}}</div>
                  <div>%</div>
                </div>
                <img
                  :src="weiTingCase.today.ratio > 0 ? require('@image/wftc/jt_zz.png') : require('@image/wftc/jt_xj.png')">
              </div>
            </div>
            <div class="stats-title">今日统计</div>
          </div>
          <div class="weiTing-stats week-stats">
            <div class="stats-info">
              <div class="info-value flex-unit">
                <div>{{weiTingCase.week.value}}</div>
                <div>个</div>
              </div>
              <div class="info-percent flex-unit">
                <div class="percent-title">上周同比:</div>
                <div class="percent-num flex-unit" :class="weiTingCase.week.ratio > 0 ? 'font-green' : 'font-red'">
                  <div>{{weiTingCase.week.ratio > 0 ? '+' + weiTingCase.week.ratio : weiTingCase.week.ratio}}</div>
                  <div>%</div>
                </div>
                <img
                  :src="weiTingCase.week.ratio > 0 ? require('@image/wftc/jt_zz.png') : require('@image/wftc/jt_xj.png')">
              </div>
            </div>
            <div class="stats-title">本周统计</div>
          </div>
        </div>
      </div>
      <div class="weiTing-trend">
        <div class="flex-dom-between">
          <div class="weiTing-title">
            <div>违停走势</div>
            <div></div>
          </div>
          <TypeSelect :list="['本日','本月']" @getType="getType"/>
        </div>
        <div class="line-chart" ref="lineChart"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import TypeSelect from '@cc/TypeSelect'

  export default {
    name: "bottom",
    components: {TypeSelect},
    data() {
      return {
        legendList: ['最大值', '中间值', '0'],
        weiTingCase: {
          today: {
            value: 0,
            ratio: 0
          },
          week: {
            value: 0,
            ratio: 0
          }
        },
        type: '本日',
      }
    },
    methods: {
      getType (type){
        this.type = type;
        this.getWeiTingTrend();
      },
      initLineChart(lineChartData) {
        let chart = this.$echarts.init(this.$refs.lineChart);
        let option = {
          xAxis: {
            type: 'category',
            data: lineChartData.xData,
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
          legend: {
            data: ['全部', '昨日同比'],
            right: '2%',
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
            data: lineChartData.tongBi,
            name: '昨日同比',
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
                  color: 'rgba(50, 194, 194, 1)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(165, 255, 225, 1)' // 100% 处的颜色
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
                  color: 'rgba(50, 194, 194, .2)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(50, 194, 194, 0)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          },
            {
              data: lineChartData.all,
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
      getWeiTingCase() {
        this.$axios({
          method: 'post',
          url: '/api/weiFaTingChe/all/weiTingCase',
        }).then(res => {
          this.weiTingCase = res.data.data
        })
      },
      getWeiTingTrend() {
        this.$axios({
          method: 'post',
          url: '/api/weiFaTingChe/all/weiTingTrend',
          data: {
            type: this.type
          }
        }).then(res => {
          const data = res.data.data;
          let chartData = {
            xData: [],
            all: [],
            tongBi: []
          };
          for (let item of data.list) {
            chartData.xData.push(item.name);
            chartData.all.push(item.all);
            chartData.tongBi.push(item.tongBi);
          }
          this.initLineChart(chartData)
        })
      }
    },
    created() {
      this.getWeiTingCase()
    },
    mounted() {
      this.getWeiTingTrend()
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
    padding-left: 117px;
    padding-bottom: 50px;
    width: 100%;
    height: 547px;
    background: linear-gradient(to top, #010101 0%, rgba(1, 1, 1, 0.66) 72%, rgba(1, 1, 1, 0) 100%);

    .hot-legend {
      width: 500px;
      height: 200px;
      border: 2px solid setWhite(.5);
      background: rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      column-gap: 4px;
      margin-bottom: 40px;
      padding-left: 48px;
      margin-right: 217px;

      .legend-box {
        width: 132px;

        .legend-item {
          width: 132px;
          height: 30px;
          position: relative;
        }

        .legend-title {
          justify-content: center;
          margin-top: 10px;

          div:first-child {
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 5px 7px 5px;
            border-color: transparent transparent setWhite(.5) transparent;
          }

          div:last-child {
            margin-left: 10px;
            font-size: 30px;
          }
        }
      }

      .legend-item-1 {
        background: rgba(188, 60, 52, 1);
      }

      .legend-item-1:after {
        position: absolute;
        top: -6px;
        left: 0;
        content: '';
        width: 100%;
        height: 4px;
        background: rgba(188, 60, 52, 1);
      }

      .legend-item-2 {
        background: rgba(201, 153, 90, 1);
      }

      .legend-item-2:after {
        position: absolute;
        top: -6px;
        left: 0;
        content: '';
        width: 100%;
        height: 4px;
        background: rgba(201, 153, 90, 1);
      }

      .legend-item-3 {
        background: rgba(65, 141, 171, 1);
      }

      .legend-item-3:after {
        position: absolute;
        top: -6px;
        left: 0;
        content: '';
        width: 100%;
        height: 4px;
        background: rgba(65, 141, 171, 1);
      }
    }

    .weiTing-box {
      width: 2154px;
      height: 408px;
      padding-right: 70px;
      background: url("~@image/wftc/bj_db.png") no-repeat;
      display: flex;
      justify-content: flex-end;

      .weiTing-title {
        display: flex;
        align-items: center;
        flex: 1;
        position: relative;
        top: -25px;

        div:first-child {
          font-weight: bold;
          font-size: 42px;
          color: rgba(199, 239, 255, 1);
        }

        div:last-child {
          flex: 1;
          height: 3px;
          background: linear-gradient(90deg, setWhite(0) 0%, setWhite(.2) 20%, setWhite(.7) 50%, setWhite(.2) 80%, setWhite(0) 100%);
        }
      }

      .weiTing-event {
        margin-right: 100px;

        .stats-box {
          margin-top: 70px;

          .weiTing-stats {
            width: 286px;

            .stats-info {
              width: 286px;
              height: 214px;
              background: url("~@image/ggjt/dp_wtzs_jrtj.png") no-repeat;

              .info-value {
                position: relative;
                top: -20px;
                justify-content: center;
                color: rgba(131, 217, 255, 1);

                div:first-child {
                  line-height: 63px;
                  font-size: 72px;
                  font-weight: bold;
                  font-family: BarlowCondensed-Bold;
                }

                div:last-child {
                  font-size: 30px;
                }
              }

              .info-percent {
                position: relative;
                top: -20px;
                justify-content: center;

                .percent-title {
                  font-size: 24px;
                }

                .percent-num {
                  margin-right: 8px;

                  div:first-child {
                    font-size: 28px;
                    font-weight: bold;
                  }

                  div:last-child {
                    font-size: 22px;
                  }
                }

                .font-green {
                  color: rgba(115, 254, 115, 1);
                }

                .font-red {
                  color: rgba(249, 89, 89, 1);
                }
              }
            }

            .stats-title {
              text-align: center;
              font-size: 36px;
              color: setWhite(.8);
              position: relative;
              top: -45px;
            }
          }

          .week-stats {
            margin-left: 82px;

            .stats-info {
              background: url("~@image/ggjt/dp_wtzs_bztj.png") no-repeat;

              .info-value {
                color: rgba(113, 255, 221, 1);
              }
            }
          }
        }
      }

      .weiTing-trend {
        .line-chart {
          width: 1252px;
          height: 390px;
        }

        .flex-dom-between {
          position: relative;
          top: -25px;

          .weiTing-title {
            top: 0 !important;
          }
        }
      }
    }
  }
</style>
