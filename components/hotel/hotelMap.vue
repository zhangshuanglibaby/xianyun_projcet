<template>
  <div class="hote-map">
    <el-row type="flex" justify class="map-view">
      <div id="container"></div>
      <div class="view-list">
        <el-tabs :tab-position="tabPosition" style="height: 200px;">
          <el-tab-pane label="风景">
            <ol class="list">
              <li class="list-item">
                <span>高淳老街</span>
                <span>1.03公里</span>
              </li>
              <li class="list-item">
                <span>高淳老街</span>
                <span>1.03公里</span>
              </li>
              <li class="list-item">
                <span>高淳老街</span>
                <span>1.03公里</span>
              </li>
              <li class="list-item">
                <span>高淳老街</span>
                <span>1.03公里</span>
              </li>
              <li class="list-item">
                <span>高淳老街</span>
                <span>1.03公里</span>
              </li>
              <li class="list-item">
                <span>高淳老街</span>
                <span>1.03公里</span>
              </li>
              <li class="list-item">
                <span>高淳老街</span>
                <span>1.03公里</span>
              </li>
              <li class="list-item">
                <span>高淳老街</span>
                <span>1.03公里</span>
              </li>
              <li class="list-item">
                <span>高淳老街</span>
                <span>1.03公里</span>
              </li>
              <li class="list-item">
                <span>高淳老街</span>
                <span>1.03公里</span>
              </li>
              <li class="list-item">
                <span>高淳老街</span>
                <span>1.03公里</span>
              </li>
            </ol>
          </el-tab-pane>
          <el-tab-pane label="交通">
            <ol class="list">
              <li class="list-item">
                <span>高淳老街</span>
                <span>1.03公里</span>
              </li>
              <li class="list-item">
                <span>高淳老街</span>
                <span>1.03公里</span>
              </li>
              <li class="list-item">
                <span>高淳老街</span>
                <span>1.03公里</span>
              </li>
              <li class="list-item">
                <span>高淳老街</span>
                <span>1.03公里</span>
              </li>
              <li class="list-item">
                <span>高淳老街</span>
                <span>1.03公里</span>
              </li>
              <li class="list-item">
                <span>高淳老街</span>
                <span>1.03公里</span>
              </li>
              <li class="list-item">
                <span>高淳老街</span>
                <span>1.03公里</span>
              </li>
              <li class="list-item">
                <span>高淳老街</span>
                <span>1.03公里</span>
              </li>
              <li class="list-item">
                <span>高淳老街</span>
                <span>1.03公里</span>
              </li>
              <li class="list-item">
                <span>高淳老街</span>
                <span>1.03公里</span>
              </li>
              <li class="list-item">
                <span>高淳老街</span>
                <span>1.03公里</span>
              </li>
            </ol>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  mounted() {
    window.onLoad = function() {
      var map = new AMap.Map("container", {
        zoom: 11,
        center: [118.8718107, 31.32846821]
      });

      let markerList = [];
      // 创建一个 Marker 实例：
      var marker = new AMap.Marker({
        // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        position: new AMap.LngLat(118.8718107, 31.32846821),
        title: "广州"
      });

      // 将创建的点标记添加到已有的地图实例：
      map.add(marker);
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=9740bf2476a12295f8e18f7b9cc39e69&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>
<style lang="less" scoped>
.hote-map {
  margin-bottom: 40px;
  .map-view {
    #container {
      width: 650px;
      height: 360px;
    }
    .view-list {
      width: 330px;
      height: 360px;
      padding-left: 20px;
      /deep/ .el-tabs__content {
         height: 300px;
         overflow: auto;
        .list-item {
          display: flex;
          justify-content: space-between;
          margin: 0 20px 20px 10px;
          cursor: pointer;
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
}
</style>