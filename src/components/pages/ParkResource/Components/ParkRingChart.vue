<template>
  <div class="park-ring-box flex-dom">
    <div class="ring-chart" ref="ringChart"></div>
    <div class="ring-legend">
      <div class="legend-item"
           v-for="(item,index) in ringLegendList"
           :key="item.name" :class="[item.className,activeIndex === index ? activeBg[index] : '']"
           @mouseenter="mouseEvent('enter',index)"
           @mouseleave="mouseEvent('leave',index)">
        <div class="item-name">{{item.name}} {{item.value}} 个</div>
        <div class="item-percent flex-unit">
          <div>{{item.percent}}</div>
          <div>%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ParkRingChart",
    props: ['data'],
    data () {
      return {
        activeIndex: -1,
        activeBg: ['legend-green-bg','legend-blue-bg'],
        ringLegendList: [
          {
            name: '封闭式停车场',
            value: 79,
            percent: 41,
            className: 'legend-green'
          },
          {
            name: '开放式停车场',
            value: 101,
            percent: 59,
            className: 'legend-blue'
          }
        ],
        chart: ''
      }
    },
    mounted () {
      this.initData();
      this.initRingChart();
    },
    methods: {
      initData () {
        this.ringLegendList = [
          {
            name: '封闭式停车场',
            value: this.data.closeNum,
            percent: this.data.closePercent,
            className: 'legend-green'
          },
          {
            name: '开放式停车场',
            value: this.data.openNum,
            percent: this.data.openPercent,
            className: 'legend-blue'
          }
        ]
      },
      mouseEvent (type,index) {
        if (type === 'enter'){
          this.activeIndex = index;
          this.chart.dispatchAction(
            {
              type: 'highlight',
              seriesName: index ? '内层细圆环' : '外层进度环',
            }
          )
        }else {
          this.chart.dispatchAction(
            {
              type: 'downplay',
              seriesName: index ? '内层细圆环' : '外层进度环',
            }
          );
          this.activeIndex = -1;
        }
      },
      initRingChart () {
        let chart = this.chart = this.$echarts.init(this.$refs.ringChart);
        let getValue = [this.data.closePercent];
        let option = {
          angleAxis: {
            max: '100',
            clockwise: true, // 逆时针
            // 隐藏刻度线
            show: false
          },
          radiusAxis: {
            type: 'category',
            show: true,
            axisLabel: {
              show: false,
            },
            axisLine: {
              show: false,

            },
            axisTick: {
              show: false
            },
          },
          polar: {
            center: ['50%', '50%'],
            radius: '146%' //图形大小
          },
          series: [
            {
            type: 'pie',
            name: '内层细圆环',
            radius: ['71%', '75%'],
            emphasis: {
              scale: false,
              itemStyle: {
                shadowColor : 'rgba(122, 189, 255, 1)',
                shadowBlur: 10
              }
            },
            startAngle: 0,
            hoverAnimation: true,
            clockWise: true,
            itemStyle: {
              color: 'rgba(122, 189, 255, 1)'
            },
            label: {
              show: false
            },
            data: [0],
            z: 99,
          },
            {
              type: 'bar',
              name: '外层进度环',
              data: getValue,
              emphasis: {
                itemStyle: {
                  shadowColor : 'rgba(106, 222, 203, 1)',
                  shadowBlur: 10
                }
              },
              showBackground: false,
              // hoverAnimation: true,
              backgroundStyle: {
                color: '#BDEBFF',
              },
              coordinateSystem: 'polar',
              roundCap: false,
              barWidth: 30,
              z: 999,
              itemStyle: {
                normal: {
                  opacity: 1,
                  color: "rgba(106, 222, 203, 1)",
                }
              },
            }
          ]
        };
        chart.setOption(option);
        chart.on('mouseover', (params) => {
          params.seriesName === '外层进度环' ?
            this.activeIndex = 0:
            this.activeIndex = 1
        });
        chart.on('mouseout', () => {
          this.activeIndex = -1;
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .park-ring-box{
    margin-left: 39px;
    .ring-chart{
      width: 281px;
      height: 281px;
      background: url("~@image/tcts/bj_yh.png") no-repeat;
      background-size: 100%;
    }
    .ring-legend{
      display: flex;
      flex-direction: column;
      row-gap: 32px;
      margin-left: 15px;
      margin-right: 100px;
      position: relative;
      .legend-item{
        width: 359px;
        height: 107px;
        padding-left: 18px;
        padding-top: 8px;
        .item-name{
          font-size: 30px;
          font-weight: bold;
        }
        .item-percent{
          font-family: BarlowCondensed-Bold;
          div:first-child{
            font-size: 45px;
            font-weight: bold;
          }
          div:last-child{
            font-size: 32px;
          }
        }
      }

      .legend-green{
        border-left: 6px solid rgba(106, 222, 203, 1);
        .item-percent{
          color: rgba(106, 222, 203, 1);
        }
      }
      .legend-blue{
        border-left: 6px solid rgba(122, 189, 255, 1);
        .item-percent{
          color: rgba(122, 189, 255, 1);
        }
      }
      .legend-green-bg{
        background: url("~@image/tcts/active1.png") no-repeat;
      }
      .legend-blue-bg{
        background: url("~@image/tcts/active2.png") no-repeat;
      }
    }
    .ring-legend:after{
      position: absolute;
      content: '';
      right: -58px;
      top: -28px;
      width: 2px;
      height: 300px;
      background: setWhite(.2);
    }
  }
</style>
