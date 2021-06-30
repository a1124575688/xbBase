<template>
  <div class="api-box" v-show="toolShow">
    <div class="title-box flex-dom-between">
      <div>当前云图：{{tools.pageName}}</div>
      <div>回车开关工具</div>
    </div>
    <div class="api-item flex-dom">
      <div>描述</div>
      <div>接口名(点击执行)</div>
    </div>
    <div class="api-item flex-dom api-item-2" v-for="item in tools.list" :key="item.ms" @click="apiEvent(item)">
      <div>{{item.ms}}</div>
      <div>{{item.apiName}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: ['tools'],
    data () {
      return {
        toolShow: false
      }
    },
    mounted() {
      this.initTool()
    },
    methods: {
      initTool () {
        //在全局中绑定按下事件
        document.onkeydown = (event) => {
          let e = event || window.e;
          let keyCode = e.keyCode || e.which;
          if (keyCode == 13) {//回车
            this.toolShow = !this.toolShow
          }
        }
      },
      apiEvent (item) {
        item.callback()
      }
    }
  }
</script>

<style scoped lang="scss">
  .api-box {
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translateX(-50%);
    color: rgba(0,0,0,.65);
    width: 1100px;
    background-color: #fafafa;
    font-size: 22px;
    pointer-events: auto;
    .title-box{
      padding-left: 20px;
      padding-right: 20px;
      height: 35px;
      line-height: 35px;
      font-weight: bold;
      border: 1px solid rgba(0,0,0,.7);
    }
    .api-item{
      height: 40px;
      line-height: 40px;
      div{
        border: 1px solid rgba(0,0,0,.7);
        font-weight: bold;
        padding-left: 20px;
      }
      div:first-child{
        width: 50%;
      }
      div:last-child{
        width: 50%;
      }
    }
    .api-item-2{
      div{
        font-weight: unset;
      }
      div:last-child{
        cursor: pointer;
      }
    }
  }
</style>
