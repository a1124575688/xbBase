<template>
  <div class="baoHe-legend legend">
    <div class="baoHe-item flex-dom" v-for="item in baoHeList" :key="item.text">
      <div :class="item.className"></div>
      <div>{{item.text}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BaoHeLegend",
    data () {
      return {
        baoHeList: [
          {
            className: 'red',
            text: '饱和度>80%'
          },
          {
            className: 'orange',
            text: '饱和度60%-80%'
          },
          {
            className: 'green',
            text: '饱和度<60%'
          }
        ],
      }
    }
  }
</script>

<style scoped lang="scss">
  .legend {
    width: 312px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid setWhite(.5);
    border-radius: 20px;
    padding-top: 20px;
    padding-left: 20px;
    margin-left: 30px;
    margin-bottom: 40px;
    .baoHe-item{
      margin-top: 10px;
      div:first-child{
        width: 32px;
        height: 28px;
        margin-right: 16px;
      }
      div:last-child{
        font-size: 30px;
        font-weight: bold;
      }
      .red{
        background: #FF445A;
      }
      .green{
        background: #05FF57;
      }
      .orange{
        background: #FF9E05;
      }
    }
  }
</style>
