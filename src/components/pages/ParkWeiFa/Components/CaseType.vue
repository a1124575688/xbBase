<template>
  <div class="pie-chart-box flex-dom-between">
    <div class="chart-box">
      <div class="pie-chart" ref="pieChart"></div>
    </div>
    <div class="chart-legend flex-column">
      <div class="legend-item flex-dom"
           @mouseenter="mouseEvent('enter',item,index)"
           @mouseleave="mouseEvent('leave',item,index)"
           :class="{'legend-item-bg':hoverIndex === index}"
           :style="{borderColor:pieColorList[index]}"
           v-for="(item,index) in pieData"
           :key="item.name">
        <div class="item-name">{{item.name}}</div>
        <div class="item-percent flex-unit">
          <div>{{item.percent}}</div>
          <div>%</div>
        </div>
        <div class="item-value">{{item.value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CaseType",
    props: ['pieData'],
    data () {
      return {
        pieColorList: ['#7CBDFF', '#6ADEC2', '#6ADE9B', '#6ADE76','#DECB6A','#DEA46A'],
        hoverIndex: -1
      }
    },
    watch: {
      pieData () {
        this.initPieChart()
      }
    },
    mounted () {
      this.initPieChart()
    },
    methods: {
      mouseEvent (type,item,index) {
        if(type === 'enter'){
          this.hoverIndex = index;
          this.chart.dispatchAction(
            {
              type: 'highlight',
              name: item.name,
            }
          )
        }else {
          this.hoverIndex = -1;
          this.chart.dispatchAction(
            {
              type: 'downplay',
              seriesIndex: 0,
            }
          );
        }
      },
      initPieChart () {
        if (this.chart) {
          this.chart.clear();
        }
        this.chart = this.$xb_chartObj.ringPieChart({
          data: this.pieData,
          colorList: this.pieColorList,
          seriesName: "问题总数",
          fontSize: 40,
          gapWidth: 4,
          borderWidth: 0,
          hoverAnimation: true,
          radius: ["78%", "88%"],
          center: ["51%", "50%"],
          dom: this.$refs.pieChart
        },{
          tooltip: {
            show: false
          }
        });
        this.chart.on('mouseover', (params) => {
          this.hoverIndex = params.dataIndex / 2
        });
        this.chart.on('mouseout', () => {
          this.hoverIndex = -1
        });
        this.chart.on('highlight', (params) => {
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .pie-chart-box{
    margin-top: 30px;
    .chart-box{
      width: 236px;
      height: 235px;
      background: url("~@image/ggjt/bj_clzt.png") no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
      .pie-chart{
        width: 206px;
        height: 206px;
      }
    }
    .chart-legend{
      row-gap: 15px;
      .legend-item{
        cursor: pointer;
        width: 431px;
        height: 29px;
        border-radius: 0 15px 15px 0;
        border-left: 4px solid;
        padding-left: 12px;
        .item-name{
          width: 96px;
          font-size: 24px;
        }
        .item-percent{
          color: #7CBDFF;
          margin-left: 87px;
          margin-right: 100px;
          div:first-child{
            line-height: 30px;
            font-size: 30px;
            font-weight: bold;
            font-family: BarlowCondensed-Bold;
          }
          div:last-child{
            font-size: 22px;
          }
        }
        .item-value{
          font-family: BarlowCondensed-Bold;
          font-size: 24px;
          font-weight: bold;
          color: setWhite(.8);
        }
      }
      .legend-item-bg{
        background: linear-gradient(90deg,rgba(188, 248, 255, 0) 0%,rgba(188, 248, 255, .42) 100%);
      }
    }
  }
</style>
