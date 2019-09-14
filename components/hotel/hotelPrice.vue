<template>
  <el-table :data="data" style="width: 100%" class="form" @row-click="handleJump">
    <el-table-column prop="name" label="价格来源" width="420"></el-table-column>
    <el-table-column prop="bestType" label="低价房型" width="420  "></el-table-column>
    <el-table-column prop="price" label="最低价格/每晚">
    <template slot-scope="scope">
      <span>￥{{scope.row.price}}</span>
      起
      <i class="el-icon-arrow-right"></i>
    </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props : {
    data : {
      type : Array,
      default : []
    }
  },
  data() {
    return {
    }
  },
  methods : {
    handleJump(obj) {
      window.open('https://hotels.ctrip.com/hotel/694679.html','_blank')
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  margin-bottom: 40px;
  /deep/.el-table__row {
    cursor: pointer;
  }
  /deep/.cell {
  span {
    color: #FF9900;
    font-size: 16.8px;
  }
}
}

</style>