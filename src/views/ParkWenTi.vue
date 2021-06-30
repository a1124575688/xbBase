<template>
  <div class="park-box">
    <xb-ani-component mode="out-in" :component.sync="rightComponent" anime="right" ref="out-right" @getEvent="solveEvent" :info="info"></xb-ani-component>
    <xb-ani-component mode="out-in" :component.sync="bottomComponent" anime="bottom" ref="out-bottom" @getEvent="solveEvent"></xb-ani-component>
    <xb-ani-component mode="out-in" :component.sync="leftComponent" anime="left" ref="out-left" @getEvent="solveEvent" :info="info"></xb-ani-component>
    <SetScene :info="info" v-if="detailsPage"/>
    <PageAPI :tools="tools"/>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import SetScene from '@cp/ParkResource/Components/SetScene.vue'
  import rightComponent from '@cp/ParkWenTi/right.vue'
  import bottomComponent from '@cp/ParkWenTi/bottom.vue'
  import DetailsLeft from '@cp/ParkWenTi/DetailsLeft.vue'
  import DetailsRight from '@cp/ParkResource/DetailsRight.vue'
  import { mapState } from 'vuex'
  export default {
    name: "ParkWenTi",
    components: { SetScene },
    data () {
      return {
        info: {
          markerId: 1
        },
        rightComponent: rightComponent,
        bottomComponent: bottomComponent,
        leftComponent: null,
        tools: {
          pageName: '停车问题分析',
          list: [
            {
              ms: '停车场扎点下钻',
              apiName: 'window.web.fenXiMarkerDetails(扎点id)',
              callback: ()=>{
                this.fenXiMarkerDetails(1)
              }
            },
            {
              ms: '封闭式停车场(add上图,remove移除)',
              apiName: "legendEvent(0,'add')",
              callback: ()=>{
                this.legendEvent('封闭式停车场',true)
              }
            },
            {
              ms: '开放式停车场(add上图,remove移除)',
              apiName: "legendEvent(1,'add')",
              callback: ()=>{
                this.legendEvent('开放式停车场',true)
              }
            },
            {
              ms: '违停热力图(add上图,remove移除)',
              apiName: "legendEvent(2,'add')",
              callback: ()=>{
                this.legendEvent('违停热力图',true)
              }
            },
            {
              ms: '公交路线(add上图,remove移除)',
              apiName: "legendEvent(3,'add')",
              callback: ()=>{
                this.legendEvent('公交路线',true)
              }
            },
            {
              ms: '地理信息/3D模型切换(0是地理信息,1是3D模型)',
              apiName: "window.ue.XBWeb.modelCutWt(0)",
              callback: ()=>{}
            },
            {
              ms: '停车场扎点下钻名称(传给前端)',
              apiName: "window.web.setMarkerName('某某扎点')",
              callback: ()=>{
                window.web.setMarkerName('某某扎点')
              }
            }
          ]
        }
      }
    },
    created () {
      window.web.fenXiMarkerDetails = (id)=>{this.fenXiMarkerDetails(id)}
    },
    computed: mapState(['detailsPage']),
    methods: {
      ...mapMutations(['setDetailsPage']),
      legendEvent (name,active) {
        switch (name) {
          case '封闭式停车场':
            active ?
              window.ue.XBWeb.legendEvent(0,'add'):
              window.ue.XBWeb.legendEvent(0,'remove');
            break;
          case '开放式停车场':
            active ?
              window.ue.XBWeb.legendEvent(1,'add'):
              window.ue.XBWeb.legendEvent(1,'remove');
            break;
          case '违停热力图':
            active ?
              window.ue.XBWeb.legendEvent(2,'add'):
              window.ue.XBWeb.legendEvent(2,'remove');
            break;
          case '公交路线':
            active ?
              window.ue.XBWeb.legendEvent(3,'add'):
              window.ue.XBWeb.legendEvent(3,'remove');
            break;
        }
      },
      fenXiMarkerDetails (id) {
        this.info.markerId = id;
        this.setDetailsPage(true);
        this.leftComponent = DetailsLeft;
        this.rightComponent = DetailsRight;
        this.bottomComponent = null
      },
      solveEvent (type,value) {
        switch (type) {
          case 'goBack':
            this.leftComponent = null;
            this.rightComponent = rightComponent;
            this.bottomComponent = bottomComponent;
            this.setDetailsPage(false);
            if(window.ue){
              window.ue.XBWeb.goBackWt();
            }
            break;
          case 'getPark':
            this.legendEvent(value.name,value.active);
            break;
        }
      }
    },
    async beforeRouteLeave (to, from, next){
      const leaveAin = [
        this.$refs['out-right'].triggerRouteLeave(),
        this.$refs['out-bottom'].triggerRouteLeave(),
        this.$refs['out-left'].triggerRouteLeave()
      ];
      await Promise.all(leaveAin);
      next();
    }
  }
</script>

<style scoped lang="scss">
  .park-box{

  }
</style>
