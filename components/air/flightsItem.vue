<template>
  <section class="container">
    <!-- 航班列表的渲染 -->
    <el-row
      type="flex"
      align="middle"
      class="flight-info"
      @click.native="isShowSeatInfos=!isShowSeatInfos"
    >
      <el-col :span="6">{{data.airline_name+data.flight_no}}</el-col>
      <el-col :span="12">
        <el-row type="flex" justify="space-between" class="flight-info-center">
          <el-col :span="8">
            <strong>{{data.dep_time}}</strong>
            <br />
            <span>{{data.org_airport_name+data.org_airport_quay}}</span>
          </el-col>
          <el-col :span="8" class="flight-time">
            <span>{{rankTime}}</span>
          </el-col>
          <el-col :span="8">
            <strong>{{data.arr_time}}</strong>
            <br />
            <span>{{data.dst_airport_name+data.dst_airport_quay}}</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6" class="flight-price">
        ￥
        <i>{{data.base_price}}</i>
        起
      </el-col>
    </el-row>

    <!-- 控制列表的展开 -->
    <el-row type="flex" justify align="middle" class="flight-recommend" v-show="isShowSeatInfos">
      <el-col :span="4">低价推荐</el-col>
      <el-col :span="20">
        <el-row
          type="flex"
          justify
          align="middle"
          class="flight-sale"
          v-for="(item,index) in data.seat_infos"
          :key="index"
        >
          <el-col :span="16" class="flight-sale-name">
            <span>{{item.group_name}}</span>
            |{{item.supplierName}}
          </el-col>
          <el-col :span="5" class="seat-price">￥{{item.par_price}}</el-col>
          <el-col :span="3" class="chooseBtn">
            <el-button type="warning" size="mini">选定</el-button>
            <p>剩余 : {{item.discount}}</p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

  </section>
</template>
<script>
export default {
  //使用props接收父组件传来的值
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      isShowSeatInfos: false
    };
  },
  computed: {
    //计算起飞到到达的中间时间差
    rankTime() {
      const depTimeArr = this.data.dep_time.split(":"); //["20","30"] ["20","20"]
      const arrTimeArr = this.data.arr_time.split(":"); //["22","50"] ["22","05"]
      // const depVal = depTimeArr[0] * 60 + Number(depTimeArr[1]); //20*60 + 20 = 1220分钟
      // const arrVal = arrTimeArr[0] * 60 + Number(arrTimeArr[1]); //22*60 + 5 = 1325分钟
     const depVal = depTimeArr[0] * 60 + +depTimeArr[1]
     const arrVal = arrTimeArr[0] * 60 + +arrTimeArr[1]
     //到达时间相减得到分钟
      let dis = arrVal - depVal

      //如果dis<0,则说明是第二天的凌晨00阶段,需加上24
      if(dis < 0) {
        dis = arrVal + 24 * 60 - depVal
      }

     return `${Math.floor(dis/60)}时${dis%60}分`
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  margin-bottom: 10px;
  border: 1px solid #ddd;
  .flight-info {
    text-align: center;
    padding: 15px;
    cursor: pointer;
    .flight-info-center {
      padding: 0 30px;
      strong {
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
      .flight-time {
        span {
          font-size: 14px;
          display: inline-block;
          padding: 10px 0;
          border-bottom: 1px solid red;
        }
      }
    }
    .flight-price {
      i {
        font-size: 24px;
        color: #f59f34;
      }
    }
  }

  //控制列表展开
  .flight-recommend {
    padding: 0 20px;
    background-color: #f6f6f6;
    border-top: 1px solid #ddd;
    .flight-sale {
      padding: 10px 0;
    }
    .flight-sale-name {
      font-size: 12px;
      > span {
        color: #00821a;
      }
    }
    .seat-price {
      font-size: 20px;
      color: #f59f34;
    }
    .chooseBtn {
      button {
        width: 100%;
        margin-bottom: 5px;
      }
      p {
        color: #666;
      }
    }
  }
}
</style>