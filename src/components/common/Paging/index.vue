<template>
  <div class="flex">
    <div>共{{ count }}条</div>
    <div class="page-width">
      <div class="prev page-btn" @click="handler(offset - 1)" :class="{hide: offset <= 1}">上一页</div>
      <div v-if="djzb" style="display:inline-block">
        <div class="page-btn" :class="{activeYellow: pageIndex == offset}" @click="handler(pageIndex)" v-for="(pageIndex, key) in list" :key="key">{{ pageIndex }}</div>
      </div>
      <div v-else style="display:inline-block">
        <div class="page-btn" :class="{active: pageIndex == offset}" @click="handler(pageIndex)" v-for="(pageIndex, key) in list" :key="key">{{ pageIndex }}</div>
      </div>
      <div class="next page-btn" @click="handler(offset + 1)" :class="{hide: offset >= max}">下一页</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["count", "offset", "pageSize","djzb"],
    components: {},
    data() {
      return {
        max: 0,
        list: []
      };
    },
    watch: {
      count() {
        this.init();
      },
      offset() {
        this.init();
      }
    },
    created() {
      this.init();
    },
    mounted(){

    },
    methods: {
      init() {
        let max = (this.max = Math.ceil(this.count / this.pageSize));
        let list = [];
        let a = this.offset - 5;
        let b = this.offset + 5;
        if (b > max) {
          b = max;
          a = max - 10;
          if (a < 0) {
            a = 1;
          }
        }
        if (a < 1) {
          a = 1;
          b = a + 10;
          if (b > max) {
            b = max;
          }
        }
        for (let i = a; i <= b; i++) {
          list.push(i);
        }
        this.list = list;
      },
      handler(pageIndex) {
        if (pageIndex == this.offset) {
          return false;
        }
        this.$emit("handler", pageIndex);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .flex{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24px;
  }
  .page-btn {
    cursor: pointer;
    display: inline-block;
    padding: 8px 15px;
    border: 1px solid rgba($color: #fff, $alpha: 0.4);
    border-radius: 4px;
    margin-left: 10px;
    transition-duration: 0.2s;
    min-width: 62px;
    text-align: center;

    &:hover,
    &.active {
      color: rgba(42, 206, 255, 1);
      border: 2px solid rgba(42, 206, 255, 1);
      box-shadow: 0 0 5px 2px rgba(42, 206, 255, 0.6) inset;
      background: transparent;
    }

    &.hide {
      display: none;
    }

    &.prev,
    &.next {
      color: rgba($color: #fff, $alpha: 0.2);
    }
  }

  .page-width {
    text-align: right;
    word-spacing: normal;
  }
  .activeYellow{
    color: #FFBB51;
    border: 2px solid #FFBB51;
    -webkit-box-shadow: 0 0 5px 2px #AB9257 inset;
    box-shadow: 0 0 5px 2px #AB9257 inset;
    background: transparent;
  }
</style>
