<template>
  <div>
    <CommonTitle name="违停事件分类" :icon="require('@image/ggjt/ic_wtsjfl.png')" :btn="true" :list="['本日','本月']"
                 @getType="getType"/>
    <CaseType :pieData="pieData" v-if="pieData"/>
  </div>
</template>

<script>
  import CaseType from '@cp/ParkWeiFa/Components/CaseType.vue'

  export default {
    name: "WeiTingType",
    components: {CaseType},
    data () {
      return {
        type: '本日',
        pieData: ''
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
          url: '/api/weiFaTingChe/all/weiTingType',
          data: {
            type: this.type
          }
        }).then(res => {
          this.pieData = res.data.data.list
        })
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
