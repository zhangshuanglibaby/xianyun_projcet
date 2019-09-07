<template>
  <section class="flights">
    <el-row type="flex" justify="space-between">
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in flightsList" :key="index" :data="item" />

        <!--分页-->
        <el-row type="flex" justify="center">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="flightsData.total"
          ></el-pagination>
        </el-row>
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
      flightsData: {},
      pageIndex: 1,
      pageSize: 5,
      flightsList: []
    };
  },
  methods: {
    init() {
      const start = (this.pageIndex - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.flightsList = this.flightsData.flights.slice(start, end);
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.init()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.init()
    }
  },
  mounted() {
    // console.log(this.$route)
    //获取机票列表数据
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      console.log(res);
      if (res.status === 200) {
        this.flightsData = res.data
        this.init()
      }
    });
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