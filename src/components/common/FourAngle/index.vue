<template>
  <div class="angle-box">
    <div class="angle-1" :style="{width:size + 'px',height:size + 'px',left:offset + 'px',top:offset + 'px',background:color}"></div>
    <div class="angle-2" :style="{width:size + 'px',height:size + 'px',right:offset + 'px',top:offset + 'px',background:color}"></div>
    <div class="angle-3" :style="{width:size + 'px',height:size + 'px',bottom:offset + 'px',right:offset + 'px',background:color}"></div>
    <div class="angle-4" :style="{width:size + 'px',height:size + 'px',left:offset + 'px',bottom:offset + 'px',background:color}"></div>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: {
      offset: {
        default: 0
      },
      size: {
        default: 2
      },
      color: {
        default: 'rgba(255,255,255,1)'
      }
    }
  }
</script>

<style scoped lang="scss">
  .angle-box {
    /*position: relative;*/
    div{
      position: absolute;
    }
  }
</style>
