<template>
<div id="app">
     <MainTabBar></MainTabBar>
     <keep-alive>
       <!-- 判断离开组件时是否销毁当前组件 需要在router中添加meta字段 否则全保留 -->
    <router-view v-if="$route.meta.keepAlive"></router-view>
     </keep-alive>
     <router-view v-if="!$route.meta.keepAlive"></router-view>
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
