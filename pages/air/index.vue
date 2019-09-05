<template>
  <section class="container">
    <!-- 标题 -->
    <h2 class="air-title">
      <span class="iconfont iconfeiji"></span>
      <i>国内机票</i>
    </h2>
    <!-- 搜索 + banner -->
    <el-row type="flex" justify="space-between">
      <!-- 搜索 -->
      <searchForm />
      <!-- banner -->
      <div class="sale-banner">
        <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt />
      </div>
    </el-row>
    <!-- 服务栏 -->
    <el-row type="flex" class="statement">
      <el-col :span="8" class="statement-item">
        <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#0fa0fe"></i>
        <span>100%航协认证</span>
      </el-col>
      <el-col :span="8" class="statement-item">
        <i class="iconfont iconbaozheng" style="color:green"></i>
        <span>出行认证</span>
      </el-col>
      <el-col :span="8" class="statement-item">
        <i class="iconfont icondianhua" style="color:#0fa0fe"></i>
        <span>7 x 24小时服务电话</span>
      </el-col>
    </el-row>
    <!-- 标题 -->
    <h1 class="air-sale-title">
      <span class="iconfont icontejiajipiao"></span>
      <i>特价机票</i>
    </h1>
    <div class="air-sale">
      <el-row type="flex" justify="space-between" class="air-sale-main">
        <el-col :span="6" v-for="(item,index) in airSaleList" 
        :key="index" 
        class="air-sale-list">
          <nuxt-link to="#">
            <img :src="item.cover" alt />
            <el-row type="flex" justify="space-around" class="air-sale-price">
              <span style="fontSize : 14px">{{item.departCity + '-' + item.destCity}}</span>
              <span style="fontSize :18px">{{'￥' + item.price}}</span>
            </el-row>
          </nuxt-link>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
//引入搜索组件
import searchForm from "@/components/air/searchForm";
export default {
  components: {
    searchForm
  },
  data() {
    return {
      current: 0,
      airSaleList: []
    };
  },
  mounted() {
    //获取推荐机票数据
    this.$axios({
      url: "/airs/sale"
    }).then(res => {
      console.log(res);
      if (res.status === 200) {
        this.airSaleList = res.data.data;
      }
    });
  }
};
</script>

<style lang='less' scoped>
.container {
  min-width: 1000px;
  width: 1000px;
  margin: 0 auto;
}
.air-title {
  .iconfeiji {
    font-size: 20px;
  }
  font-size: 20px;
  font-weight: normal;
  margin: 15px 0;
  color: orange;
}
.sale-banner {
  img {
    display: block;
  }
}
.statement {
  width: 1000px;
  padding: 10px 0;
  text-align: center;
  margin: 15px 0;
  background-color: #f5f5f5;
  border: 1px solid #dddddd;
  .statement-item {
    border-right: 1px solid #ddd;
    &:nth-child(3) {
      border-right: none;
    }
    .iconfont {
      vertical-align: middle;
      font-size: 30px;
    }
    span {
      line-height: 36px;
      font-size: 16px;
    }
  }
}
.air-sale-title {
  margin: 15px 0;
  font-size: 20px;
  font-weight: normal;
  color: #00a0ff;
  .icontejiajipiao {
    font-size: 20px;
  }
}
.air-sale {
  width: 1000px;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  margin-bottom: 50px;
  .air-sale-main {
    height: 140px;
    overflow: hidden;
    .air-sale-list {
      width: 225px;
      position: relative;
      img {
        width: 100%;
      }
      .air-sale-price {
        position: absolute;
        left: 0;
        top: 110px;
        width: 100%;
        height: 30px;
        line-height: 30px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
  }
}
</style>