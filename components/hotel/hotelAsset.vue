<template>
<div class="hotel-asset">
    <el-row type="flex" justify="" class="asset-item">
        <el-col :span="4">基本信息</el-col>
        <el-col :span="20" class="item-info">
            <el-row type="flex" justify="" class="base-info">
                <el-col :span="24">
                  入住时间: 14:00之后
                </el-col>
                <el-col :span="24">
                  离店时间: 12:00之前
                </el-col>
                <el-col :span="24">
                  2014年开业 / 2014年装修
                </el-col>
                <el-col :span="24">
                  酒店规模: 134间客房
                </el-col>
            </el-row>
        </el-col>
    </el-row>
    <el-row type="flex" justify="" class="asset-item">
        <el-col :span="4">主要设施</el-col>
        <el-col :span="20" class="item-info">
          <span class="facility">外币兑换服务</span>
          <span class="facility">吹风机</span>
          <span class="facility">热水壶</span>
          <span class="facility">wifi</span>
          <span class="facility">电梯</span>
        </el-col>
    </el-row>
    <el-row type="flex" justify="" class="asset-item">
        <el-col :span="4">停车服务</el-col>
        <el-col :span="20" class="item-info">
        -
        </el-col>
    </el-row>
    <el-row type="flex" justify="" class="asset-item">
        <el-col :span="4">品牌信息</el-col>
        <el-col :span="20" class="item-info" style="color:#000">
          假日
        </el-col>
    </el-row>
</div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.hotel-asset {
  margin-bottom: 40px;
  .asset-item {
    line-height: 60px;
    font-size: 14px;
    border-bottom: 1px solid #eee;
    .item-info {
      color: #666;
      .facility {
        padding: 4px 10px;
        background-color: #eee;
        border-radius: 4px;
        margin-right: 6px;
      }
    }
  }
}
</style>