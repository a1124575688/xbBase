<template>
  <div class="bottom-box">
    <ParkLegend v-on="$listeners"/>
    <div class="park-overview">
      <div class="park-main flex-dom">
        <div class="area-select">
          <div v-for="(item,index) in areaList" @click="areaEvent(item)" :class="{'area-active':activeArea === item}"
               :style="{left:index * -15 + 'px'}" :key="item">{{item}}
          </div>
        </div>
        <div class="park-info flex-dom-between">
          <div class="park-all" v-for="item in infoList" :key="item.name">
            <div class="all-num flex-unit">
              <div>{{item.value}}</div>
              <div>个</div>
            </div>
            <div class="all-text">{{item.name}}</div>
            <div class="item-line" v-if="item.name !== '停车时长异常'"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BaoHeLegend from '@cp/ParkResource/Components/BaoHeLegend.vue';
  import ParkLegend from '@cp/ParkWenTi/Components/ParkLegend.vue';
  import TypeSelect from '@cc/TypeSelect'

  export default {
    name: "bottom",
    components: {BaoHeLegend, ParkLegend, TypeSelect},
    data() {
      return {
        areaList: ['全市', '高港区', '姜堰区', '海陵区'],
        activeArea: '全市',
        infoList: [
          {
            name: '饱和度异常',
            value: 1
          }, {
            name: '周转率异常',
            value: 4
          }, {
            name: '潮汐规律明显',
            value: 2
          }, {
            name: '停车时长异常',
            value: 1
          }]
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      areaEvent(item) {
        this.activeArea = item;
        this.getData()
      },
      getData() {
        this.$axios({
          method: 'post',
          url: '/api/wenTiFenXi/all/parkWenTiInfo',
          data: {
            area: this.activeArea
          }
        }).then(res => {
          const data = res.data.data;
          this.infoList = [
            {
              name: '饱和度异常',
              value: data.bhd
            }, {
              name: '周转率异常',
              value: data.zzl
            }, {
              name: '潮汐规律明显',
              value: data.cx
            }, {
              name: '停车时长异常',
              value: data.time
            }]
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
    padding-left: 120px;
    width: 100%;
    background: linear-gradient(to top, #010101 0%, rgba(1, 1, 1, 0.66) 72%, rgba(1, 1, 1, 0) 100%);

    .park-overview {
      width: 2154px;
      height: 542px;
      background: url("~@image/tcts/bj_db.png") no-repeat;
      padding-top: 131px;
      margin-left: 84px;
      margin-bottom: 40px;

      .park-main {
        width: 2264px;
        height: 410px;
        padding-top: 70px;
        padding-left: 130px;
        background: url("~@image/tcwt/bj-tcwtfx.png") no-repeat;

        .area-select {
          div {
            margin-top: 10px;
            position: relative;
            cursor: pointer;
            font-size: 28px;
            color: setWhite(.5);
            width: 296px;
            height: 68px;
            text-align: center;
            background: url("~@image/tcwt/bj-default.png") no-repeat;
          }

          .area-active {
            font-size: 36px;
            color: setWhite(1);
            background: url("~@image/tcwt/bj-select.png") no-repeat;
          }
        }

        .park-info {
          flex: 1;
          padding-left: 60px;
          padding-right: 40px;

          .park-all {
            height: 363px;
            padding-top: 60px;
            position: relative;
            .all-num {
              width: 299px;
              height: 224px;
              background: url("~@image/tcwt/bottomIcon.png") no-repeat;
              text-shadow: fontFlash(rgba(254, 209, 138, .3));
              color: rgba(255, 247, 234, 1);
              justify-content: center;
              font-family: BarlowCondensed-Bold;

              div:last-child {
                font-weight: bold;
                font-size: 40px;
              }

              div:first-child {
                line-height: 59px;
                font-size: 90px;
                font-weight: bold;
              }
            }
            .all-text {
              text-align: center;
              font-size: 36px;
              position: relative;
              top: -30px;
            }
            .item-line{
              position: absolute;
              right: -100px;
              top: 0;
              width: 192px;
              height: 363px;
              background: url("~@image/tcwt/line.png") no-repeat;
            }
          }
        }
      }
    }
  }
</style>
