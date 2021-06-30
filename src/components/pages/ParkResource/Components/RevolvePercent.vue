<template>
  <div class="revolve-box">
    <div class="revolve-header flex-dom-between">
      <div class="out-car">
        <div class="car-title flex-unit">
          <div>出场车</div>
          <div>(次)</div>
        </div>
        <div class="car-progress"></div>
      </div>
      <div class="revolve-percent position-center">
        <div>{{percent}}</div>
        <div>全市停车周转率</div>
      </div>
      <div class="enter-car">
        <div class="car-title flex-unit">
          <div>入场车</div>
          <div>(次)</div>
        </div>
        <div class="car-progress"></div>
      </div>
    </div>
    <div class="revolve-rank-box">
      <div class="rank-item flex-dom" v-for="item in list" :key="item.name">
        <div class="rank-value">{{item.outNum}}</div>
        <div class="rank-progress rank-progress-blue">
          <div :style="{width:item.outPercent + '%'}"></div>
        </div>
        <div class="rank-name">
          <FourAngle offset="-2"/>
          <div class="value">{{item.revolvePercent}}</div>
          <div class="name">{{item.name}}</div>
        </div>
        <div class="rank-progress rank-progress-orange">
          <div :style="{width:item.enterPercent + '%'}"></div>
        </div>
        <div class="rank-value">{{item.enterNum}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import FourAngle from '@cc/FourAngle'

  export default {
    name: "RevolvePercent",
    components: {FourAngle},
    data() {
      return {
        percent: 0,
        list: [
          {
            name: '海陵区',
            revolvePercent: 1.5,
            outNum: 10543,
            outPercent: 80,
            enterNum: 10242,
            enterPercent: 33
          },
          {
            name: '姜堰区',
            revolvePercent: 1.5,
            outNum: 10543,
            outPercent: 80,
            enterNum: 10242,
            enterPercent: 33
          },
          {
            name: '高港区',
            revolvePercent: 1.5,
            outNum: 10543,
            outPercent: 80,
            enterNum: 10242,
            enterPercent: 33
          }
        ]
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData() {
        this.$axios({
          method: 'post',
          url: '/api/parkTaiShi/all/revolvePercent',
        }).then(res => {
          const data = res.data.data;
          this.percent = data.percent;
          this.list = data.list
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .revolve-box {
    .revolve-header {
      position: relative;
      width: 740px;
      margin: 0 auto;
      margin-top: 23px;
      border-bottom: 2px solid setWhite(.2);
      padding-bottom: 18px;

      .out-car {
        width: 270px;
        height: 70px;
        background: url("~@image/tcts/bj_ccc.png") no-repeat;
        background-position-x: 29px;

        .car-progress {
          border-radius: 4px 0 0 4px;
          background: linear-gradient(90deg, rgba(97, 255, 255, 1) 0%, rgba(50, 146, 194, 0.5) 50%, rgba(50, 146, 194, 0) 100%);
        }
      }

      .enter-car {
        width: 270px;
        height: 70px;
        background: url("~@image/tcts/bj_rcc.png") no-repeat;
        background-position-x: 47px;

        .car-progress {
          border-radius: 0 4px 4px 0;
          background: linear-gradient(90deg, rgba(194, 122, 50, 0) 0%, rgba(194, 122, 50, 0.5) 50%, rgba(255, 202, 97, 1) 100%);
        }

        .car-title {
          padding-left: 77px;
        }
      }

      .revolve-percent {
        top: 28%;
        letter-spacing: 2px;
        padding-top: 115px;
        text-align: center;
        position: absolute;
        width: 266px;
        height: 286px;
        background: url("~@image/tcts/bj_zzl.png") no-repeat;

        div:first-child {
          font-size: 38px;
          font-weight: bold;
          font-family: BarlowCondensed-Bold;
          /*-webkit-text-stroke: 2px #1c666c;*/
          text-shadow: -2px 0 #1c666c, 0 2px #1c666c, 2px 0 #1c666c, 0 -2px #1c666c;
        }

        div:last-child {
          font-weight: bold;
          font-size: 20px;
          text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
        }
      }

      .car-progress {
        margin-top: 10px;
        width: 100%;
        height: 10px;
      }

      .car-title {
        transform: skew(-8deg);
        padding-left: 67px;
        padding-top: 10px;

        div {
          font-weight: bold;
          text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
        }

        div:first-child {
          font-size: 30px;
          margin-right: 10px;
        }

        div:last-child {
          font-size: 22px;
        }
      }
    }

    .revolve-rank-box {
      margin-top: 24px;

      .rank-item {
        justify-content: center;
        margin-bottom: 15px;

        .rank-value {
          transform: skew(-5deg);
          text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
          font-size: 30px;
          font-weight: bold;
          font-family: BarlowCondensed-Bold;
        }

        .rank-progress {
          width: 169px;
          height: 30px;
          background: rgba(255, 255, 255, 0.1);
        }

        .rank-progress-blue {
          border-radius: 4px 0 0 4px;
          margin-left: 15px;
          display: flex;
          justify-content: flex-end;

          div {
            height: 100%;
            border-radius: 4px 0 0 4px;
            background: linear-gradient(90deg, rgba(97, 255, 255, 1) 0%, rgba(50, 146, 194, 0.86) 30%, rgba(50, 146, 194, 0.86) 80%, rgba(50, 146, 194, 0.5) 100%);
          }
        }

        .rank-progress-orange {
          border-radius: 0 4px 4px 0;
          margin-right: 15px;

          div {
            height: 100%;
            border-radius: 0 4px 4px 0;
            background: linear-gradient(90deg, rgba(194, 122, 50, 0.65) 0%, rgba(255, 202, 97, 1) 100%);
          }
        }

        .rank-name {
          position: relative;
          width: 132px;
          height: 70px;
          border: 2px solid setWhite(.3);
          margin: 0 15px;
          text-align: center;
          font-family: BarlowCondensed-Bold;

          .value {
            font-size: 30px;
            font-weight: bold;
          }

          .name {
            line-height: 22px;
            font-size: 22px;
            font-weight: bold;
          }
        }
      }
    }
  }
</style>
