<template>
  <div class="bottom-box">
    <BaoHeLegend/>
    <ParkLegend v-on="$listeners"/>
    <div class="park-overview">
      <div class="overview-title flex-dom">
        <div>停车资源纵览</div>
        <div></div>
      </div>
      <div class="park-info-box flex-dom">
        <div class="park-all">
          <div class="all-num flex-unit">
            <div>{{pageData.parkNum}}</div>
            <div>个</div>
          </div>
          <div class="all-text">停车场总量</div>
        </div>
        <ParkRingChart :data="pageData" v-if="pageData"/>
        <div class="park-all park-all-2">
          <div class="all-num flex-unit">
            <div>{{pageData.boCheNum}}</div>
            <div>个</div>
          </div>
          <div class="all-text">泊车位总量</div>
        </div>
        <ParkingSpotChart :percent="pageData.boCheBaoHe" v-if="pageData"/>
        <div class="spot-info flex-column">
          <div class="spot-item">
            <FourAngle size="6" color="rgba(255,255,255,.5)" offset="-2"/>
            <div class="spot-name">使用中</div>
            <div class="spot-value flex-unit">
              <div>{{pageData.boCheUse}}</div>
              <div>个</div>
            </div>
          </div>
          <div class="spot-item">
            <FourAngle size="6" color="rgba(255,255,255,.5)" offset="-2"/>
            <div class="spot-name">饱和度</div>
            <div class="spot-value flex-unit">
              <div>{{pageData.boCheBaoHe}}</div>
              <div>%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ParkingSpotChart from '@cp/ParkingSpotChart'
  import FourAngle from '@cc/FourAngle'
  import ParkRingChart from '@cp/ParkResource/Components/ParkRingChart';
  import BaoHeLegend from '@cp/ParkResource/Components/BaoHeLegend.vue';
  import ParkLegend from '@cp/ParkResource/Components/ParkLegend.vue';

  export default {
    name: "bottom",
    components: {ParkingSpotChart, FourAngle, ParkRingChart, BaoHeLegend, ParkLegend},
    data() {
      return {
        pageData: ''
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        this.$axios({
          method: 'post',
          url: '/api/parkTaiShi/all/zongLan',
        }).then(res => {
          this.pageData = res.data.data;
        })
      }
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
    padding-left: 10px;
    width: 100%;
    background: linear-gradient(to top, #010101 0%, rgba(1, 1, 1, 0.66) 72%, rgba(1, 1, 1, 0) 100%);

    .park-overview {
      width: 2154px;
      height: 542px;
      background: url("~@image/tcts/bj_db.png") no-repeat;
      padding-top: 106px;
      margin-left: 140px;

      .overview-title {
        div:first-child {
          font-size: 42px;
          color: rgba(199, 239, 255, 1);
          margin-right: 10px;
          font-weight: bold;
        }

        div:last-child {
          flex: 1;
          height: 2px;
          background: linear-gradient(90deg, setWhite(0) 0%, setWhite(.4) 10%, setWhite(.4) 90%, setWhite(0) 100%);
        }
      }

      .park-info-box {
        padding-top: 35px;

        .park-all {
          .all-num {
            width: 299px;
            height: 224px;
            background: url("~@image/tcts/dp.png") no-repeat;
            text-shadow: fontFlash(rgba(203, 247, 255, .3));
            color: rgba(232, 253, 255, 1);
            justify-content: center;
            font-family: BarlowCondensed-Bold;

            div:first-child {
              line-height: 59px;
              font-size: 72px;
              font-weight: bold;
            }

            div:last-child {
              font-weight: bold;
              font-size: 30px;
            }
          }

          .all-text {
            text-align: center;
            font-size: 36px;
            color: setWhite(.8);
            position: relative;
            top: -50px;
          }
        }

        .park-all-2 {
          margin-right: 46px;
        }

        .spot-info {
          row-gap: 16px;
          margin-left: 36px;

          .spot-item {
            padding-top: 10px;
            width: 160px;
            height: 128px;
            position: relative;
            background: setWhite(.1);
            text-align: center;

            .spot-name {
              color: setWhite(.75);
              font-size: 30px;
              font-weight: bold;
            }

            .spot-value {
              margin-top: 4px;
              justify-content: center;
              font-family: BarlowCondensed-Bold;

              div:first-child {
                font-size: 47px;
                font-weight: bold;
              }

              div:last-child {
                font-size: 30px;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
</style>
