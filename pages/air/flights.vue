<template>
  <section class="flights">
    <el-row type="flex" justify="space-between">
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :filtersData="newFlightsData" @setFListtByFilters="setFListtByFilters" />

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
            :total="total"
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
import FlightsFilters from '@/components/air/flightsFilters'
import FlightsAside from '@/components/air/flightsAside'
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
      //存储大数据
      flightsData: {
        options : {} ,
        info : {}  //由于代码是从上往下的执行的,在上面给子组件传值的时候,也许大数据还没有获取到值,此时的options会是undefined,会报错
      },  
      //需要用多一个变量来存储大数据,航班列表渲染就用这个变量渲染
      newFlightsData : {
        options :{},
        info : {}
      },
      pageIndex: 1,
      pageSize: 5,
      total : 0,
      flightsList: [], //航班信息数据
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
        this.total = res.data.total
        this.flightsData = res.data
        this.newFlightsData = {...this.flightsData}
        this.init()
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
      this.init()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.init()
    },
    //子组件传值会触发
    setFListtByFilters(arr) {
      this.flightsData.flights = arr
      this.total = arr.length
      this.pageIndex = 1
      this.init()
    }
  },
  watch : {
    '$route'() {
      // console.log(this.$route)
      this.getData()
    }
  },
  mounted() {
    // console.log(this.$route)
    //获取机票列表数据
    this.getData()
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
</style>