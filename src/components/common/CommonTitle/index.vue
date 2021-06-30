<template>
  <div class="title-box flex-dom" :style="{marginTop:top + 'px'}">
    <img :src="icon">
    <div class="title-text">{{name}}</div>
    <div class="title-line"></div>
    <TypeSelect v-on="$listeners" v-if="btn" :list="list" style="margin-left: 20px"/>
  </div>
</template>

<script>
  import TypeSelect from '@cc/TypeSelect'
  export default {
    name: "index",
    components: { TypeSelect },
    props: {
      top: {
        default: 0
      },
      name: {
        default: '请传入名称'
      },
      list: {
        default () {
          return ['类型1','类型2']
        }
      },
      btn: {
        default: false
      },
      icon: {
        default: require('@image/tcts/icon_bczyfb.png')
      }
    },
    methods: {

    }
  }
</script>

<style scoped lang="scss">
  .title-box {
    .title-text {
      color: rgba(199, 239, 255, 1);
      font-size: 30px;
      font-weight: bold;
      margin-left: 7px;
      margin-right: 12px;
    }

    .title-line {
      flex: 1;
      height: 3px;
      background: setWhite(.17);
      position: relative;
    }

    .title-line:after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 2px;
      height: 3px;
      background: #FFFFFF;
    }
  }
</style>
