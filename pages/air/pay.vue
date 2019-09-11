<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥{{$store.state.air.allPrice}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" class="pay-qrcode" align="middle">
          <div class="qrcode">
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  mounted() {
    setTimeout(() => {
      // console.log(this.$route)
      const { id } = this.$route.query;
      //获取订单详情
      this.$axios({
        url: `/airorders/${id}`,
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        console.log(res);
        if (res.status === 200) {
          //获取元素
          const canvas = document.getElementById("qrcode-stage");

          const { code_url } = res.data.payInfo;

          QRCode.toCanvas(canvas, code_url, {
            width :200        
          });
        }
      });
    }, 100);
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 30px;
  background-color: #f5f5f5;
  .main {
    width: 1000px;
    margin: 0 auto;
    .pay-title {
      text-align: right;
      .pay-price {
        font-size: 28px;
        color: #ff4500;
      }
    }
    .pay-main {
      margin-top: 10px;
      padding: 30px;
      border-top: 5px solid orange;
      background-color: #fff;
      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }
      .pay-qrcode {
        padding: 0 80px;
        .qrcode {
          padding: 15px;
          height: fit-content;
          border: 1px solid #ddd;
          canvas {
            width: 200px;
            height: 200px;
            margin-bottom: 10px;
          }
          p {
            text-align: center;
            line-height: 32px;
          }
        }
      }
    }
  }
}
</style>