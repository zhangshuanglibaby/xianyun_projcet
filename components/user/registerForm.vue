<template>
  <el-row type="flex" class="main">
    <el-form ref="form" :model="registerForm" class="form">
      <el-form-item>
        <el-input v-model="registerForm.username" placeholder="用户名手机"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="registerForm.captcha" placeholder="验证码">
          <template slot="append">
            <el-button>发送验证码</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="registerForm.nickname" placeholder="你的名字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="registerForm.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="registerForm.checkPassWord" placeholder="确认密码"></el-input>
      </el-form-item>
       <el-button type="primary" size="medium" class="registerBtn">注册</el-button>
    </el-form>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      registerForm: {
        username: "", //用户名
        nickname: "", //昵称
        captcha: "", //手机验证码
        password: "", //密码
        checkPassWord: "" //确认密码
      }
    };
  }
};
</script>
<style lang="less" scoped>
.form {
  width: 400px;
  padding: 25px;
  background: #fff;
  box-sizing: border-box;
}
.registerBtn {
  width: 100%;
}
</style>