<template>
  <div class="table-box">
    <div class="table-header" :style="setHeaderListStyle()">
      <div v-for="(item,index) in pageOption.header.headerListData" :key="item.name"
           :style="setHeaderStyle(item,index)">
        {{item.name}}
      </div>
    </div>
    <div class="table-list-box" :style="setMainBoxStyle()" :class="{'box-scroll':pageOption.main.mainBox.scroll}">
      <div class="table-list-item" v-for="(item,index) in listData" :key="index" :style="setMainListStyle(index)">
        <div v-for="(value,key,i) in item" :key="key"
             :style="setMainListItemStyle(value,i)"
             @click="itemEvent(value)"
             :title="typeof value === 'object' ? value.data : value">{{typeof value === 'object' ? value.data : value}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TableCp",
    data() {
      return {
        defaultOption: {
          header: {
            headerList: { //头部一整行列表的样式
              height: '',
              backgroundColor: ''
            },
            list: [
              {
                name: '头部名称',
                width: 200,//不传默认auto
                gap: 10,//左间距,不传默认10,gapRepeat为true时将失效
              }
            ],
            gap: 0,//要使用gapRepeat这个功能时,先把gap设置小一下,调整好了每一项的宽度过后再根据情况设置
            gapRepeat: false,//true表示间距相同,list里面不用传gap了,需要在header里面给gap传值
            fontSize: 24,
            bold: true,
            color: '#2aceff',
            center: false,
            other: {
              //可补充其他样式
            }
          },
          main: {
            listItem: { //列表中每一项的样式
              fontSize: 24,
              bold: true,
              center: false,
              marginTop: 10
            },
            mainBox: { //列表容器的样式
              height: 300,
              scroll: false
            },
            mainList: { //列表的样式

            },
            listHover: {
              //列表hover的样式,这里根据项目具体需求自己添加逻辑.比如选中后的class,自行编辑
              open: false,
              className: '',//传入的自定义类名,项目可能有多个表格,
            },
            //列表的背景,有些项目列表可能一行一个背景颜色
            listBg: {
              open: false,
              //奇数行样式,比如1,3,5,7,9行
              oddNumberStyle: {},
              //偶数行样式,比如2,4,6,8,10行
              evenNumberStyle: {}
            }
          }
        },
        pageOption: {}
      }
    },
    //样式配置和数据分开传参,方便表格更新数据
    props: ['options', 'listData'],
    methods: {
      itemEvent(item) {
        if (item.callback) {
          item.callback()
        }
      },
      init() {
        this.mixOption(this.options, this.defaultOption);
        this.pageOption = this.defaultOption;
      },
      setHeaderListStyle() {
        const headerList = this.pageOption.header.headerList;
        return {
          height: headerList.height + 'px',
          backgroundColor: headerList.backgroundColor,
          ...headerList.other
        }
      },
      setHeaderStyle(item, index) {
        let gap;
        const header = this.pageOption.header;
        if (this.pageOption.header.gapRepeat) {
          if (index === 0) {
            gap = 0
          } else {
            gap = this.pageOption.header.gap + 'px'
          }
        } else {
          gap = item.gap + 'px'
        }
        return {
          fontSize: header.fontSize + 'px',
          fontWeight: header.bold ? 'bold' : 'normal',
          color: header.color,
          width: item.width + 'px',
          marginLeft: gap,
          textAlign: header.center ? 'center' : 'normal',
          ...header.other
        }
      },
      setMainBoxStyle() {
        return {
          ...this.pageOption.main.mainBox
        }
      },
      setMainListStyle(index) {
        return {
          ...this.initListBg(index),
          ...this.pageOption.main.mainList
        };
      },
      setMainListItemStyle(item, index) {
        // let ellipsis;
        const mainList = this.pageOption.main.listItem;
        //直接从列表头部信息获取宽度和间距
        const style = this.setHeaderStyle(this.pageOption.header.headerListData[index], index);
        //合并每个单元格自己独立的样式
        return Object.assign({
          fontSize: mainList.fontSize + 'px',
          fontWeight: mainList.bold ? 'bold' : 'normal',
          textAlign: mainList.center ? 'center' : 'normal',
          marginTop: mainList.marginTop + 'px',
          width: style.width,
          marginLeft: style.marginLeft,
          ...mainList.other
        }, item.otherStyle || {})
      },
      initListBg(index) {
        const listBg = this.pageOption.main.listBg;
        if (!listBg.open) {
          return
        }
        if ((index + 1) % 2) {
          return listBg.oddNumberStyle
        } else {
          return listBg.evenNumberStyle
        }
      },
      mixOption(options, target) {
        if (this.isType('Object', options)) {
          for (let i in options) {
            if (options.hasOwnProperty(i) && options[i] !== undefined) {
              if (this.isType('Object', options[i])) {
                if (!this.isType('Object', target[i])) {
                  target[i] = {}
                }
                this.mixOption(options[i], target[i])
              } else {
                target[i] = options[i];
              }
            }
          }
        }
      },
      isType(type, target) {
        const Tag = `[object ${type}]`;
        return Object.prototype.toString.call(target) === Tag
      },
    },
    computed: {
      // initListHover () {
      //   //返回传入的类名,类名自己在当前文件style标签中添加
      //   if (this.pageOption.main.listHover.open) {
      //    return this.pageOption.main.listHover.className
      //   }
      //
      // },
    },
    created() {
      this.init()
    },
    mounted() {

    }
  }
</script>

<style scoped lang="scss">
  .table-header {
    display: flex;
    align-items: center;
  }

  .box-scroll {
    overflow-y: auto;
  }

  .table-list-box {
    .table-list-item {
      display: flex;
      align-items: center;

      div {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .hover-style:hover {
      background: setWhite(.2) !important;

      div {
        font-weight: bold !important;
        text-shadow: 0 0 7px rgba(74, 144, 227, 1),
        0 0 15px rgba(74, 144, 227, 1),
        0 0 30px rgba(74, 144, 227, 1),
        0 0 60px rgba(74, 144, 227, 1),
        0 0 6px rgba(74, 144, 227, 1) !important;
        overflow: unset !important;
        text-overflow: unset !important;
        white-space: unset !important;
      }
    }
  }
</style>
