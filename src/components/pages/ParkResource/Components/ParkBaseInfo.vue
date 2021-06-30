<template>
  <div class="park-base-info">
    <CommonTitle name="停车场基本信息" :icon="require('@image/tcts/icon_fxjc.png')" top="84"/>
    <div class="info-item flex-dom" v-for="item in list" :key="item.name">
      <div>{{item.name}}：</div>
      <div>{{item.value}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ParkBaseInfo",
    props: {
      list: {
        default () {
          return [
            {
              name: '名称',
              value: '停车场名称'
            },
            {
              name: '停车场类型',
              value: '停车场名称'
            },
            {
              name: '所属辖区',
              value: '车城大道'
            },
            {
              name: '停车场地址',
              value: '成都市锦江区滨江东路66号'
            }
          ]
        }
      }
    },
    data () {
      return {

      }
    }
  }
</script>

<style scoped lang="scss">
  .park-base-info{
    .info-item{
      margin-top: 40px;
      font-size: 24px;
      div:first-child{
        width: 144px;
        color: setWhite(.6);
      }
      div:last-child{
        color: rgba(148, 253, 255, 1);
      }
    }
  }
</style>
