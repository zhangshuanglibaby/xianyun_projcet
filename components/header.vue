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
      <div class="login" v-if="!$store.state.user.userInfo.token">
        <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
      </div>
      <!-- 用户信息 -->
      <div class="userInfo" v-else>
        <el-dropdown>
          <!-- <span class="el-dropdown-link">
            <img src="" alt="">
            下拉菜单
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>-->
          <el-row type="flex" class="el-dropdown-link">
            <nuxt-link to="#">
              <img
                :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar"
                alt
              />
              {{$store.state.user.userInfo.user.nickname}}
            </nuxt-link>
          </el-row>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="handelLogOut">
             <nuxt-link to="#">退出</nuxt-link> 
              </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  methods : {
    handelLogOut() {
      //点击退出,清空用书数据
      this.$store.commit('user/clearUserInfo')
    }
  }
};
</script>

<style scoped lang='less'>
.container {
  height: 60px;
  line-height: 60px;
  box-shadow: 0px 2px 5px #eee;
}
.header {
  width: 1000px;
  height: 60px;
  margin: 0 auto;
  border-bottom: 1px solid #ddd;
}

.navs {
  flex: 1;
  margin-left: 20px;
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
      color: #fff;
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
.el-dropdown-link {
  img {
    width: 36px;
    border-radius: 50%;
    box-sizing: border-box;
    border: 2px solid #fff;
    vertical-align: middle;
  }
  &:hover {
    img {
      border: 2px solid #00a0ff;
    }
  }
}
</style>