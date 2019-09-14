<template>
  <div class="hotel-comm">
    <h4 class="comm-title">0条真实用户评论</h4>
    <el-row type="flex" justify class="comm-content">
      <el-col :span="4">
        <p>总评数：42</p>
        <p>好评数：11</p>
        <p>差评数：0</p>
      </el-col>
      <el-col :span="5" class="comment-score">
        <div class="comm-start">
          <el-rate
            v-model="score"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
        </div>
        <div class="stamp">非常</div>
      </el-col>
      <el-col :span="3" class="progress">
        <el-progress type="circle" 
        :percentage="90" 
        color="#ff9300"
        :width="70"
         outerColor="#fff"
        :show-text="false"
        :stroke-width="2"></el-progress>
        <span class="text">
          <span>环境</span>
          <span>8.6</span>
        </span>
      </el-col>
      <el-col :span="3" class="progress">
        <el-progress type="circle" 
        :percentage="90" 
        color="#ff9300"
        :width="70"
         outerColor="#fff"
        :show-text="false"
        :stroke-width="2"></el-progress>
        <span class="text">
          <span>产品</span>
          <span>8.9</span>
        </span>
      </el-col>
      <el-col :span="3" class="progress">
        <el-progress type="circle" 
        :percentage="90" 
        color="#ff9300"
        :width="70"
         outerColor="#fff"
        :show-text="false"
        :stroke-width="2"></el-progress>
        <span class="text">
          <span>服务</span>
          <span>8.7</span>
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      score: 4.5
    };
  }
};
</script>

<style lang="less" scoped>
.hotel-comm {
  .comm-content {
    padding: 20px 0;
    .comment-score {
      position: relative;
      .stamp {
        position: absolute;
        top: -18px;
        left: 12px;
        width: 70px;
        height: 70px;
        border: 2px solid #fa3;
        text-align: center;
        line-height: 70px;
        border-radius: 50%;
        font-size: x-large;
        color: #fa3;
        opacity: 0.25;
        transform: rotate(-30deg);
      }
      /deep/.el-progress-circle {
        height: 74px;
      }
    }
    .progress {
      position: relative;
      /deep/.el-progress{
        /deep/ path {
          &:first-child {
            stroke : #fff;
          }
        }
      }
      .text {
        position: absolute;
        top: 18px;
        left: 20px;
        font-size: 16px;
        color: #ff9300;
        text-align: center;
        span {
          display: block;
        }
      }
    }
  }
}
</style>