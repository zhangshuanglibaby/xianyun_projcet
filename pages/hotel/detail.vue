<template>
  <div class="detail">
    <div class="container">
      <!-- 面包屑导航 -->
      <div class="breadCrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item 
          :to="{ path: '/hotel' }"
          v-for="(item,index) in breadNav"
          :key="index">{{item}}</el-breadcrumb-item>
          <!-- <el-breadcrumb-item>南京酒店</el-breadcrumb-item>
          <el-breadcrumb-item>{{hotelData.name}}</el-breadcrumb-item> -->
        </el-breadcrumb>
      </div>

      <!-- 酒店名称 -->
      <div class="name-info">
        <div class="hotel-name">
          {{hotelData.name}}
          <span>
            <i class="iconfont iconhuangguan"></i><i class="iconfont iconhuangguan"></i>
          </span>
        </div>
        <div class="hotel-spell">
          {{hotelData.alias}}
        </div>
        <div class="hotel-addres">
          <i class="iconfont iconlocation"></i>{{hotelData.address}}
        </div>
      </div>

      <!-- 酒店图片 -->
      <HotelPic />

      <!-- 酒店价格 -->
      <HotelPrice />

      <!-- 酒店地图 -->
      <HotelMap />

      <!-- 酒店设施 -->
      <HotelAsset />

      <!-- 酒店评论 -->
      <HotelComment />

    </div>
  </div>
</template>

<script>
import HotelPic from '@/components/hotel/hotelPic'
import HotelPrice from '@/components/hotel/hotelPrice'
import HotelMap from '@/components/hotel/hotelMap'
import HotelAsset from '@/components/hotel/hotelAsset'
import HotelComment from '@/components/hotel/hotelComment'
export default {
  components : {
    HotelPic,
    HotelPrice,
    HotelAsset,
    HotelComment,
    HotelMap
  },
  data() {
    return {
      hotelData : {},  //获取大数据
      breadNav : []  //存储面包屑数据
    }
  },
  mounted() {
    this.$axios({
      url : 'http://157.122.54.189:9095/hotels?id=4'
    }).then(res => {
      // console.log(res)
      this.hotelData = res.data.data[0]
      this.breadNav = this.hotelData.breadcrumb.split('>')
      // console.log(this.breadNav)
      console.log(this.hotelData)
    })
  }
};
</script>

<style lang="less" scoped>
.detail {
  .container {
    min-width: 1000px;
    width: 1000px;
    margin: 0 auto;
    .breadCrumb {
      padding: 20px 0;
    }
    .name-info {
      margin-bottom: 20px;
      .hotel-name {
        font-size: 24px;
        >span {
          i {
            color: #ff9300;
          }
        }
      }
      .hotel-spell {
        font-size: 14px;
        color: #666;
      }
      .hotel-addres {
        color: #666;
        font-size: 14px;
        >i {
          color: #0092f4;
        }
      }
    }
  }
}
</style>