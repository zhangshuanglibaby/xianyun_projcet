<template>
  <div class="container">
    <!-- 轮播图 -->
    <div class="carousel">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="(item,index) in banners" :key="index">
          <div class="banner_img" :style="`background:url(${$axios.defaults.baseURL +item.url}) center no-repeat;
          background-size:contain contain`">
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: []
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
  position: relative;
  /deep/ .el-carousel__container {
    height: 700px;
  }
  .banner_img {
    width: 100%;
    height: 100%;
  }
}
</style>