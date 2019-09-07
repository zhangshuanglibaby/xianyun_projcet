<template>
    <section class="flights">
        <el-row type="flex" justify="space-between" >
          <div class="flights-content">
            <!-- 过滤条件 -->
            <div></div>

            <!-- 头部布局 -->
            <FlightsListHead />

            <!-- 航班信息 -->
            <div></div>
           
          </div>

          <!-- 右侧栏布局 -->
          <div class="aside"></div>
        </el-row>
    </section>
</template>
<script>
import FlightsListHead from '@/components/air/flightsListHead'
export default {
    components : {
      FlightsListHead
    }
}
</script>
<style lang="less" scoped>
.flights {
  // min-width: 1000px;
  width: 1000px;
  margin: 0 auto;
}
.flights-content {
  width: 745px;
}

</style>