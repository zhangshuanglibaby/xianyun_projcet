<template>
  <div class="search-form">
    <!-- tab栏 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item,index) in tabList"
        :key="index"
        @click="current=index"
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
          :placeholder="searchForm.departDate"
          default-value="2010-10-01"
        ></el-date-picker>
      </el-form-item>
      <!-- 搜索按钮 -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" style="width:220px">搜索</el-button>
      </el-form-item>

      <!-- 交换 -->
      <div class="reverse">
        <span>换</span>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabList: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      current: 0,
      //air/flights?departCity=广州&departCode=CAN&destCity=上海&destCode=SHA&departDate=2019-09-11
      //搜索时不是发送请求给后台,需要携带以上的参数跳转到其他页面
      searchForm: {
        departCity: "", //出发城市
        departCode: "", //出发城市编码
        destCity: "", //到达城市
        destCode: "", //到达城市编码
        departDate: "" //出发时间
      }
    };
  },
  methods: {
    //输入出发城市时触发
    querySearchDepartCity(query, cd) {
      console.log(query);
    },
    //点击选中出发城市时触发
    SelectDepartCity(item) {
      console.log(item);
    },
    //输入到达城市时触发
    querySearchDestCity(query, cd) {},
    //点击选中触发城市时触发
    SelectDestCity(item) {
      console.log(item);
    }
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
        background-color: #999;
        color: #fff;
        text-align: center;
        line-height: 10px;
        line-height: 18px;
        border-radius: 2px 2px 2px 2px;
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