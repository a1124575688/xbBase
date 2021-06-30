<template>
  <div>
    <CommonTitle name="各区违停事件数" :icon="require('@image/ggjt/ic_gqwtsjs.png')" :btn="true" :list="['本日','本月']"
                 @getType="getType" top="60"/>
    <div class="case-num-box flex-dom-between">
      <div class="case-box" v-for="(item,index) in caseList" :key="item.name" :class="'case-box-' + (index + 1)">
        <div class="case-num">{{item.value}}</div>
        <div class="case-name">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AreaWeiTingNum",
    data() {
      return {
        type: '本日',
        caseList: [],
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getType(type) {
        this.type = type;
        this.getData()
      },
      getData() {
        this.$axios({
          method: 'post',
          url: '/api/weiFaTingChe/all/weiTingCaseNum',
          data: {
            type: this.type
          }
        }).then(res => {
          this.caseList = res.data.data.list
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @function fontLight($color){
    @return 0 0 10px $color,0 0 20px $color,0 0 30px $color,0 0 40px $color
  }
  .case-num-box {
    margin-top: 40px;
    padding-left: 33px;

    .case-box {
      width: 192px;

      .case-num {
        text-align: center;
        line-height: 210px;
        width: 192px;
        height: 210px;
        font-family: BarlowCondensed-Bold;
        font-size: 60px;
        font-weight: bold;
        color: setWhite(.8);
      }

      .case-name {
        text-align: center;
        font-size: 28px;
        font-weight: bold;
      }
    }

    .case-box-1 {
      .case-num {
        background: url("~@image/wftc/bj_gqwtsjs_1.png") no-repeat;
        text-shadow: fontLight(rgba(255, 106, 71, .3));
      }
    }

    .case-box-2 {
      .case-num {
        background: url("~@image/wftc/bj_gqwtsjs_2.png") no-repeat;
        text-shadow: fontLight(rgba(229, 253, 255, 1));
      }
    }

    .case-box-3 {
      .case-num {
        background: url("~@image/wftc/bj_gqwtsjs_3.png") no-repeat;
        text-shadow: fontLight(rgba(255, 106, 71, .5));
      }
    }
  }
</style>
