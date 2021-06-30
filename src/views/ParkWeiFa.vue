<template>
  <div class="park-box">
    <xb-ani-component mode="out-in" :component.sync="rightComponent" anime="right" ref="out-right" @getEvent="solveEvent"></xb-ani-component>
    <xb-ani-component mode="out-in" :component.sync="bottomComponent" anime="bottom" ref="out-bottom" @getEvent="solveEvent"></xb-ani-component>
    <PageAPI :tools="tools"/>
    <WeiTingDetails v-if="isDetails" @getEvent="solveEvent" :info="info"/>
  </div>
</template>

<script>
  import rightComponent from '@cp/ParkWeiFa/right.vue'
  import bottomComponent from '@cp/ParkWeiFa/bottom.vue'
  import WeiTingDetails from '@cp/ParkWeiFa/Components/WeiTingDetails.vue'
  import { mapMutations } from 'vuex'
  export default {
    name: "ParkWeiFa",
    components: { WeiTingDetails },
    data () {
      return {
        rightComponent:rightComponent,
        bottomComponent:bottomComponent,
        info:{
          id: 1
        },
        isDetails: false,
        tools: {
          pageName: '违法停车态势',
          list: [
            {
              ms: '违停道路详情',
              apiName: 'parkMarkerDetails',
              callback: () => {
                this.detailsPop()
              }
            }
          ],
        }
      }
    },
    created () {
      window.web.detailsPop = (id)=>{
        this.info.id = id;
        this.detailsPop()
      }
    },
    methods: {
      ...mapMutations(['setDetailsPage']),
      detailsPop () {
        this.setDetailsPage(true);
        this.isDetails = true;
        this.rightComponent = null;
        this.bottomComponent = null
      },
      solveEvent (type,value) {
        switch (type) {
          case 'goBack':
            this.isDetails = false;
            this.rightComponent = rightComponent;
            this.bottomComponent = bottomComponent;
            this.setDetailsPage(false);
            break;
        }
      }
    }
  }
</script>

<style scoped>

</style>
