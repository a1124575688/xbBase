<template>
  <div class="weiTing-details">
    <div class="road-info">
      <div class="go-back flex-dom">
        <img :src="require('@image/all/title-back.png')" @click="goBack">
        <div>{{baseInfo.roadName}}</div>
      </div>
      <div class="road-title flex-dom-between">
        <div class="title">道路信息</div>
        <TypeSelect :list="['本日','本月','本年']" @getType="getType"/>
      </div>
      <div class="road-main">
        <div class="item-title flex-dom">
          <img :src="require('@image/ggjt/ic_jbxx.png')">
          <div>基本信息</div>
        </div>
        <div class="wt-all flex-dom-between">
          <img :src="require('@image/ggjt/ic_ljwt.png')">
          <div class="all-title">累计违停总数</div>
          <div class="all-value flex-unit">
            <div>{{baseInfo.all}}</div>
            <div>件</div>
          </div>
        </div>
        <div class="run-info">
          <ParkBlockInfo v-for="item in baseInfo.parkList" :key="item.name" :params="item" color="rgba(255,255,255,1)"/>
        </div>
        <div class="item-title flex-dom">
          <img :src="require('@image/ggjt/ic_wtzst.png')">
          <div>违停走势图</div>
        </div>
        <div class="trend-box">
          <div class="line-chart" ref="lineChart"></div>
        </div>
      </div>
    </div>
    <div class="car-table">
      <div class="table-title">车辆信息-数据表</div>
      <TableCp :options="tableOptions" :listData="tableData"/>
      <Paging :count="pageParams.total" :pageSize="pageParams.pageSize" :offset="pageParams.offset"
              @handler="handler"></Paging>
    </div>
  </div>
</template>

