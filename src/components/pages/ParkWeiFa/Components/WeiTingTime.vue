<template>
  <div>
    <CommonTitle name="违停高发时段" :icon="require('@image/ggjt/ic_wtgfld.png')" :btn="true" :list="['本日','本月']"
                 @getType="getType" top="60"/>
    <div class="bar-chart" ref="barChart"></div>
  </div>
</template>

<script>
  export default {
    name: "WeiTingTime",
    data() {
      return {
        type: '本日'
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        this.$axios({
          method: 'post',
          url: '/api/weiFaTingChe/all/weiTingTime',
          data: {
            type: this.type
          }
        }).then(res => {
          const data = res.data.data.list;
          let chartData = {
            xData: [],
            yData: [],
          };
          let colorArray = [
            [
              {
                offset: 0,
                color: 'rgba(249, 97, 74, 1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(177, 64, 47, 0.65)', // 100% 处的颜色
              },
            ],
            [
              {
                offset: 0,
                color: 'rgba(253, 189, 76, 1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(179, 146, 81, 0.65)', // 100% 处的颜色
              },
            ],
            [
              {
                offset: 0,
                color: 'rgba(252, 228, 103, 1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(197, 176, 67, 0.65)', // 100% 处的颜色
              },
            ]
          ];
          let sortArray = [];
          for(let item of data){
            sortArray.push(item.value);
          }
          sortArray.sort((a, b) => b - a);
          sortArray.forEach((item,index) => {
            for(let i of data){
              if (i.value === item){
                i.rank = index + 1
              }
            }
          });
          for(let item of data){
            chartData.xData.push(item.name);
            if(item.rank < 4){
              chartData.yData.push({
                value: item.value,
                itemStyle: {
                  normal: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: colorArray[item.rank - 1],
                      global: false, // 缺省为 false
                    },
                  },
                },
              })
            }else {
              chartData.yData.push(item.value)
            }
          }
          this.initBarChart(chartData)
        })
      },
      getType(type) {
        this.type = type;
        this.getData()
      },
      initBarChart(chartData) {
        let chart = this.$echarts.init(this.$refs.barChart);
        let xData = chartData.xData;
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              textStyle: {
                color: '#fff',
              },
            },
          },
          calculable: true,
          grid: {
            left: '10%',
            // "top":0,
            bottom: '16%',
            right: '2%',
          },
          xAxis: [
            {
              type: 'category',
              axisLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,.5)',
                },
              },
              splitLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              splitArea: {
                show: false,
              },
              axisLabel: {
                interval: 0,
                color: 'rgba(255,255,255,0.7)',
                fontSize: 22,
              },
              data: xData,
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: '(起)',
              nameTextStyle: {
                color: 'rgba(255,255,255,1)',
                fontSize: 20,
                padding: [0, 60, 0, 0],
              },
              splitLine: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                interval: 0,
                color: 'rgba(255,255,255,0.7)',
                fontSize: 20,
              },
              splitArea: {
                show: false,
              },
            },
          ],
          series: [
            {
              name: '违停',
              type: 'bar',
              barWidth: 12,
              itemStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: 'rgba(217, 251, 255, 1)', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: 'rgba(106, 130, 142, 0.65)', // 100% 处的颜色
                      },
                    ],
                    global: false, // 缺省为 false
                  },
                },
              },
              data: chartData.yData,
            },
          ]
        };
        chart.setOption(option)
      }
    }
  }
</script>

<style scoped lang="scss">
  .bar-chart {
    width: 800px;
    height: 400px;
  }
</style>
