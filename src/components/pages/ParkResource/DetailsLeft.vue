<template>
  <div class="left-box">
    <Masks position="left"/>
    <div class="main-box">
      <img :src="require('@image/all/title-back.png')" @click="goBack" class="go-back">
      <ParkBaseInfo :list="baseList"/>
      <CommonTitle name="停车场运营信息" :icon="require('@image/tcts/icon_scfb.png')" top="58"/>
      <div class="run-info">
        <ParkBlockInfo v-for="item in parkList" :key="item.name" :params="item"/>
      </div>
    </div>
  </div>
</template>

<script>
  import ParkBlockInfo from '@cp/ParkResource/Components/ParkBlockInfo.vue'
  import ParkBaseInfo from '@cp/ParkResource/Components/ParkBaseInfo.vue'

  export default {
    name: "DetailsLeft",
    components: {ParkBaseInfo, ParkBlockInfo},
    props: ['info'],
    data() {
      return {
        parkList: [],
        baseList: [],
      }
    },
    methods: {
      goBack() {
        this.$emit('getEvent', 'goBack')
      },
      getParkBaseInfo() {
        this.$axios({
          method: 'post',
          url: '/api/parkTaiShi/markerDetails/parkBaseInfo',
          data: {
            id: this.info.markerId
          }
        }).then(res => {
          const data = res.data.data;
          this.baseList = [
            {
              name: '名称',
              value: data.name
            },
            {
              name: '地址',
              value: data.site
            },
            {
              name: '所属辖区',
              value: data.xq
            },
            {
              name: '停车场类型',
              value: data.parkType
            }
          ]
        })
      },
      getParkYunYing() {
        this.$axios({
          method: 'post',
          url: '/api/parkTaiShi/markerDetails/yunYingInfo',
          data: {
            id: this.info.markerId
          }
        }).then(res => {
          const data = res.data.data;
          this.parkList = [
            {
              name: '停车位泊位数',
              value: data.bws,
              icon: require('@image/tcts/ic_bws.png')
            },
            {
              name: '停车场占用数',
              value: data.zys,
              icon: require('@image/tcts/ic_zys.png')
            },
            {
              name: '今日驶入',
              value: data.jrsr,
              icon: require('@image/tcts/ic_jrsr.png')
            },
            {
              name: '今日驶离',
              value: data.jrsl,
              icon: require('@image/tcts/ic_jrls.png')
            },
            {
              name: '订单计费',
              value: data.ddjf,
              icon: require('@image/tcts/ic_ddjf.png')
            },
            {
              name: '恶意欠费',
              value: data.eyqf,
              icon: require('@image/tcts/ic_euqf.png')
            }
          ]
        })
      }
    },
    mounted() {
      this.getParkYunYing();
      this.getParkBaseInfo();
    }
  }
</script>

<style scoped lang="scss">
  .left-box {
    position: absolute;
    left: 0;
    padding-top: 35px;
    padding-right: 40px;
    height: 100%;
    width: 800px;

    .main-box {
      padding-left: 40px;
      position: relative;
      z-index: 2;

      .go-back {
        cursor: pointer;
      }

      .run-info {
        display: flex;
        flex-wrap: wrap;
        row-gap: 25px;
        column-gap: 30px;
        margin-top: 42px;
      }
    }
  }
</style>
