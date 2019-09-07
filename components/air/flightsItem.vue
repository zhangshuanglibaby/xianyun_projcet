<template>
  <section class="container">
    <el-row type="flex" align="middle" class="flight-info">
      <el-col :span="6">{{data.airline_name+data.flight_no}}</el-col>
      <el-col :span="12">
        <el-row type="flex" justify="space-between" class="flight-info-center">
          <el-col :span="8">
            <strong>{{data.dep_time}}</strong>
            <br />
            <span>{{data.org_airport_name+data.org_airport_quay}}</span>
          </el-col>
          <el-col :span="8" class="flight-time">
            <span>2时20分</span>
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
  }
};
</script>
<style lang="less" scoped>
.container {
  .flight-info {
    text-align: center;
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 10px;
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
        color: orange;
      }
    }
  }
}
</style>