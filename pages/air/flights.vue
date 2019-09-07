<template>
  <section class="flights">
    <el-row type="flex" justify="space-between">
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem 
        v-for="(item,index) in flightsList"
        :key="index"
        :data="item"/>
      </div>

      <!-- 右侧栏布局 -->
      <div class="aside"></div>
    </el-row>
  </section>
</template>
<script>
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
export default {
  //注册组件
  components: {
    FlightsListHead,
    FlightsItem
  },
  data() {
    return {
      flightsList : []
    }
  },
  mounted() {
    // console.log(this.$route)
    //获取机票列表数据
    this.$axios({
      url : '/airs',
      params : this.$route.query
    }).then(res => {
      console.log(res)
      if(res.status === 200) {
        this.flightsList = res.data.flights
      }
    })
    
  }
};
</script>
<style lang="less" scoped>
.flights {
  // min-width: 1000px;
  width: 1000px;
  margin: 0 auto;
}
.flights-content {
  width: 745px;
  font-size: 14px;
}
</style>