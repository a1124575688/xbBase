<template>
  <div class="header-unit">
    <div class="header-day">
      <div class="flex-dom" v-show="!detailsPage">
        <div class="day-time">
          <div>{{dateInfo.date}}</div>
          <div class="flex-dom flex-dom-between">
            <div>{{dateInfo.week}}</div>
            <div>{{dateInfo.time}}</div>
          </div>
        </div>
        <div class="day-weather flex-dom">
          <img :src="require('@image/header/weather.png')">
          <div>20</div>
          <div>°C</div>
        </div>
        <div class="day-pm flex-dom">
          <div>36</div>
          <div>PM2.5</div>
        </div>
      </div>
    </div>
    <div class="header-title">泰州运行智能管理平台·停车专题</div>
    <div class="header-user flex-dom">
      <div>泰州市大数据局</div>
      <img :src="require('@image/header/ic_title_grzx.png')">
      <img :src="require('@image/header/ic_title_sz.png')">
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "index",
    data () {
      return {
        dateInfo: {
          date: '',
          time: '',
          week: '',
          timer: null
        }
      }
    },
    created() {
      this.initDate()
    },
    methods: {
      initDate() {
        this.initialize();
        this.dateInfo.timer = setInterval(this.initialize, 60000);
        this.$once('hook:beforeDestroy', () => {
          clearInterval(this.dateInfo.timer)
        })
      },
      initialize () {
        this.dateInfo.date = this.$moment().format('YYYY年M月D日');
        this.dateInfo.time = this.$moment().format('HH:mm');
        this.dateInfo.week = '星期' + this.formatWeek(this.$moment().format('d'));
      },
      formatWeek (i) {
        const array = ['一','二','三','四','五','六','天'];
        return array[Number(i) - 1]
      }
    },
    computed: mapState(['detailsPage'])
  }
</script>

<style scoped lang="scss">
  .header-unit {
    height: 133px;
    background: url("~@image/header/title_bj.png") no-repeat 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    padding-left: 19px;
    z-index: 2;
    pointer-events: none;
    .header-day {
      width: 383px;
      height: 70px;
      &>div{
        height: 100%;
      }
      .day-time {
        font-size: 16px;
        font-weight: bold;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      .day-weather{
        font-size: 21px;
        margin-left: 23px;
        height: 30px;
        padding-right: 17px;
        border-right: 1px solid setWhite(.2);
        div:nth-child(2){
          font-weight: bold;
          margin-left: 7px;
        }
      }
      .day-pm{
        margin-left: 8px;
        div:first-child{
          font-size: 26px;
          font-weight: bold;
          margin-right: 12px;
        }
        div:last-child{
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
    .header-title{
      text-align: center;
      font-size: 66px;
      font-weight: bold;
      letter-spacing: 20px;
      padding-right: 186px;
      /*margin-left: 1049px;*/
      /*width: 3630px;*/
      text-shadow: fontFlash(rgba(131, 251, 255, .2))
    }
    .header-user{
      height: 70px;
      font-size: 20px;
      div{
        margin-right: 16px;
        position: relative;
      }
      div:after{
        position: absolute;
        right: -50px;
        top: -2px;
        content: '';
        width: 1px;
        height: 30px;
        background: setWhite(.2);
      }
      img{
        cursor: pointer;
        margin-right: 19px;
      }
    }
  }
</style>
