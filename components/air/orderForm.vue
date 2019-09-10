<template>
  <div class="main">
    <!-- 乘机人 -->
    <div class="air-column">
      <h2>乘机人</h2>
      <div class="menber">
        <el-form ref="form">
          <div class="menber-item" v-for="(item,index) in orderForm.users" :key="index">
            <el-form-item label="乘机人类型">
              <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
                <el-select
                  v-model="peopleSelect"
                  slot="prepend"
                  placeholder="请选择"
                  style="width:130px"
                >
                  <el-option label="成人" value="1"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item label="证件类型">
              <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
                <el-select
                  v-model="identSelect"
                  slot="prepend"
                  placeholder="请选择"
                  style="width:130px"
                >
                  <el-option label="身份证" value="1"></el-option>
                  <el-option label="护照" value="2"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <span class="delete-user" @click="handleDelete(index)">-</span>
          </div>
        </el-form>
        <el-button type="primary" class="add-member" @click="handleAdd">添加乘机人</el-button>
      </div>
    </div>

    <!-- 保险 -->
    <div class="air-column">
      <h2>保险</h2>
      <div class="insuranceInfo">
        <div class="insurance-item" 
        v-for="(item,index) in orderData.insurances"
        :key="index">
          <el-checkbox 
          :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}万`" 
          border 
          size="medium" 
          @change="handleChecked(item.id)"></el-checkbox>
        </div>
      </div>
    </div>

    <!-- 联系人 -->
    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form ref="form" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="orderForm.contactName"></el-input>
          </el-form-item>
          <el-form-item label="手机">
            <el-input v-model="orderForm.contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptchas">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="orderForm.captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <span>{{allPrice}}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      peopleSelect: "成人",
      identSelect: "",
      orderData : {
        seat_infos : {}
      },
      orderForm: {
        users: [{ username: "", id: "" }], //用户列表  用户名,身份证
        insurances: [], //保险id
        contactName: "", //联系人名字
        contactPhone: "", //联系人电话
        captcha : '', //验证码
        invoice: false, //是否需要发票,默认false
        seat_xid: this.$route.query.seat_xid, //座位id
        air: this.$route.query.id //航班id
      }
    };
  },
  computed : {
    allPrice() {
      const {airport_tax_audlet,seat_infos} = this.orderData
      const {users,insurances} = this.orderForm
      let price = 0 
      //计算机油费
      price += airport_tax_audlet 
      //计算保险费
      price += 30 * insurances.length 
      //计算单个机票费
      price += seat_infos.org_settle_price

      price *= users.length

      this.$store.commit('air/setAllPrice',price)
      
      return price
    }
  },
  methods : {
    //添加乘机人
    handleAdd() {
      this.orderForm.users.push({ username: "", id: "" })
    },

    //删除乘机人
    handleDelete(index) {
      // console.log(index)
      this.orderForm.users.splice(index,1)
    },

    //选择保险时触发
    handleChecked(id) {
      //需要检测是否有已存在的id
      const {insurances} = this.orderForm
      let index = insurances.indexOf(id)
      if(index > -1) {
        insurances.splice(index,1)
      }else {
        insurances.push(id)
      }
      // console.log(insurances)
    },

    //发送验证码
    handleSendCaptchas() {
      this.$axios({
        url : '/captchas',
        method : 'post',
        data : {tel : this.orderForm.contactPhone}
      }).then(res => {
        // console.log(res)
        if(res.status === 200) {
          this.$alert(`模拟手机验证码为: ${res.data.code}`,'提示',{
            confirmButtonText: '确定',
            type: 'warning'
          })
        }
      })
    },

    //提交订单
    handleSubmit() {
      //进行表单的验证
      if(!this.orderForm.users[0].username || !this.orderForm.users[0].id) {
        this.$message.error('乘机人的姓名或证件号码不能为空')
        return
      }
      if(!this.orderForm.contactName) {
        this.$message.error('请填写联系人')
        return 
      }
      if(!this.orderForm.contactPhone) {
        this.$message.error('请填写手机号码')
        return 
      }
      if(!this.orderForm.captcha) {
        this.$message.error('请填写验证码')
        return 
      }
      // console.log(this.orderForm)
      this.$axios({
        url : '/airorders',
        method : 'post',
        headers : {Authorization : `Bearer ${this.$store.state.user.userInfo.token}`},
        data : this.orderForm
      }).then(res => {
        // console.log(res)
        if(res.status === 200) {
          //订单id
          const {id} = res.data.data
          //跳转页面
          this.$message.success('正在生成订单,即将跳转页面')
          setTimeout(() => {
            this.$router.push({path:'/air/pay',query:{id}})
          },1000)
        }   
      })
    }
  },
  mounted() {
    //选择机票后获取信息
    // console.log(this.$route);
    const { id, seat_xid } = this.$route.query;
    this.$axios({
      url: `/airs/${id}`,
      params: {seat_xid}
    }).then(res => {
      // console.log(res);
      if(res.status === 200) {
        this.orderData = res.data
        this.$store.commit('air/setOrderInfo',res.data)
      }
    });
  }
};
</script>
<style lang="less" scoped>
.main {
  width: 590px;
  margin: 20px 0;
  .air-column {
    padding-bottom: 20px;
    margin-bottom: 20px;
    h2 {
      font-size: 22px;
      font-weight: normal;
      margin-bottom: 20px;
    }
    .menber {
      .menber-item {
        &:nth-child(1) {
          > .delete-user {
            display: none;
          }
        }
        position: relative;
        /deep/ .el-form-item {
          margin: 0;
        }
        /deep/ .el-input--suffix {
          /deep/ .el-input__inner {
            background-color: #fff;
            border: 1px solid #dbdfe6;
            border-right: 0;
          }
        }
        .delete-user {
          position: absolute;
          top: 55%;
          right: -30px;
          width: 16px;
          height: 16px;
          background: #ddd;
          border-radius: 50%;
          line-height: 16px;
          text-align: center;
          color: #fff;
          cursor: pointer;
        }
      }
      .add-member {
        margin-top: 40px;
      }
    }

    .insuranceInfo {
      margin-bottom: 20px;
      .insurance-item {
        margin-bottom: 20px;
      }
    }
    .contact {
      /deep/ .el-input {
        width: 265px;
      }
      .submit {
        width: 250px;
        margin: 50px auto;
        display: block;
        height: 50px;
      }
    }
  }
}
</style>