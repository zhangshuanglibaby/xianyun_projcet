<template>
  <section class="container">
    <el-row class="flight-title">
      <el-col :span="5">航空信息</el-col>
      <el-col :span="14">
        <el-row type="flex" justify>
          <el-col :span="12">起飞时间</el-col>
          <el-col :span="12">到达时间</el-col>
        </el-row>
      </el-col>
      <el-col :span="5">价格</el-col>
    </el-row>
  </section>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.flight-title {
    text-align: center;
    font-size: 12px;
    height: 38px;
    border: 1px solid #ddd;
    padding: 0 15px;
    line-height: 38px;
    margin-bottom: 10px;
    background-color: #f6f6f6;
    color: #666;
}
</style>