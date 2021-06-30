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
  import rightComponent from '@cp/ParkResource/right.vue'
  import bottomComponent from '@cp/ParkResource/bottom.vue'
  import DetailsLeft from '@cp/ParkResource/DetailsLeft.vue'
  import DetailsRight from '@cp/ParkResource/DetailsRight.vue'
  import { mapState } from 'vuex'
  export default {
    name: "ParkResource",
    components: { SetScene },
    data () {
      return {
        rightComponent: rightComponent,
        bottomComponent: bottomComponent,
        leftComponent: null,
        info: {
          markerId: 1
        },
        tools: {
          pageName: '停车资源态势',
          list: [
            {
              ms: '停车场扎点下钻',
              apiName: 'window.web.parkMarkerDetails(扎点ID)',
              callback: ()=>{
                this.parkMarkerDetails(1)
              }
            },
            {
              ms: '封闭式停车场(add,remove移除)',
              apiName: "window.ue.XBWeb.parkMarkerTs(0,'add')",
              callback: ()=>{
                this.parkMarker('封闭式',true)
              }
            },
            {
              ms: '开放式停车场(add,remove移除)',
              apiName: "window.ue.XBWeb.parkMarkerTs(1,'add')",
              callback: ()=>{
                this.parkMarker('开放式',true)
              }
            },
            {
              ms: '从扎点详情返回',
              apiName: "window.ue.XBWeb.goBackTs",
              callback: ()=>{}
            },
            {
              ms: '地理信息/3D模型切换(0是地理信息,1是3D模型)',
              apiName: "window.ue.XBWeb.modelCutTs(0)",
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
    created (){
      window.web.parkMarkerDetails = (id)=>{
        this.parkMarkerDetails(id)
      };
      window.web.goBack = ()=>{this.solveEvent('goBack',false)}
    },
    computed: mapState(['detailsPage']),
    methods: {
      ...mapMutations(['setDetailsPage']),
      solveEvent (type,value) {
        switch (type) {
          //返回主页
          case 'goBack':
            this.leftComponent = null;
            this.rightComponent = rightComponent;
            this.bottomComponent = bottomComponent;
            this.setDetailsPage(false);
            if(window.ue){
              window.ue.XBWeb.goBackTs();
            }
            break;
          //扎点选择
          case 'getPark':
            this.parkMarker(value.key,value.active);
            break;
        }
      },
      parkMarkerDetails (id) {
        this.info.markerId = id;
        this.setDetailsPage(true);
        this.leftComponent = DetailsLeft;
        this.rightComponent = DetailsRight;
        this.bottomComponent = null
      },
      parkMarker (type,status) {
        if(status){
          if (type === '封闭式'){
            console.log('上图封闭式停车场扎点');
            if(window.ue){
              window.ue.XBWeb.parkMarkerTs(0,'add')
            }
          }else {
            console.log('上图开放式停车场扎点');
            if(window.ue){
              window.ue.XBWeb.parkMarkerTs(1,'add')
            }
          }
        }else {
          if (type === '封闭式'){
            console.log('移除封闭式停车场扎点');
            if(window.ue){
              window.ue.XBWeb.parkMarkerTs(0,'remove')
            }
          }else {
            console.log('移除开放式停车场扎点');
            if(window.ue){
              window.ue.XBWeb.parkMarkerTs(1,'remove')
            }
          }
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
</style>
