<template>
  <section class="filters">
    <el-row type="flex" justify align="middle" class="filters-top">
      <el-col :span="8">单程 :广州 - 上海 / 2019-9-9</el-col>
      <el-col :span="4" class="filter-select">
        <el-select v-model="filtersForm.airport" placeholder="起飞机场" size="mini" @change="handleAirport">
          <el-option
            v-for="(item,index) in flightsData.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="filter-select">
        <el-select v-model="filtersForm.flightTimes" placeholder="起飞时间" size="mini" @change="handleFlightTimes">
          <el-option
            v-for="(item,index) in flightsData.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="filter-select">
        <el-select
          v-model="filtersForm.company"
          placeholder="航空公司"
          size="mini"
          @change="handleCompany"
        >
          <el-option
            v-for="(item,index) in flightsData.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="filter-select">
        <el-select
          v-model="filtersForm.plane_size"
          placeholder="机型"
          size="mini"
          @change="handlePlaneSize"
        >
          <el-option
            v-for="(item,index) in planeSizeData"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filters-cancel">
      <span>筛选 :</span>
      <el-button type="primary" plain round size="mini" @click="handleCancel">撤销</el-button>
    </div>
  </section>
</template>
<script>
export default {
  //定义接收的变量参数
  props : {
    flightsData : {
      type : Object,
      default : {}
    }
  },
  data() {
    return {
      //定义机型参数
      planeSizeData:[
        {label : '大',value : 'L'},
        {label : '中',value : 'M'},
        {label : '小',value : 'S'}
      ],
      //定义选项绑定的数据
      filtersForm : {
        airport : '',
        flightTimes : '',
        company : '',
        plane_size : ''
      }
    };
  },
  methods : {
    //选择起飞机场时触发
    handleAirport(val) {
      // console.log(val)
      //需要筛选数据
      const arr = this.flightsData.flights.filter(e => {
        return e.org_airport_name === val
      })
      //把值传递给父组件
      this.$emit('setFlightsList',arr)
    },
    //选择起飞时间会触发
    handleFlightTimes(val) {
      // console.log(val)
      const start = val.split(',')
      const arr = this.flightsData.flights.filter(e => {
        return +e.dep_time.split(':')[0] >= +start[0] && +e.dep_time.split(':')[0] < +start[1]
      })
      this.$emit('setFlightsList',arr)
    },
    //选择航空公司会触发
    handleCompany(val) {
      // console.log(val)
      const arr = this.flightsData.flights.filter(e => {
        return e.airline_name === val
      })
      //把值传递给组件
      this.$emit('setFlightsList',arr)
    },
    //选择机型会触发
    handlePlaneSize(val) {
      // console.log(val)
     const arr = this.flightsData.flights.filter(e => {
        return e.plane_size === val
      })
      this.$emit('setFlightsList',arr)
    },
    //点击撤销会触发
    handleCancel() {
      //把filtersForm的数初始化 ---利用对象遍历
      for(let key in this.filtersForm) {
        this.filtersForm[key] = ''
      }
      //传递原始数据回去
      this.$emit('setFlightsList',this.flightsData.flights)
      
    }
  }
};
</script>
<style lang="less" scoped>
.filters {
  margin-bottom: 20px;
  .filters-top {
    .filter-select {
      padding-left: 10px;
    }
  }
  .filters-cancel {
    margin-top: 10px;
  }
}
</style>