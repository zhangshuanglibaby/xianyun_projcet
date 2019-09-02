<template>
  <div class="container">
    <el-row type="flex" class="header" justify="space-between">
      <!-- logo -->
      <div class="logo">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
      </div>
      <!-- 导航 -->
      <el-row type="flex" class="navs">
        <!-- nuxt-link的作用和使用方法和router-link是一样的 -->
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 登录 -->
      <div class="login">
        <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang='less'>
.container {
  height: 60px;
  line-height: 60px;
  box-shadow: 0px 2px 5px #eee;
}
.header {
  width: 1000px;
  margin: 0 auto;
}

.navs {
  flex: 1;
  margin-left: 45px;
  a {
    display: block;
    padding: 0 20px;
    height: 60px;
    box-sizing: border-box;
    &:hover {
      color: #00a0ff;
      border-bottom: 5px solid #00a0ff;
    }
  }
  .nuxt-link-exact-active {
    background-color: #00a0ff;
    color: #fff !important;
    &:hover {
      color: #fff
    }
  }
}

.logo {
  padding-top: 8px;
  img {
    width: 156px;
    height: 43px;
    display: block;
  }
}


</style>