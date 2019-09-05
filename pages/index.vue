<template>
  <div class="container">
    <!-- 轮播图 -->
    <div class="carousel">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="(item,index) in banners" :key="index">
          <div
            class="banner_img"
            :style="`background:url(${$axios.defaults.baseURL +item.url}) center center no-repeat;
          background-size:contain contain`"
          ></div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 搜索框 -->
    <div class="banner_content">
      <div class="search_bar">
        <!-- tab栏 -->
        <el-row class="search_tab">
          <span 
          v-for="(item,index) in options" 
          :key="index"
          @click="current=index"
          :class="{active:current===index}">
            <i>{{item.name}}</i>
          </span>
          <!-- <span><i>酒店</i></span>
          <span><i>机票</i></span>-->
        </el-row>
        <!-- 搜索框 -->
        <el-row type="flex" class="search_input" align="middle">
          <input type="text" :placeholder="options[current].placeholder" />
          <i class="el-icon-search"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: [],
      options: [
        {
          name: "攻略",
          placeholder: "搜索城市"
        },
        {
          name: "酒店",
          placeholder: "请输入城市搜索酒店"
        },
        {
          name: "机票",
          placeholder: "#"
        }
      ],
      current : 0
    };
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      // console.log(res);
      if (res.status === 200) {
        this.banners = res.data.data;
      }
    });
    // console.dir(this.$axios);
  }
};
</script>

<style scoped lang='less'>
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;
  /deep/ .el-carousel__container {
    height: 700px;
  }
  .banner_img {
    width: 100%;
    height: 100%;
  }
  .banner_content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 0;
    top: 0;
    margin-top: 15%;
    margin-left: 15%;
    .search_bar {
      width: 552px;
      margin: 0 auto;
      .search_tab {
        .active {
          i {
            color: #333;
          }
          &::after {
            background-color: #eee;
          }
        }
        span {
          position: relative;
          display: inline-block;
          width: 82px;
          height: 36px;
          cursor: pointer;
          margin-right: 8px;
          &::after {
            position: absolute;
            left: 0;
            top : 0;
            display: block;
            content: "";
            width: 100%;
            height: 100%;
            transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
            transform-origin: bottom left;
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-bottom : none;
            border-radius: 1px 2px 0 0;
            box-sizing: border-box;
          }
          i {
            position: relative;
            z-index: 2;
            display: block;
            width: 100%;
            height: 100%;
            line-height: 30px;
            text-align: center;
            color: #fff;
          }
        }
      }
    }
    .search_input {
      width: 550px;
      height: 47px;
      background-color: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-sizing: unset;
      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        border : none;
        outline: none;
        font-size: 16px;
      }
      .el-icon-search {
        padding: 0 10px;
        font-size: 22px;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
}
</style>