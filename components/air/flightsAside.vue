<template>
    <div class="aside">
      <div class="statement">
          <el-row type="flex" class="statement-list">
              <el-col :span="8">
                <span class="iconfont iconweibiaoti-_huabanfuben" style="color:#00a0ff"></span>
                <p>航协认证</p>
              </el-col>
              <el-col :span="8">
                <span class="iconfont iconbaozheng" style="color:green"></span>
                <p>出行保证</p>
              </el-col>
              <el-col :span="8">
                <span class="iconfont icondianhua" style="color:#00a0ff"></span>
                <p>7 x 24</p>
              </el-col>
          </el-row>
          <p class="server-tel">免费客服电话：4006345678转2</p>
      </div>
      <div class="history">
        <h3>历史查询</h3>
        <nuxt-link :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`"
          v-for="(item,index) in $store.state.history.airs"
           :key="index">
          <el-row type="flex"
           justify="space-between" 
           class="history-item" 
           align="middle">
              <div class="air-info">
                <div class="to-from">{{item.departCity}} - {{item.destCity}}</div>
                <p>{{item.departDate}}</p>
              </div>   
              <span class="chooseBtn">选择</span>
          </el-row>
        </nuxt-link>
      </div>
    </div>
</template>
<script>
export default {
    data() {
      return {
        //定义变量存储本地获取的数据
        historyItem : []
      }
    },
    mounted() {
      this.historyItem = JSON.parse(localStorage.getItem('historyQuery'))
    }
}
</script>
<style lang="less" scoped>
.aside {
  width: 238px;
  .statement {
    border :1px solid #ddd;
    .statement-list {
      padding: 10px 0;
      font-size: 12px;
      text-align: center;
      .iconfont {
        font-size: 40px;
      }
      p {
        margin-top: 5px;
      }
    }
    .server-tel {
      font-size: 14px;
      padding: 0 10px;
      line-height: 32px;
      text-align: center;
      background-color: #f6f6f6;
    }
  }
  .history {
    padding: 10px;
    margin-top: 10px;
    border : 1px solid #ddd;
    h3 {
      font-size: 16px;
      font-weight: normal;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
    }
    .history-item {
      padding: 10px 0;
      .air-info {
        .to-from {
          font-size: 14px;
          margin-bottom: 5px;
        }
        >p{
          font-size: 12px;
          color: #666;
        }
      }
      .chooseBtn {
        display: block;
        width: 44px;
        height: 20px;
        background-color: #f59f34;
        color: #fff;
        line-height: 20px;
        text-align: center;
        font-size: 12px;
        border-radius: 4px 4px 4px 4px;
      }
    }
  }
}
</style>