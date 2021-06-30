<template>
  <div class="park-legend legend">
    <div class="park-item flex-dom" v-for="item in parkList" :key="item.name" :class="{'park-active':item.active}">
      <img :src="require('@image/tcts/ico_gx_off.png')" @click="parkEvent(item)">
      <div>{{item.name}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ParkLegend",
    data() {
      return {
        parkList: [
          {
            active: false,
            name: '封闭式停车场'
          },
          {
            active: false,
            name: '开放式停车场'
          },
          {
            active: false,
            name: '违停热力图'
          },
          {
            active: false,
            name: '公交路线'
          }
        ],
        abnormalPark: ''
      }
    },
    mounted() {
      this.getParkName()
    },
    methods: {
      parkEvent(item) {
        if (item.name === this.abnormalPark){
          return
        }
        item.active = !item.active;
        this.$emit('getEvent','getPark',item)
      },
      getParkName() {
        //如果停车场异常那么此扎点不可取消上图
        this.$axios({
          method: 'post',
          url: '/api/wenTiFenXi/all/getParkType',
        }).then(res => {
          this.abnormalPark = res.data.data.list;
          for(let item of this.abnormalPark){
            let target = this.parkList.find((i)=>{
              return i.name === item.parkName
            });
            target.active = true
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .legend {
    width: 312px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid setWhite(.5);
    border-radius: 20px;
    padding-top: 20px;
    padding-left: 20px;
    margin-left: 30px;
    margin-bottom: 40px;

    .baoHe-item {
      margin-top: 10px;

      div:first-child {
        width: 32px;
        height: 28px;
        margin-right: 16px;
      }

      div:last-child {
        font-size: 30px;
        font-weight: bold;
      }

      .red {
        background: #FF445A;
      }

      .green {
        background: #05FF57;
      }

      .orange {
        background: #FF9E05;
      }
    }
  }

  .park-legend {
    .park-item {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 10px;

      img {
        margin-right: 23px;
        cursor: pointer;
      }
    }

    .park-active {
      img {
        content: url("~@image/tcts/ico_gx_on.png");
      }
    }
  }
</style>
