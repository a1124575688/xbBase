<template>
  <div class="right-box">
    <Masks position="right"/>
    <div class="main-box">
      <CommonTitle name="分析结论" :icon="require('@image/tcwt/icon_bhd.png')"/>
      <div class="info-box">
        <div class="item-title flex-dom">
          <div>1</div>
          <div>停车饱和度</div>
        </div>
        <div class="item-content">
          <div>泰州市整体停车场饱和度
            <div class="font-orange">{{analyseInfo.bhd.value}}</div>
            ，停车资源规划
            <div class="font-orange">{{analyseInfo.bhd.gh}}</div>
            ，整体停车难度
            <div class="font-orange">{{analyseInfo.bhd.nd}}</div>
            。其中
            <div class="font-orange">{{analyseInfo.bhd.areaHigh}}</div>
            饱和度最高，停车难度高，
            <div class="font-orange">{{analyseInfo.bhd.areaLow}}</div>
            饱和度最低，停车难度低。
          </div>
        </div>
      </div>
      <div class="info-box">
        <div class="item-title flex-dom">
          <div>2</div>
          <div>停车周转率</div>
        </div>
        <div class="item-content">
          <div>全市停车周转率
            <div class="font-orange">{{analyseInfo.zzl.value}}</div>
            ，停车资源利用效率
            <div class="font-orange">{{analyseInfo.zzl.xl}}</div>
            。其中
            <div class="font-orange">{{analyseInfo.zzl.areaLow}}</div>
            停车周转率最低，停车资源利用效率待改善。
          </div>
        </div>
      </div>
      <div class="info-box">
        <div class="item-title flex-dom">
          <div>3</div>
          <div>潮汐规律明显</div>
        </div>
        <div class="item-content">
          <div v-if="Number(analyseInfo.cx.value) > 0">全市
            <div class="font-orange">{{analyseInfo.cx.value}}处</div>
            潮汐规律明显的路内停车场，建议规划为潮汐车位，白天改善交通，夜间缓解停车压力。
          </div>
          <div v-else>泰州市暂无潮汐规律明的路内停车场。</div>
        </div>
      </div>
      <div class="info-box">
        <div class="item-title flex-dom">
          <div>4</div>
          <div>停车时长异常</div>
        </div>
        <div class="item-content">
          <div v-if="Number(analyseInfo.time.value) > 0">全市
            <div class="font-orange">{{analyseInfo.time.value}}个</div>
            停车场停车时常异常，建议改善运营方式，调整收费模式。改善停车场车位长期占用问题。
          </div>
          <div v-else>泰州市暂无停车时长异常的停车场。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "right",
    data() {
      return {
        analyseInfo: {
          bhd: {
            value: '高',
            gh: '不足',
            nd: '中等',
            areaHigh: '海陵区',
            areaLow: '高港区'
          },
          zzl: {
            value: '高',
            xl: '一般',
            areaLow: '高港区'
          },
          cx: {
            value: 8
          },
          time: {
            value: 10
          }
        }
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData() {
        this.$axios({
          method: 'post',
          url: '/api/wenTiFenXi/all/fenXiJieLun',
        }).then(res => {
          this.analyseInfo = res.data.data
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .right-box {
    position: absolute;
    right: 0;
    padding-top: 181px;
    padding-right: 40px;
    height: 100%;

    .main-box {
      width: 800px;
      position: relative;
      z-index: 1;

      .info-box {
        .item-title {
          width: 435px;
          height: 72px;
          background: url("~@image/tcwt/bj_fxjl.png") no-repeat;
          padding-left: 32px;
          margin-top: 35px;

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

        .item-content {
          margin-top: 15px;
          margin-left: 5px;
          padding: 36px;
          width: 741px;
          height: 282px;
          border-radius: 4px;
          border: 2px solid setWhite(.25);
          background: linear-gradient(-47deg, rgba(41, 50, 65, .4), rgba(13, 17, 22, .4));

          div {
            display: inline-block;
            font-size: 28px;
            color: setWhite(.85);
            line-height: 40px;
          }

          .font-orange {
            color: #d4a853 !important;
          }
        }
      }
    }
  }
</style>
