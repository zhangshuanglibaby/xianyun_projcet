<template>
  <div class="search-form">
    <!-- tab栏 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item,index) in tabList"
        :key="index"
        @click="handelClick(index)"
        :class="{active : current === index}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <!-- 表单 -->
    <el-form ref="searchForm" :model="searchForm" label-width="80px" class="search-form-content">
      <!-- 出发城市 -->
      <el-form-item label="出发城市" class="form-item">
        <el-autocomplete
          v-model="searchForm.departCity"
          :fetch-suggestions="querySearchDepartCity"
          placeholder="请搜索出发城市"
          @select="SelectDepartCity"
          :trigger-on-focus="false"
        ></el-autocomplete>
      </el-form-item>

      <!-- 到达城市 -->
      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="searchForm.destCity"
          :fetch-suggestions="querySearchDestCity"
          placeholder="请搜索到达城市"
          @select="SelectDestCity"
          :trigger-on-focus="false"
        ></el-autocomplete>
      </el-form-item>

      <!-- 出发时间 -->
      <el-form-item label="出发时间">
        <el-date-picker
          v-model="searchForm.departDate"
          type="date"
          :placeholder="nowTime"
          :default-value="nowTime"
          @change="handelDepartDate"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>

      <!-- 搜索按钮 -->
      <el-form-item>
        <el-button type="primary" 
        icon="el-icon-search" 
        style="width:220px"
        @click="handleSearch">搜索</el-button>
      </el-form-item>

      <!-- 交换 -->
      <div class="reverse">
        <span @click="handleChange">换</span>
      </div>
    </el-form>
  </div>
</template>
<script>
//引入moment插件
import moment from 'moment'
export default {
  data() {
    return {
      tabList: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      current: 0,
      //air/flights?departCity=广州&departCode=CAN&destCity=上海&destCode=SHA&departDate=2019-09-11
      searchForm: {
        departCity: "", //出发城市
        departCode: "", //出发城市编码
        destCity: "", //到达城市
        destCode: "", //到达城市编码
        departDate: "" //出发时间
      },
      nowTime : '',
      pickerOptions : {
        disabledDate(time) {
           return time.getTime() < Date.now();
        }
      }
    };
  },
  methods: {
    //tab栏切换
    handelClick(index) {
      this.current = index
      if(this.current === 1) {
        this.$alert('目前不支持往返,请使用单程选票!','提示',{
          confirmButtonText: '确定',
          type: 'warning',
        })
        this.current = 0
      }
    },
    //输入出发城市时触发
    querySearchDepartCity(query, cb) {
      //发送请求获得实时机票城市
      this.$axios({
        url : '/airs/city',
        params : {name : query}
      }).then(res => {
        // console.log(res)
        if(res.status === 200) {
          //把返回的数据放到选项上需要属性value
          const {data} = res.data
          data.forEach(e => {
            e.value = e.name.replace('市','')
            // this.searchForm.departCode = e.sort
          })
          //当没有点击选项的时候,默认设置出发城市的编码为第一个
          this.searchForm.departCode = data[0].sort
          cb(data)
        }
      })
    },
    //点击选中出发城市时触发
    SelectDepartCity(item) {
      // console.log(item);
      //点击的时候,需要赋值编码
      this.searchForm.departCode = item.sort
    },
    //输入到达城市时触发
    querySearchDestCity(query, cb) {
      this.$axios({
        url : '/airs/city',
        params : {name : query}
      }).then(res => {
        // console.log(res)
        if(res.status === 200) {
          const {data} = res.data
          data.forEach(e => {
            e.value = e.name.replace('市','')
            // this.searchForm.destCode = e.sort
          })
          //当没有点击选项的时候,默认设置到达城市的编码为第一个
          this.searchForm.destCode = data[0].sort
          cb(data)
        }
      })
    },
    //点击选中触发城市时触发
    SelectDestCity(item) {
      // console.log(item);
      this.searchForm.destCode = item.sort
    },
    //选择出发时间时触发
    handelDepartDate(time) {
      //格式化时间
     this.searchForm.departDate =  moment(time).format('YYYY-MM-DD')
    },
    //搜索时触发
    handleSearch() {
      const {departCity,destCity,departDate} = this.searchForm
      if(!departCity) {
         this.$alert('请选择出发城市','提示',{
          confirmButtonText: '确定',
          type: 'warning',
        })
        return
      }
      if(!destCity) {
        this.$alert('请选择到达城市','提示',{
          confirmButtonText: '确定',
          type: 'warning',
        })
        return
      }
      if(!departDate) {
        this.$alert('请选择出发时间','提示',{
          confirmButtonText: '确定',
          type: 'warning',
        })
        return
      }
      console.log(this.searchForm)
      //发送请求接口
      this.$axios({
        url : '/airs',
        params : this.searchForm
      }).then(res => {
        if(res.status === 200) {
          //跳转页面
          this.$router.push({path : '/air/flights',query : this.searchForm})
        }
      })
    },
    //点击换的时候,切换出发城市和到达城市
    handleChange() {
     const {departCity,destCity,departCode,destCode} = this.searchForm
     this.searchForm.departCity = destCity
     this.searchForm.destCity = departCity
     this.searchForm.departCode = destCode
     this.searchForm.destCode = departCode
    }
  },
  mounted() {
    //获取时间
   this.nowTime = moment(new Date()).format('YYYY-MM-DD')
  //  console.log(this.nowTime)
  }
};
</script>
<style lang="less" scoped>
.search-form {
  width: 360px;
  border :1px solid #ddd;
  border-top: none;
  .search-tab {
    span {
      display: block;
      width: 50%;
      line-height: 48px;
      text-align: center;
      background-color: #eeeeee;
      box-sizing: border-box;
      cursor: pointer;
    }
    .active {
      border-top: 2px solid orange;
      background-color: #fff;
    }
  }
  .search-form-content {
    position: relative;
    padding: 15px 50px 15px 15px;
    /deep/ .el-input {
      width: 220px;
    }
    .reverse {
      position: absolute;
      top: 56px;
      right: 10px;
      &:after,
      &:before {
        position: absolute;
        // display: block;
        content: "";
        height: 1px;
        width: 24px;
        left: -16px;
        background-color: #ccc;
      }
      &:after {
        top: 40px;
      }
      &:before {
        top: -20px;
      }
      span {
        position: relative;
        display: block;
        width: 20px;
        height: 20px;
        font-size: 12px;
        background-color: #00a0ff;
        color: #fff;
        text-align: center;
        line-height: 10px;
        line-height: 18px;
        border-radius: 2px 2px 2px 2px;
        cursor: pointer;
        &:after,
        &:before {
          // display: block;
          position: absolute;
          content: "";
          height: 20px;
          width: 1px;
          left: 7px;
          background-color: #ccc;
        }
        &:after {
          top: 20px;
        }
        &:before {
          top: -20px;
        }
      }
    }
  }
}
</style>