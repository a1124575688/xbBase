<template>
  <div id="app">
    <headerUnit></headerUnit>
    <navigation/>
    <router-view/>
  </div>
</template>
<script>
  import headerUnit from '@cp/HeaderUnit'
  import navigation from '@cp/Navigation'
  export default {
    name: "app",
    components: { navigation,headerUnit },
  }
</script>
<style lang="scss">
#app {
  position: relative;
  color: white;
  /*background: gray;*/
  width: $mapWidth;
  height: $mapHeight;
}

</style>
