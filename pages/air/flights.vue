<template>
  <section class="flights">
    <el-row type="flex" justify="space-between">
      <div class="flights-content">
        <!-- 过滤条件 -->
        <!-- 需要传的是缓存的大数据,否则原数据会覆盖 -->
        <FlightsFilters :flightsData="cachFlightsData" @setFlightsList="setFlightsList" />

        <!-- 头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in flightsList" :key="index" :data="item" />
        <div class="empty_prompt" v-show="flightsData.flights.length === 0">
          暂无航班信息！！！
        </div>
        <!--分页-->
        <el-row type="flex" justify="center" v-show="flightsData.flights.length > 0">
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
      <FlightsAside />
    </el-row>
  </section>
</template>
<script>
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
import FlightsFilters from "@/components/air/flightsFilters";
import FlightsAside from "@/components/air/flightsAside";
export default {
  //注册组件
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  data() {
    return {
      //存储大数据,初始化
      flightsData: {
        flights: {},
        options: {},
        info: {} //由于代码是从上往下的执行的,在上面给子组件传值的时候,也许大数据还没有获取到值,此时的options会是undefined,会报错
      },
      //需要用多一个变量来存储大数据,航班列表渲染就用这个变量渲染
      cachFlightsData: {
        flights: {},
        options: {},
        info: {}
      },
      pageIndex: 1,
      pageSize: 5,
      flightsList: [] //航班信息数据
    };
  },
  methods: {
    //封装获取机票列表数据
    getData() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.flightsData = res.data;
          this.cachFlightsData = { ...this.flightsData };
          this.init();
        }
      });
    },
    init() {
      const start = (this.pageIndex - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.flightsList = this.flightsData.flights.slice(start, end);
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.init();
    },
    //子组件传值时触发
    setFlightsList(arr) {
      // console.log(arr)
      //每次触发都初始化回第一页
      this.pageIndex = 1
      this.flightsData.flights = arr
      this.flightsData.total = arr.length
      this.init()
    }
  },
  watch : {
    //监听路由变化
    '$route'() {
      // console.log(this.$route)
      //重新请求数据
      this.getData()
    }
  },
  mounted() {
    // console.log(this.$route)
    //获取机票列表数据
    this.getData();
  }
};
</script>
<style lang="less" scoped>
.flights {
  // min-width: 1000px;
  width: 1000px;
  margin: 20px auto;
}
.flights-content {
  width: 745px;
  font-size: 14px;
}
.empty_prompt {
  text-align: center;
  color: #999;
}
</style>