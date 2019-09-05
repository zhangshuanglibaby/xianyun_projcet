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
      <el-button type="primary" size="medium" class="registerBtn" @click="handelRegister">注册</el-button>
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
      },
      //用一个变量保存验证码
      code :''
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
      //要检验手机格式长度是否正确
      if(this.registerForm.username.length!== 11) {
        this.$alert('手机号码格式不正确','提示' ,{
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
          // const {code} = res.data
          this.code = res.data.code
          this.$alert('模拟手机验证码为: ' + res.data.code,'提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
        }
      })
    },
    //注册
    handelRegister() {
      //要进行表单的二次验证
      this.$refs.registerForm.validate(valid => {
        if(valid) {
          //使用解构的方法可以拿到想要的数据
          let {checkPassWord,...params} = this.registerForm
          this.$axios({
            url : '/accounts/register',
            method : 'post',
            data : params
          }).then(res => {
            // console.log(res)
            if(res.status === 200) {
              //注册成功后,会自动登录,要使用状态管理
              this.$store.commit('user/setUserInfo',res.data)
              this.$message.success('注册成功')
            }else {
              this.$message.error('注册失败')
            }
          }).catch(() => {
            // if(this.code !== this.registerForm.captcha) {
            //   this.$message.warning('手机验证码错误')
            // }
            //错误拦截器会处理
          })
        }else {
          this.$message.error('请把必填的信息完善')
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