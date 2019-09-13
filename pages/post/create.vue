<template>
  <div class="create">
    <div class="container">
      <div class="main">

        <!-- 调用组件 -->
        <Publish />

      </div>
    </div>
  </div>
</template>

<script>
//引入组件
import Publish from '@/components/post/publish.vue'

export default {
  //注册组件
  components : {
    Publish
  }
 
};
</script>
<style lang="less" scoped>
.create {
  background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1568313381&di=533f8989ebb6c1a8997ca427186fae11&src=http://b-ssl.duitang.com/uploads/item/201701/20/20170120025740_Pjaek.thumb.700_0.jpeg")
    no-repeat;
  background-size: contain;
  // background-size: 30%;
  .container {
    width: 1000px;
    min-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }
}
</style>