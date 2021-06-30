<template>
  <div class="set-scene position-center">
    <div class="scene-bg">
      <div class="btn-box"
           v-for="(item,index) in btnList"
           :class="[item.className,index === btnCheckIndex ? item.activeClass : '']"
           :key="item.name"
           @click="btnEvent(index)">
        <img :src="item.active" v-if="index === btnCheckIndex">
        <img :src="item.normal" v-else>
        <div class="name">{{item.name}}</div>
      </div>
    </div>
    <div class="scene-bottom">
      <div>{{markerName}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SetScene",
    props: ['info'],
    data () {
      return {
        btnCheckIndex: 0,
        btnList: [
          {
            name: '地理信息',
            className: 'btn-dl',
            activeClass: 'dl-active',
            normal: require('@image/all/ico_dl_def.png'),
            active: require('@image/all/ico_dl_sel.png')
          },
          {
            name: '3D模型',
            className: 'btn-mx',
            activeClass: 'mx-active',
            normal: require('@image/all/ico_3d_def.png'),
            active: require('@image/all/ico_3d_sel.png')
          }
        ],
        markerName: '南桥'
      }
    },
    created () {
      window.web.setMarkerName = (name)=>{
        this.markerName = name
      }
    },
    methods:{
      btnEvent (index) {
        this.btnCheckIndex = index;
        if(this.$route.path === '/parkResource' || this.$route.path === '/parkTeZheng'){
          if(window.ue){
            window.ue.XBWeb.modelCutTs(index)
          }
        }else {
          if(window.ue){
            window.ue.XBWeb.modelCutWt(index)
          }
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  .set-scene {
    width: $mapWidth;
    height: $mapHeight;
    padding-top: 107px;
    .scene-bg{
      width: 1768px;
      height: 1768px;
      background: url("~@image/tcts/bj-xz.png") no-repeat;
      margin-left: 1024px;
      position: relative;
      .btn-box{
        pointer-events: auto;
        position: absolute;
        cursor: pointer;
        text-align: center;
        .name{
          color: setWhite(.6);
          font-size: 30px;
        }
      }
      .btn-dl{
        width: 201px;
        height: 185px;
        top: 570px;
        left: 12px;
        padding-top: 34px;
        padding-right: 34px;
      }
      .btn-mx{
        width: 156px;
        height: 200px;
        top: 755px;
        left: 1px;
        padding-top: 34px;
        padding-right: 10px;
      }
      .dl-active{
        .name{
          color: setWhite(1);
        }
        background: url("~@image/all/bj-sel.png") no-repeat;
      }
      .mx-active{
        .name{
          color: setWhite(1);
        }
        background: url("~@image/all/bj_3dpng.png") no-repeat;
      }
    }
    .scene-bottom{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 3840px;
      height: 86px;
      background: url("~@image/tcts/bj_dlxx.png") no-repeat;
      div{
        position: absolute;
        left: 1800px;
        bottom: 70px;
        font-size: 48px;
        color: rgba(216, 252, 255, 1);
        text-shadow: -1px 0 rgba(23, 37, 52, 1), 0 1px rgba(23, 37, 52, 1), 1px 0 rgba(23, 37, 52, 1), 0 -1px rgba(23, 37, 52, 1);
      }
    }
  }
</style>
