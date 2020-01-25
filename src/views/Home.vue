<template>
  <div id="home">
      <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
      <Banner :banners="banners" class="bannerView"></Banner>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <TabControl class="TabControl" :titles="['流行','新款','精选']"></TabControl>
      <div style="width: 100%; height:800px;"></div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Banner from 'components/common/banner/Banner'
import RecommendView from './HomeChildren/RecommendView'
import FeatureView from './HomeChildren/FeatureView'
import TabControl from 'components/content/tabControl'

import {getHomeMultidata, getHomeGoods} from "network/home.js"

export default {
  name: 'Home',
  components: {
    NavBar,
    Banner,
    RecommendView,
    FeatureView,
    TabControl
  },
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      }
    }
  },
  created() {
    // 1.请求多个数据 created里面最好只写主要逻辑 所以方法要放进methods中
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        console.log(res)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods (type) {
      // 获取当前页码加1 请求下一页数据
      const page = this.goods[type].page + 1
      getHomeGoods (type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page = res.data.page
      })
    }
  }
}

</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    font-size: 18px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
  }
  .bannerView {
    margin-top: 44px;
  }
  .TabControl {
    position: sticky;
    top: 44px;
  }
</style>