<template>
  <div class="container">
      <el-row type="flex" class="main" justify="center">
        <div class="form_wrapper">
            <el-row type="flex" class="tabs">
              <span v-for="(item,index) in ['登录','注册']" 
              :key="index"
              @click="current=index"
              :class="{active : current===index}">
                {{item}}
              </span>
            </el-row>

            <!-- 引入登录组件 -->
            <loginForm  v-if="current === 0"/>

            <!-- 引入注册组件 -->
            <registerForm v-if="current === 1"/>

        </div>
      </el-row>
  </div>
</template>

<script>
import loginForm from '@/components/user/loginForm'
import registerForm from '@/components/user/registerForm'
export default {
  //引入组件
  components : {
    loginForm,
    registerForm
  },
  data() {
    return {
      current : 0
    }
  }
}
</script>

<style scoped lang="less">
.container {
  min-width: 1000px;
  height: 700px;
  background: url('http://157.122.54.189:9093/images/bar1.jpg') center 0;
  // background:url(http://157.122.54.189:9095/assets/images/th03.jfif);
}
.main {
  position: relative;
  width: 1000px;
  margin: 0 auto;
}
.form_wrapper {
  position: absolute;
  top: 0;
  margin-top: 10%;
  width: 400px;
  background-color: #fff;
  .tabs {
    .active {
      background-color: #fff;
      border-top: 2px solid #ffa712;
      color: #ffa712;
      font-weight: bold;
    }
    span {
      flex: 1;
      display: block;
      height: 50px;
      line-height: 50px;
      text-align: center;
      cursor: pointer;
      background-color: #eeeeee;
      color: #666666;
    }
  }
}


</style>