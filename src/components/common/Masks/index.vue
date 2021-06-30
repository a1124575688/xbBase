<template>
  <div class="copy-mask" :triggertype="position" :style="renderOption()"></div>
</template>

<script>
  export default {
    name: "Masks",
    props: {
      position: String,
      color: {
        type: String,
        default: function () {
          return 'rgb(1,1,1)'
        }
      },
      zIndex: {
        default: 0
      }
    },
    methods: {
      renderOption: function () {
        let styles = {};
        const color = this.inspectColor(this.color);
        if (!color) {
          return {}
        }
        const res = color.match(/(\d(\.\d+)?)+/g);
        const R = res[0];
        const G = res[1];
        const B = res[2];
        switch (this.position) {
          case 'right':
            styles = {
              right: 0,
              top: 0,
              background: `linear-gradient(to left,rgba(${R},${G},${B},1) 0%,rgba(${R},${G},${B},.66) 72%,rgba(${R},${G},${B},0) 100%)`
            };
            break;
          case 'left':
            styles = {
              left: 0,
              top: 0,
              background: `linear-gradient(to right,rgba(${R},${G},${B},1) 0%,rgba(${R},${G},${B},.66) 72%,rgba(${R},${G},${B},0) 100%)`
            };
            break;
          case 'top':
            styles = {
              left: 0,
              top: 0,
              background: `linear-gradient(to bottom,rgba(${R},${G},${B},1) 0%,rgba(${R},${G},${B},.66) 72%,rgba(${R},${G},${B},0) 100%)`
            };
            break;
          case 'bottom':
            styles = {
              left: 0,
              bottom: 0,
              background: `linear-gradient(to top,rgba(${R},${G},${B},1) 0%,rgba(${R},${G},${B},.66) 72%,rgba(${R},${G},${B},0) 100%)`
            };
            break;
        }
        return {
          zIndex: this.zIndex,
          ...styles
        };
      },
      hexToRGB(hex) {
        // 16进制颜色值的正则
        const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        // 把颜色值变成小写
        let color = hex.toLowerCase();
        if (reg.test(color)) {
          // 如果只有三位的值，需变成六位，如：#fff => #ffffff
          if (color.length === 4) {
            let colorNew = "#";
            for (let i = 1; i < 4; i += 1) {
              colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
            }
            color = colorNew;
          }
          // 处理六位的颜色值，转为RGB
          const colorChange = [];
          for (let i = 1; i < 7; i += 2) {
            colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
          }
          return "RGB(" + colorChange.join(",") + ")";
        } else {
          return color;
        }
      },
      inspectColor(color) {
        const re1 = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i;
        const re2 = /^rgb\(([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]),([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]),([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\)$/i;
        const re3 = /^rgba\(([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]),([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]),([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]),(1|1.0|0.[0-9])\)$/i;
        if (re1.test(color)) {
          return this.hexToRGB(color);
        } else if (re2.test(color) || re3.test(color)) {
          return color;
        } else {
          console.warn('input color is illegal');
          return false;
        }
      }
    },
  }
</script>

<style scoped>
  .copy-mask {
    position: absolute;
    height: 100%;
    width: calc(100% + 200px);
    pointer-events: none;
  }
</style>
