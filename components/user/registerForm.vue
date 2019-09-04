<template>
  <el-row type="flex" class="main">
    <el-form ref="registerForm" :model="registerForm" class="form" :rules="rules">
      <el-form-item prop="username">
        <el-input v-model="registerForm.username" placeholder="用户名手机"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input v-model="registerForm.captcha" placeholder="验证码">
          <template slot="append">
            <el-button @click="handelCaptcha">发送验证码</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input v-model="registerForm.nickname" placeholder="你的名字"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="registerForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="checkPassWord">
        <el-input v-model="registerForm.checkPassWord" type="password" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-button type="primary" size="medium" class="registerBtn">注册</el-button>
    </el-form>
  </el-row>
</template>
<script>
export default {
  data() {
    //密码验证
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPassWord !== "") {
          this.$refs.registerForm.validateField("checkPassWord");
        }
        callback();
      }
    };
    //确认密码验证
    var validatecheckPassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      //表单数据
      registerForm: {
        username: "", //用户名
        nickname: "", //昵称
        captcha: "", //手机验证码
        password: "", //密码
        checkPassWord: "" //确认密码
      },
      //表单规则
      rules: {
        username: [
          { required: true, message: "请输入用户名手机", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPassWord: [{ validator: validatecheckPassWord, trigger: "blur" }]
      }
    };
  },
  methods : {
    //发送验证码
    handelCaptcha() {
      //要检测验证码内容是否为空
      if(!this.registerForm.username) {
        this.$alert('手机号码不能为空格','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      }
      //实现手机验证码
      this.$axios({
        url : '/captchas',
        method : 'post',
        data : {tel : this.registerForm.username}
      }).then(res => {
        // console.log(res)
        if(res.status === 200) {
          this.$alert('模拟手机验证码为: ' + res.data.code,'提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
        }
      })
    }
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