<template>
  <div class="detail">
    <div class="container">
      <!-- 面包屑导航 -->
      <div class="breadCrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">酒店</el-breadcrumb-item>
          <el-breadcrumb-item>南京酒店</el-breadcrumb-item>
          <el-breadcrumb-item>漫耕假日酒店(原全季酒店高淳店)</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 酒店名称 -->
      <div class="name-info">
        <div class="hotel-name">
          漫耕假日酒店(原全季酒店高淳店)
          <span>
            <i class="iconfont iconhuangguan"></i><i class="iconfont iconhuangguan"></i>
          </span>
        </div>
        <div class="hotel-spell">
          man geng jia ri hotel (yuan quan ji jiu dian gao chun dian)
        </div>
        <div class="hotel-addres">
          <i class="iconfont iconlocation"></i>宝塔路358号
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