<template>
  <div class="park-box">
    <xb-ani-component mode="out-in" :component.sync="rightComponent" anime="right" ref="out-right" @getEvent="solveEvent"></xb-ani-component>
    <xb-ani-component mode="out-in" :component.sync="leftComponent" anime="left" ref="out-left" @getEvent="solveEvent" :info="info"></xb-ani-component>
    <xb-ani-component mode="out-in" :component.sync="bottomComponent" anime="bottom" ref="out-bottom" @getEvent="solveEvent"></xb-ani-component>
    <SetScene :info="info" v-if="detailsPage"/>
    <PageAPI :tools="tools"/>
  </div>
</template>

<script>
  import SetScene from '@cp/ParkResource/Components/SetScene.vue'
  import rightComponent from '@cp/ParkTeZheng/right.vue'
  import bottomComponent from '@cp/ParkTeZheng/bottom.vue'
  import DetailsLeft from '@cp/ParkResource/DetailsLeft.vue'
  import DetailsRight from '@cp/ParkResource/DetailsRight.vue'
  import { mapState } from 'vuex'
  import { mapMutations } from 'vuex'
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
          pageName: '停车特征纵览',
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
              apiName: "window.ue.XBWeb.parkMarkerTz(0,'add')",
              callback: ()=>{
                this.parkMarker('封闭式',true)
              }
            },
            {
              ms: '开放式停车场(add,remove移除)',
              apiName: "window.ue.XBWeb.parkMarkerTz(1,'add')",
              callback: ()=>{
                this.parkMarker('开放式',true)
              }
            }
          ]
        }
      }
    },
    created (){
      window.web.parkMarkerDetails = (id)=>{this.parkMarkerDetails(id)};
      window.web.goBack = ()=>{this.solveEvent('goBack',false)}
    },
    methods: {
      ...mapMutations(['setDetailsPage']),
      parkMarkerDetails (id) {
        this.info.markerId = id;
        this.setDetailsPage(true);
        this.leftComponent = DetailsLeft;
        this.rightComponent = DetailsRight;
        this.bottomComponent = null
      },
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
    computed: mapState(['detailsPage']),
    async beforeRouteLeave (to, from, next){
      const leaveAin = [
        this.$refs['out-right'].triggerRouteLeave(),
        this.$refs['out-bottom'].triggerRouteLeave()
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
