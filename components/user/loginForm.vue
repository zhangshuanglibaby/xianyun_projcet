<template>
  <div class="loginForm">
    <el-form 
    ref="loginForm" 
    :model="loginForm" 
    class="form"
    :rules="rules">
      <el-form-item class="form_item" prop="username">
        <el-input v-model="loginForm.username" placeholder="用户名/手机"></el-input>
      </el-form-item>
      <el-form-item class="form_item" prop="password">
        <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <p><a href="#">忘记密码</a></p>
         <el-button type="primary" size="middle" class="button" @click="login">登录</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules : {
        username : [{required:true,message:'请输入用户名',trigger:'blur'}],
        password :[{required:true,message:'请输入密码',trigger:'blur'}]
      }
    }
  },
  methods : {
    login() {
      this.$refs.loginForm.validate(valid => {
        if(valid) {
          // this.$axios({
          //   url : '/accounts/login',
          //   method : 'post',
          //   data : this.loginForm
          // }).then(res => {
          //   console.log(res)
          // })
          this.$store.dispatch('user/login',this.loginForm).then(res => {
            console.log(res)
          })
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
.form {
  padding: 25px;
}
p {
  color: #00a0ff;
  font-size: 12px;
  text-align: right;
  a {
    &:hover {
      color: red;
    }
  }
}
.button {
  width: 100%;
  margin-top: 10px;
}
</style>