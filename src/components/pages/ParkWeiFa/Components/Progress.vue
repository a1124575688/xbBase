<template>
  <div class="progress-box">
    <div class="progress" :style="{width:percent + '%'}" :class="'progress-' + (index + 1)"></div>
  </div>
</template>

<script>
  export default {
    name: "Progress",
    props: ['percent','index']
  }
</script>

<style scoped lang="scss">
  .progress-box{
    width: 454px;
    height: 14px;
    background: rgba(83, 92, 98, .6);
    .progress{
      height: 100%;
      width: 50%;
      border-radius: 0 4px 4px 0;
      background: linear-gradient(-90deg, #D9FBFF, rgba(106, 130, 142, 0.86));
    }
    .progress-1{

      background: linear-gradient(-90deg, #F9614A, rgba(177, 64, 47, 0.65));
    }
    .progress-2{
      background: linear-gradient(-90deg, #FDBD4C, rgba(154, 115, 39, 0.65));
    }
    .progress-3{
      background: linear-gradient(-90deg, #E9D25E, rgba(197, 176, 67, 0.65));
    }
  }
</style>
