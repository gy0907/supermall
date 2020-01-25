<template>
    <TabBar>
    <TabBarItem path="/home" activeColor="deeppink">
        <i slot="item-icon" class="iconfont icon-shouye"></i>
        <span slot="item-text">首页</span>
    </TabBarItem>
    <TabBarItem path="/menu" activeColor="deeppink">
        <i slot="item-icon" class="iconfont icon-list"></i>
        <span slot="item-text">分类</span>
    </TabBarItem>
    <TabBarItem path="/shopcar" activeColor="deeppink">
        <i slot="item-icon" class="iconfont icon-gouwuche"></i>
        <span slot="item-text">购物车</span>
    </TabBarItem>
    <TabBarItem path="/profile" activeColor="deeppink">
        <i slot="item-icon" class="iconfont icon-gerenzhongxin"></i>
        <span slot="item-text">我的</span>
    </TabBarItem>
    </TabBar>
</template>
<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'
export default {
  components: {
    TabBar,
    TabBarItem
  }
}
</script>
<style scoped>
/* 这里不能使用js定义的别名 必须要使用相对路径 */
@import '../../assets/css/iconfont.css';

</style>
