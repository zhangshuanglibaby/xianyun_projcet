<template>
    <el-row type="flex" justify="" class="hotelPic">
          <el-row type="flex" justify="" class="photo-view">
              <el-col :span="16" class="main-pic">
                  <img :src="`http://157.122.54.189:9093/images/hotel-pics/${bigPic}.jpeg`" alt="漫耕假日酒店(原全季酒店高淳店)">
              </el-col>
              <el-col :span="8" class="list-pic">
                  <el-row type="flex" justify="" class="list-item">
                      <el-col :span="12" v-for="(item,index) in picData" :key="index">
                        <a href="javascript:;">
                          <img :src="`http://157.122.54.189:9093/images/hotel-pics/${item}.jpeg`" 
                          alt="漫耕假日酒店(原全季酒店高淳店)" 
                          @click="handleClick(item)">
                        </a>
                      </el-col>
                  </el-row>
              </el-col>
          </el-row>
    </el-row>
</template>

<script>
export default {
  data() {
    return {
      bigPic : '1',
      picData : [1,2,3,4,5,6]
    }
  },
  methods : {
    handleClick(item) {
      // console.log(item)
      this.bigPic = item
    }
  }
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