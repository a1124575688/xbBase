<template>
  <div class="park-box">
    <xb-ani-component mode="out-in" :component.sync="rightComponent" anime="right" ref="out-right" @getEvent="solveEvent"></xb-ani-component>
    <xb-ani-component mode="out-in" :component.sync="bottomComponent" anime="bottom" ref="out-bottom" @getEvent="solveEvent"></xb-ani-component>
    <PageAPI :tools="tools"/>
  </div>
</template>

<script>
  import rightComponent from '@cp/ParkJiaoTong/right.vue'
  import bottomComponent from '@cp/ParkJiaoTong/bottom.vue'
  export default {
    name: "ParkJiaoTong",
    data () {
      return {
        rightComponent:rightComponent,
        bottomComponent:bottomComponent,
        tools: {
          pageName: '公共交通态势',
          list: [
            {
              ms: "公交车辆",
              apiName: "window.ue.XBWeb.mapElement(0,'add')",
              callback: () => {
                this.mapElement('公交车辆','true')
              }
            },
            {
              ms: "公共监控",
              apiName: "window.ue.XBWeb.mapElement(1,'add')",
              callback: () => {
                this.mapElement('公共监控','true')
              }
            },
            {
              ms: "公交站点",
              apiName: "window.ue.XBWeb.mapElement(2,'add')",
              callback: () => {
                this.mapElement('公共站点','true')
              }
            }
          ]
        }
      }
    },
    methods: {
      solveEvent (type,value) {
        switch (type) {
          case 'legendActive':
            this.mapElement(value.name,value.active)
        }
      },
      mapElement (type,status){
        switch (type) {
          case '公交车辆':
            status ?
              window.ue.XBWeb.mapElement(0,'add'):
              window.ue.XBWeb.mapElement(0,'remove');
            break;
          case '公共监控':
            status ?
              window.ue.XBWeb.mapElement(1,'add'):
              window.ue.XBWeb.mapElement(1,'remove');
            break;
          case '公共站点':
            status ?
              window.ue.XBWeb.mapElement(2,'add'):
              window.ue.XBWeb.mapElement(2,'remove')
        }
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
