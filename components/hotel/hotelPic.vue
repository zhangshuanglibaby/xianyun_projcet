<template>
    <el-row type="flex" justify="" class="hotelPic">
          <el-row type="flex" justify="" class="photo-view">
              <el-col :span="16" class="main-pic">
                <a href="javascript:;">
                  <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt="漫耕假日酒店(原全季酒店高淳店)">
                </a>
              </el-col>
              <el-col :span="8" class="list-pic">
                  <el-row type="flex" justify="" class="list-item">
                      <el-col :span="12">
                        <a href="javascript:;">
                          <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt="漫耕假日酒店(原全季酒店高淳店)">
                        </a>
                      </el-col>
                      <el-col :span="12">
                        <a href="javascript:;">
                          <img src="http://157.122.54.189:9093/images/hotel-pics/2.jpeg" alt="漫耕假日酒店(原全季酒店高淳店)">
                        </a>
                      </el-col>
                      <el-col :span="12">
                        <a href="javascript:;">
                          <img src="http://157.122.54.189:9093/images/hotel-pics/3.jpeg" alt="漫耕假日酒店(原全季酒店高淳店)">
                        </a>
                      </el-col>
                      <el-col :span="12">
                        <a href="javascript:;">
                          <img src="http://157.122.54.189:9093/images/hotel-pics/4.jpeg" alt="漫耕假日酒店(原全季酒店高淳店)">
                        </a>
                      </el-col>
                      <el-col :span="12">
                        <a href="javascript:;">
                          <img src="http://157.122.54.189:9093/images/hotel-pics/5.jpeg" alt="漫耕假日酒店(原全季酒店高淳店)">
                        </a>
                      </el-col>
                      <el-col :span="12">
                        <a href="javascript:;">
                          <img src="http://157.122.54.189:9093/images/hotel-pics/6.jpeg" alt="漫耕假日酒店(原全季酒店高淳店)">
                        </a>
                      </el-col>
                  </el-row>
              </el-col>
          </el-row>
    </el-row>
</template>

<script>
export default {

};
</script>

<style lang="less" scoped>
.hotelPic {
  margin: 40px 0;
  .photo-view {
    .main-pic {
      img {
        width: 640px;
        height: 360px;
      }
    }
    .list-pic {
      .list-item {
        flex-wrap: wrap;
        margin: 0 -10px;
        .el-col {
          padding: 0 10px;
          img {
            width: 160px;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>