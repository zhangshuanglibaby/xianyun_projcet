<template>
  <div class="container">
      <el-row type="flex" justify="space-between" >
        <!-- 左侧栏 -->
        <PostAside />

      </el-row>
  </div>
</template>

<script>
import PostAside  from '@/components/post/postAside'
export default {
  components : {
    PostAside
  }
}
</script>

<style lang="less" scoped>
.container {
  min-width : 1000px;
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
}

</style>