<script>
  import WeiTingTrend from '@cp/ParkWeiFa/Components/WeiTingTrend.vue'
  import ParkBlockInfo from '@cp/ParkResource/Components/ParkBlockInfo.vue'
  import TypeSelect from '@cc/TypeSelect'
  import TableCp from '@cc/TableCp'

  export default {
    name: "WeiTingDetails",
    props: ['info'],
    components: {TypeSelect, ParkBlockInfo, WeiTingTrend, TableCp},
    data() {
      return {
        tableData: [],
        baseInfo: {
          roadName: "春熙路",
          parkList: [],
          list: [
            {
              all: 20,
              name: "2:00",
              tongBi: 40
            },
            {
              all: 123,
              name: "4:00",
              tongBi: 42
            },
            {
              all: 42,
              name: "6:00",
              tongBi: 52
            },
            {
              all: 42,
              name: "8:00",
              tongBi: 62
            },
            {
              all: 58,
              name: "10:00",
              tongBi: 72
            }
          ]
        },
        type: '本日',
        pageParams: {
          offset: 1,
          pageSize: 13,
          total: 0
        }
      }
    },
    created() {
      this.initTable()
    },
    mounted() {
      this.getRoadInfoData();
      this.getDataTableData()
    },
    methods: {
      goBack() {
        this.$emit('getEvent', 'goBack')
      },
      handler(i) {
        this.pageParams.offset = i;
        this.getDataTableData()
      },
      getType(type) {
        this.type = type;
        this.getRoadInfoData();
      },
      initTable() {
        this.tableOptions = {
          header: {
            headerList: {
              height: 96,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              other: {
                background: 'rgba(84, 102, 104, .65)',
                borderRadius: '16px 16px 0px 0px',
                borderBottom: '1px solid rgba(255,255,255,.3)',
                marginBottom: '20px'
              }
            },
            headerListData: [
              {
                name: '序号',
                width: 76,
                gap: 185
              }, {
                name: '车牌号',
                width: 157,
                gap: 307
              }, {
                name: '车牌颜色',
                width: 152,
                gap: 342
              }, {
                name: '累计违停',
                width: 152,
                gap: 232
              }, {
                name: '违法路段',
                width: 194,
                gap: 230
              }, {
                name: '违法时间',
                width: 285,
                gap: 341
              }],
            fontSize: 38,
            bold: false,
            color: 'rgba(66, 252, 255, 1)'
          },
          main: {
            listBg: {
              open: false,
              evenNumberStyle: {
                background: 'rgba(255,255,255,0.03)'
              }
            },
            listItem: {
              fontSize: 30,
              color: 'rgba(255,255,255,1)',
              bold: false,
              marginTop: 1
            },
            mainBox: {
              height: '1330px',
            },
            mainList: {
              height: '63px'
            }
          }
        }
      },
      getRoadInfoData() {
        this.$axios({
          method: 'post',
          url: '/api/weiFaTingChe/all/roadBaseInfo',
          data: {
            id: this.info.id,
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
          this.baseInfo = {
            roadName: data.roadName,
            all: data.all,
            parkList: [
              {
                name: '大客车',
                value: data.dkc,
                icon: require('@image/ggjt/icon_jbxx_dkc.png'),
                unit: '起'
              },
              {
                name: '小客车',
                value: data.xkc,
                icon: require('@image/ggjt/ic_jbxx_xkc.png'),
                unit: '起'
              },
              {
                name: '摩托车',
                value: data.mtc,
                icon: require('@image/ggjt/ic_jbxx_mtc.png'),
                unit: '起'
              },
              {
                name: '大货车',
                value: data.dhc,
                icon: require('@image/ggjt/ic_jbxx_dhc.png'),
                unit: '起'
              },
              {
                name: '小货车',
                value: data.xhc,
                icon: require('@image/ggjt/ic_jbxx_xhc.png'),
                unit: '起'
              },
              {
                name: '其他',
                value: data.qt,
                icon: require('@image/ggjt/ic_jbxx_qt.png'),
                unit: '起'
              }
            ]
          };
          this.initLineChart(chartData)
        })
      },
      getDataTableData() {
        this.$axios({
          method: 'post',
          url: '/api/weiFaTingChe/all/dataTable',
          data: {
            id: this.info.id,
            page: this.pageParams.offset,
            pageSize: this.pageParams.pageSize
          }
        }).then(res => {
          const data = res.data.data.list;
          this.tableData = [];
          this.pageParams.total = res.data.data.total;
          let list = ['xh','cph','color','wtValue','wfRoad','time'];
          data.forEach((item, index) => {
            item.xh = index < 10 ? '0' + (index + 1) : index
          });
          for(let item of data){
            let obj = {};
            for(let key of list){
              obj[key] = item[key]
            }
            this.tableData.push(obj)
          }
        })
      },
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
            data: data.tongBi,
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
              data: data.all,
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
    }
  }
</script>

<style scoped lang="scss">
  .weiTing-details {
    display: flex;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: url("~@image/wftc/bj.png") no-repeat;
    padding-top: 35px;
    padding-left: 67px;
    pointer-events: auto;

    .road-info {
      width: 786px;

      .go-back {
        column-gap: 32px;
        font-size: 48px;
        text-shadow: fontFlash(rgba(255, 255, 255, .3));

        img {
          cursor: pointer;
        }
      }

      .road-title {
        margin-top: 70px;
        margin-bottom: 37px;
        padding-left: 29px;

        .title {
          letter-spacing: 2px;
          font-weight: bold;
          font-size: 42px;
          text-shadow: fontFlash(rgba(255, 255, 255, .3));
        }
      }

      .road-main {
        width: 786px;
        height: 1562px;
        padding: 40px 0 0 42px;
        border-radius: 16px;
        background: linear-gradient(180deg, rgba(14, 19, 21, .3) 0%, rgba(14, 19, 21, 0) 100%);

        .item-title {
          width: 435px;
          height: 72px;
          background: url("~@image/tcwt/bj_fxjl.png") no-repeat;
          padding-left: 21px;

          div:first-child {
            font-size: 24px;
            font-weight: bold;
          }

          div:last-child {
            line-height: 28px;
            font-size: 28px;
            font-weight: bold;
            margin-left: 22px;
          }
        }

        .trend-box {
          width: 744px;

          .line-chart {
            width: 744px;
            height: 380px;
            margin-top: 30px;
          }
        }

        .wt-all {
          padding-left: 57px;
          margin-top: 40px;
          width: 695px;
          height: 158px;
          background: url("~@image/wftc/bj_ljwtzs.png") no-repeat;

          .all-title {
            font-size: 32px;
            width: 392px;
          }

          .all-value {
            div {
              text-shadow: fontFlash(rgba(52, 168, 181, .3));
            }

            div:first-child {
              line-height: 64px;
              font-size: 64px;
              font-weight: bold;
              font-family: BarlowCondensed-Bold;
            }

            div:last-child {
              font-size: 32px;
            }
          }
        }

        .run-info {
          margin-bottom: 57px;
          display: flex;
          flex-wrap: wrap;
          row-gap: 31px;
          column-gap: 28px;
          margin-top: 42px;
        }
      }
    }

    .car-table {
      width: 2922px;
      padding-top: 139px;
      padding-left: 122px;

      .table-title {
        margin-bottom: 39px;
        letter-spacing: 2px;
        font-weight: bold;
        font-size: 42px;
        text-shadow: fontFlash(rgba(255, 255, 255, .3));
      }
    }
  }
</style>
