<template>
  <div>
    <CommonTitle name="违停高发路段" :icon="require('@image/ggjt/ic_wtgfld.png')" :btn="true" :list="['本日','本月']"
                 @getType="getType" top="60"/>
    <div class="road-list flex-column">
      <div class="list-item flex-dom" v-for="(item,index) in roadList" :key="item.road">
        <div class="area-name">{{item.area}}</div>
        <div class="road-name">{{item.road}}</div>
        <Progress :percent="item.percent" :index="index"/>
        <div class="item-value flex-unit" :class="'item-value-' + (index + 1)">
          <div>{{item.value}}</div>
          <div>件</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Progress from '@cp/ParkWeiFa/Components/Progress.vue'

  export default {
    name: "WeiTingRoad",
    components: {Progress},
    data() {
      return {
        roadList: [],
        type: '本日'
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
          url: '/api/weiFaTingChe/all/weiTingRoad',
          data: {
            type: this.type
          }
        }).then(res => {
          this.roadList = res.data.data.list
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .road-list {
    padding-left: 36px;
    margin-top: 15px;
    row-gap: 15px;

    .list-item {
      .area-name, .road-name {
        font-size: 22px;
        color: setWhite(.8);
      }

      .area-name {
        margin-right: 15px;
      }

      .road-name {
        width: 110px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 23px;
      }

      .item-value {
        margin-left: 15px;

        div:first-child {
          font-family: BarlowCondensed-Bold;
          font-size: 30px;
          font-weight: bold;
        }

        div:last-child {
          font-size: 24px;
        }
      }

      .item-value-1 {
        color: rgba(248, 97, 74, 1);
      }

      .item-value-2 {
        color: rgba(251, 187, 76, 1);
      }

      .item-value-3 {
        color: rgba(231, 209, 94, 1);
      }
    }
  }
</style>
