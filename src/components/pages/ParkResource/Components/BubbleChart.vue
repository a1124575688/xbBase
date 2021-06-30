<template>
  <div class="bubble-box">
    <div class="chart-box" :class="type">
      <div class="chart" :ref="chartId"></div>
      <div class="chart-value flex-unit position-center">
        <div>{{percent}}</div>
        <div>%</div>
      </div>
    </div>
    <div class="area-name">{{name}}</div>
  </div>
</template>

<script>
  export default {
    name: "BubbleChart",
    props:['percent','type','name'],
    data () {
      return {
        chartId: this.$tool.randomId(4),
        chartColor: {
          orange: {
            start: 'rgba(226, 152, 35, .6)',
            end: 'rgba(226, 152, 35, .6)',
            // bgColorStart: 'rgba(172, 170, 166, .2)',
            // bgColorEnd: 'rgba(241, 176, 71, .5)',
            // outlineColorStart: 'rgba(172, 170, 166, 1)',
            // outlineColorEnd: 'rgba(242, 177, 73, 1)',
          },
          green: {
            start: 'rgba(64, 219, 116, .6)',
            end: 'rgba(128, 202, 152, .6)',
            // bgColorStart: 'rgba(161,168,164,.2)',
            // bgColorEnd: 'rgba(73,240,129,.5)',
            // outlineColorStart: 'rgba(161,168,164,1)',
            // outlineColorEnd: 'rgba(73,240,129,1)'
          },
          red: {
            start: 'rgba(216, 102, 115, .6)',
            end: 'rgba(216, 102, 115, .6)',
            // bgColorStart: 'rgba(161,168,164,.2)',
            // bgColorEnd: 'rgba(239,114,128,.5)',
            // outlineColorStart: 'rgba(168,163,163,1)',
            // outlineColorEnd: 'rgba(239,114,128,1)'
          }
        }
      }
    },
    mounted () {
      this.initChart()
    },
    methods: {
      initChart () {
        let chart = this.$echarts.init(this.$refs[this.chartId]);
        let value = Number(this.percent) / 100;
        let data = [value, value];
        let target = this.chartColor[this.type];
        let option = {
          title: {
            text: '',
          },
          series: [
            {
              type: 'liquidFill',
              radius: '88%',
              center: ['50%', '50%'],
              label: {
                normal: {
                  formatter: '',
                }
              },
              color: [
                {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: target.end, // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: target.start, // 100% 处的颜色
                    },
                  ],
                },
              ],
              data: data, // data个数代表波浪数
              backgroundStyle: {
                borderWidth: 2,
                borderColor: 'rgba(55, 211, 255, 0)',
                color: 'rgba(12, 41, 49, 0)',
              },
              outline: {
                show: false,
              },
            },
          ],
        };
        chart.setOption(option)
      }
    }
  }
</script>

<style scoped lang="scss">
  .bubble-box{
    width: 180px;
    .chart-box{
      position: relative;
      width: 180px;
      height: 180px;
      .chart-value{
        div{
          font-family: BarlowCondensed-Bold;
          font-weight: bold;
          text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
        }
        div:first-child{
          font-size: 68px;
        }
        div:last-child{
          font-size: 36px;
        }
      }
    }
    .orange{
      background: url("~@image/tcts/bj_bhd_c.png") no-repeat;
    }
    .green{
      background: url("~@image/tcts/bj_bhd_l.png") no-repeat;
    }
    .red{
      background: url("~@image/tcts/bj_bhd_h.png") no-repeat;
    }
    .chart{
      width: 180px;
      height: 180px;
    }
    .area-name{
      font-size: 36px;
      text-align: center;
      margin-top: 13px;
    }
  }
</style>
