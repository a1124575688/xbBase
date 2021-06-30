<template>
  <div class="mask-box">
    <div class="navigation-box" v-show="!detailsPage">
      <div class="active-bg" :style="{top:activeBgTop + 'px'}"></div>
      <router-link
        tag="div"
        :to="item.path"
        :key="item.name"
        class="flex-dom nav-item"
        :active-class="'active-' + (index + 1) + ' ' + 'active'"
        @click.native="routerEvent(index)"
        v-for="(item,index) in list">
        <div class="default-icon flex-dom">
          <img :src="item.icon">
        </div>
        <div class="route-name">{{item.name}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "navigation",
    watch: {
      $route(to) {
        this.activeBgTop = to.meta.index * 162 - 5;
      }
    },
    data() {
      return {
        activeBgTop: -5,
        list: [
          {
            name: '停车资源态势',
            path: '/parkResource',
            icon: require('@image/nav/ico_nav_tczy_default.png')
          },
          {
            name: '停车特征纵览',
            path: '/parkTeZheng',
            icon: require('@image/nav/ico_nav_tzzl_default.png')
          },
          {
            name: '停车问题分析',
            path: '/parkWenTi',
            icon: require('@image/nav/ico_nav_wtfx_default.png')
          },
          {
            name: '违法停车态势',
            path: '/parkWeiFa',
            icon: require('@image/nav/ico_nav_wftc_default.png')
          },
          {
            name: '公共交通态势',
            path: '/parkJiaoTong',
            icon: require('@image/nav/ico_nav_ggjt_default.png')
          }
        ]
      }
    },
    methods: {
      routerEvent(index) {
        if(window.ue){
          window.ue.XBWeb.lefNav(index)
        }
      }
    },
    created () {
      if(window.ue){
        window.ue.XBWeb.lefNav(0)
      }
    },
    computed: mapState(['detailsPage'])
  }
</script>

<style scoped lang="scss">
  .mask-box{
    position: absolute;
    left: 0;
    top: 0;
    width: 700px;
    height: 100%;
    background: linear-gradient(to right, rgb(1, 1, 1) 0%, rgba(1, 1, 1, 0.66) 72%, rgba(1, 1, 1, 0) 100%);
    .navigation-box {
      width: 340px;
      height: 812px;
      border-radius: 10px;
      border: 3px solid setWhite(.33);
      position: absolute;
      left: 41px;
      top: 245px;
      pointer-events: auto;

      .active-bg {
        width: 376px;
        height: 167px;
        position: absolute;
        left: -5px;
        background: url("~@image/nav/bj_dh.png") no-repeat;
        transition: .1s;
      }

      & > div:last-child:after {
        width: 300px;
        height: 2px;
        background: rgba(255, 255, 255, 0);
        position: absolute;
        bottom: -10px;
        left: 12px;
        content: '';
      }

      .nav-item {
        cursor: pointer;
        height: 161px;
        position: relative;
        padding-left: 11px;

        .default-icon {
          width: 93px;
          height: 93px;
          justify-content: center;
        }

        .route-name {
          font-weight: bold;
          font-size: 36px;
          background-image: -webkit-linear-gradient(bottom, rgba(132, 170, 196, 1), rgba(255, 255, 255, 1));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }

      .nav-item:after {
        width: 300px;
        height: 2px;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, 0) 100%);
        position: absolute;
        bottom: -1px;
        left: 12px;
        content: '';
      }

      .active {
        .route-name {
          font-weight: bold;
          font-size: 36px;
          color: #F2FAFF;
          background-image: unset;
          -webkit-background-clip: unset;
          -webkit-text-fill-color: unset;
        }
      }

      .active-1 {
        img {
          content: url("~@image/nav/ico_nav_tczy_sel.png");
        }
      }

      .active-2 {
        img {
          content: url("~@image/nav/ico_nav_tzzl_sel.png");
        }
      }

      .active-3 {
        img {
          content: url("~@image/nav/ico_nav_wtfxl_sel.png");
        }
      }

      .active-4 {
        img {
          content: url("~@image/nav/ico_nav_wftc_sel.png");
        }
      }

      .active-5 {
        img {
          content: url("~@image/nav/ico_nav_ggjt_sel.png");
        }
      }
    }
  }
</style>
