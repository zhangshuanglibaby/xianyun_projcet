<template>
  <section class="filters">
    <el-row type="flex" justify align="middle" class="filters-top">
      <el-col :span="8">单程 : 广州 - 上海 / 2019-09-08</el-col>
      <el-col :span="4" class="filter-select">
        <el-select v-model="airport" placeholder="起飞机场" size="mini" @change="handleAirport">
          <el-option
            v-for="(item,index) in filtersData.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="filter-select">
        <el-select v-model="flightTimes" placeholder="起飞时间" size="mini" @change="handleFlightTimes"> 
          <el-option
            v-for="(item,index) in filtersData.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="filter-select">
        <el-select v-model="company" placeholder="航空公司" size="mini" @change="handleCompany">
          <el-option
            v-for="(item,index) in filtersData.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="filter-select">
        <el-select v-model="planeSize" placeholder="机型" size="mini" @change="handlePlaneSize">
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
       <el-button type="primary" plain round size="mini">撤销</el-button>

    </div>
  </section>
</template>
<script>
export default {
  //定义接收的变量参数
  props : {
    filtersData : {
      type : Object,
      default : {}
    }
  },
  data() {
    return {
      //定义机型大小
      planeSizeData : [
        {label : '大',value : 'L'},
        {label : '中',value : 'M'},
        {label : '小',value : 'S'}
      ],
      airport :'', //起飞机场
      flightTimes : '',//起飞时间
      company : '', //航空公司
      planeSize :''
    }
  },
  methods : {
    //选择起飞机场会触发
    handleAirport(val) {
      console.log(val)
    },
    //选择起飞时间会触发
    handleFlightTimes(val) {
      console.log(val)
    },
    //选择航空公司会触发
    handleCompany(val) {
      console.log(val)
    },
    //选择机型会触发
    handlePlaneSize(val) {
      console.log(val)
    }
  }
}
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