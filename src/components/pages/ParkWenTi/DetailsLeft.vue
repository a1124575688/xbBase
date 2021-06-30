<template>
  <div class="left-box">
    <Masks position="left"/>
    <div class="main-box">
      <img :src="require('@image/all/title-back.png')" @click="goBack" class="go-back">
      <ParkBaseInfo :list="baseList"/>
      <div class="run-info">
        <ParkBlockInfo v-for="item in parkList" :key="item.name" :params="item"/>
      </div>
      <CommonTitle name="分析决策建议" :icon="require('@image/tcts/icon_scfb.png')" top="58"/>
      <div class="analyse-title">
        <div v-for="item in suggest">
          <div v-if="item">{{item}}</div>
        </div>
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
        suggest: {
          cx: '',
          tc: '',
          bhd: '',
          zzl: ''
        }
      }
    },
    mounted() {
      this.getParkBaseInfo();
      this.getSuggestData();
    },
    methods: {
      goBack() {
        this.$emit('getEvent', 'goBack')
      },
      getParkBaseInfo() {
        this.$axios({
          method: 'post',
          url: '/api/wenTiFenXi/detailsWenTi/detailsParkBaseInfo',
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
          ];
          this.parkList = [
            {
              name: '停车位泊位数',
              value: data.boWei,
              icon: require('@image/tcts/ic_bws.png')
            },
            {
              name: '停车场占用数',
              value: data.zhanYong,
              icon: require('@image/tcts/ic_zys.png')
            }
          ]
        })
      },
      getSuggestData() {
        this.$axios({
          method: 'post',
          url: '/api/wenTiFenXi/detailsWenTi/detailsSuggest',
          data: {
            id: this.info.markerId
          }
        }).then(res => {
          this.suggest = res.data.data;
        })
      }
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

      .analyse-title {
        font-size: 28px;
        color: setWhite(.7);
        margin-top: 35px;
        &>div{
          margin-top: 10px;
        }
      }
    }
  }
</style>
