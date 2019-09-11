<template>
  <div class="aside">
    <div class="air-info">
        <el-row type="flex" justify="space-between" class="info-top">
          <div>{{data.dep_date}}</div>
          <div>{{data.org_city_name}} - {{data.dst_city_name}}</div>
        </el-row>
        <el-row type="flex" justify="space-between" align="middle" class="info-step">
          <el-col :span="5" class="flight-airport">
            <p>{{data.dep_time}}</p>
            <span>{{data.org_airport_name}}{{data.org_airport_quay}}</span>
          </el-col>
          <el-col :span="14" class="flight-time">
            <span>--- {{rankTime}} ---</span>
            <span>{{data.airline_name}}{{data.flight_no}}</span>
          </el-col>
          <el-col :span="5" class="flight-airport">
            <p>{{data.arr_time}}</p>
            <span>{{data.dst_airport_name}}{{data.dst_airport_quay}}</span>
          </el-col>
        </el-row>
    </div>
      <el-row type="flex" justify="space-between" class="info-bar">
        <span>订单总价</span>
        <span>金额</span>
        <span>数量</span>
      </el-row>
      <el-row type="flex" justify="space-between" class="info-bar">
        <span>成人机票</span>
        <span>￥{{data.seat_infos.org_settle_price}}</span>
        <span>x1</span>
      </el-row>
      <el-row type="flex" justify="space-between" class="info-bar">
        <span>机建＋燃油</span>
        <span>¥{{data.airport_tax_audlet}}/人/单程</span>
        <span>x1</span>
      </el-row>
      <el-row type="flex" justify="space-between" class="info-bar" align="middle">
        <span>应付总额：</span>
        <span class="price">￥{{$store.state.air.allPrice}}</span>
      </el-row>
  </div>
</template>
<script>
export default {
  props : {
    data : {
      type : Object,
      default : {
        seat_infos : {}
      }
    }
  },
  computed : {
    //计算时间差
    rankTime() {
      //数据还没有请求回来
      if(!this.data.dep_time) return ""
      const dep = this.data.dep_time.split(":")  //["20","30"] 1230
      const arr = this.data.arr_time.split(':') //["22","50"]  1370//[00,50]
      const depVal = dep[0] * 60 + +dep[1]
      const arrVal = arr[0] * 60 + +arr[1]

      const dis = arrVal - depVal 
      if(dis < 0) {
       dis = arrVal + 24 * 60 - depVal
      }
      return `${Math.floor(dis/60)}时${dis % 60}`
    }
  }
}
</script>
<style lang="less" scoped>
.aside {
  width: 350px;
  border : 1px solid #ddd;
  height: fit-content;
  .air-info {
    padding: 15px;
    border-bottom: 1px dashed #ddd;
    .info-top {
      margin-bottom: 10px;
      div {
        &:last-child {
          font-size: 14px;
        }
      }
    }
    .info-step {
      p {
        font-size: 22px;
      }
      span {
        font-size: 12px;
        color: #999;
      }
      .flight-time {
        text-align: center;
        span {
          &:nth-child(1) {
            display: block;
          }
        }
      }
    }
  }
  .info-bar {
    padding: 10px 15px;
    font-size: 14px;
    color: #666;
    border-bottom: 1px dashed #ddd;
    &:last-child {
      border-bottom: 0;
    }
    .price {
      font-size: 28px;
      color: #ffa000;
    }
  }
}
</style>