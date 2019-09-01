<template>
  <div style="width:300px;margin:100px auto">
    <div class="tab">
      <span v-for="(item,index) in ['新闻','体育','娱乐']" 
      :key='index'
      @click="current=index"
      :class="{active : current === index}"
      >
        {{item}}
      </span>
    </div>
    <!-- 新闻内容 -->
    <div v-show="current === 0">
      <ul>
        <li>中秋将至</li>
        <li>中秋将至</li>
        <li>中秋将至</li>
      </ul>
    </div>
    <!-- 体育内容 -->
    <div v-show="current === 1">
      <ul>
        <li>中国男篮世界杯</li>
        <li>中国男篮世界杯</li>
        <li>中国男篮世界杯</li>
      </ul>
    </div>
    <!-- 娱乐内容 -->
    <div v-show="current === 2">
      <ul>
        <li>文章离婚</li>
        <li>文章离婚</li>
        <li>文章离婚</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current : 0
    }
  }
};
</script>

<style lang='less' scope>
.tab {
  span {
    cursor: pointer;
  }
}
.active {
  color: red
}
</style>