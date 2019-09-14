<template>
  <el-table :data="hotelData" style="width: 100%" class="form">
    <el-table-column prop="source" label="价格来源" width="420"></el-table-column>
    <el-table-column prop="size" label="低价房型" width="420  "></el-table-column>
    <el-table-column prop="price" label="最低价格/每晚">
    <template slot-scope="scope">
      <span>{{scope.row.price}}</span>
      起
      <i class="el-icon-arrow-right"></i>
    </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      hotelData : [
        {source : '携程',size : '高级大床房A',price : '￥542'},
        {source : '艺龙',size : '高级大床房A',price : '￥594'},
        {source : 'Hotels.com',size : '高级大床房A',price : '￥542'},
      ]
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  margin-bottom: 40px;
  /deep/.cell {
  span {
    color: #FF9900;
    font-size: 16.8px;
  }
}
}

</style>