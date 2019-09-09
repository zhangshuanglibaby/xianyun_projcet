<template>
  <div class="menus-wrapper">
    <div class="menus-body">
      <div class="menus">
        <div class="item-menus">
          <span>热门城市</span>
        </div>
        <div class="item-menus">
          <span>推荐城市</span>
        </div>
        <div class="item-menus">奔向海岛</div>
        <div class="item-menus">主题推荐</div>
      </div>
      <div class="sub-menus">
          <el-row type="flex" justify="" class="sub-item">
              <el-col :span="3">1</el-col>
              <el-col :span="3"><nuxt-link to="#">北京</nuxt-link></el-col>
              <el-col :span="18"><nuxt-link to="#">世界著名古都和现代化国际城市</nuxt-link></el-col>
          </el-row><el-row type="flex" justify="" class="sub-item">
              <el-col :span="3">2</el-col>
              <el-col :span="3"><nuxt-link to="#">广州</nuxt-link></el-col>
              <el-col :span="18"><nuxt-link to="#">粤港澳大湾区、泛珠江三角洲经济区</nuxt-link></el-col>
          </el-row><el-row type="flex" justify="" class="sub-item">
              <el-col :span="3">3</el-col>
              <el-col :span="3"><nuxt-link to="#">上海</nuxt-link></el-col>
              <el-col :span="18"><nuxt-link to="#">长江入海口，东隔东中国海</nuxt-link></el-col>
          </el-row><el-row type="flex" justify="" class="sub-item">
              <el-col :span="3">4</el-col>
              <el-col :span="3"><nuxt-link to="#">成都</nuxt-link></el-col>
              <el-col :span="18"><nuxt-link to="#">国家历史文化名城</nuxt-link></el-col>
          </el-row><el-row type="flex" justify="" class="sub-item">
              <el-col :span="3">5</el-col>
              <el-col :span="3"><nuxt-link to="#">西安</nuxt-link></el-col>
              <el-col :span="18"><nuxt-link to="#">中国国际形象最佳城市之一</nuxt-link></el-col>
          </el-row>
      </div>
    </div>
    <div class="aside-recommend">
      <div class="adide-title">
        <h4>推荐城市</h4>
      </div>
      <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt />
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.menus-wrapper {
  width: 260px;
  .menus-body {
    position: relative;
    border: 1px solid #ddd;
    border-bottom: 0;
    border-right: 0;
    font-size: 14px;
    margin-bottom: 20px;
    .menus {
      .item-menus {
        position: relative;
        line-height: 40px;
        padding: 0 20px;
        border-bottom: 1px solid #ddd;
        border-right: 1px solid #ddd;
        &::after {
          display: block;
          content: "";
          position: absolute;
          width: 10px;
          height: 10px;
          border-right: 1px solid #9e9e9e;
          border-top: 1px solid #9e9e9e;
          right: 20px;
          top: 15px;
          transform: rotate(45deg);
        }
      }
    }
    .sub-menus {
      position: absolute;
      top: -1px;
      left: 258px;
      width: 350px;
      border: 1px solid red;
      border-left: 0;
      .sub-item {
        line-height: 37px;
        &:nth-child(1){
          padding-top: 12px;
        }
        &:nth-child(5) {
          padding-bottom: 5px;
          border-left: 1px solid red;
        }
        .el-col {
          &:nth-child(1) {
            font-style: italic;
            font-size: 24px;
            color: orange;
            padding-left: 20px;
          }
          &:nth-child(2) {
            color: orange;
            &:hover {
              text-decoration: underline;
            }
          }
          &:nth-child(3) {
            color: #999;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
  .aside-recommend {
    .adide-title {
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #ddd;
      h4 {
        font-weight: normal;
      }
    }
    img {
      width: 100%;
    }
  }
}
</style>