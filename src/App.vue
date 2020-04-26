<template>
<div id="app">
     <MainTabBar></MainTabBar>
     <!-- 排除detail让它每次进入都重新加载 这样就不会加载缓存页面了 -->
     <keep-alive exclude="Detail">
       <!-- 判断离开组件时是否销毁当前组件 需要在router中添加meta字段 否则全保留 -->
    <router-view></router-view>
     </keep-alive>
    </div>
</template>

<script>
import MainTabBar from 'components/content/MainTabBar'
  export default {
    name: 'app',
    components: {
      MainTabBar
    }
  }
</script>

<style>
@import "assets/css/base.css";
</style>
