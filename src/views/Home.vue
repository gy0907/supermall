<template>
  <div id="home">
      <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
      <!-- 粘性定位的分出来的第二个tabControl -->
      <TabControl 
      v-if="TabControlFlag"
      :titles="['流行','新款','精选']"
      :class="{tabControlClass: TabControlFlag}"
      :homeBusIndex="TabControlIndex"
      ></TabControl>
      <!-- 滚动内容 震惊：父组件通过ref方法竟能拿到子组件data和methods -->
      <BetterScroll 
      class="content" 
      ref="betterScroll" 
      @func="DisplayBackTop"
      @pullingUp="loadMore"
      >
      <Banner :banners="banners" class="bannerView" @BannerLoad.once="bannerImgLoad"></Banner>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <TabControl 
      :titles="['流行','新款','精选']"
      :homeBusIndex="TabControlIndex"
      :class="{visibiliityClass: TabControlFlag}"
      ></TabControl>
      <GoodsList 
      :goods="goods[setTabControl()].list"
      ref="GoodsList"
      ></GoodsList>
      </BetterScroll>
      <!-- 加入过渡动画 -->
      <transition name="fade">
        <BackTop @click.native="backClick" v-show="BackTopFlag"></BackTop>
      </transition>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Banner from 'components/common/banner/Banner'
import RecommendView from './HomeChildren/RecommendView'
import FeatureView from './HomeChildren/FeatureView'
import TabControl from 'components/content/tabControl'
import GoodsList from 'components/content/goods/GoodsList'

import {getHomeMultidata, getHomeGoods} from "network/home.js"
// 混入backTop
import {backTopMixin} from '@/common/mixin'


import BetterScroll from 'components/common/scroll/BetterScroll'

export default {
  name: 'Home',
  components: {
    NavBar,
    Banner,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    BetterScroll,
  },
  mixins: [backTopMixin],
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: ['pop','new','sell'],
      TabControlIndex: 0,
      BackTopScroll: 0,
      TabControlOffsetTop: 0,
      TabControlFlag: false,
      saveY: 0,
      itemImgListener: null
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
  mounted () {
    // 3.监听item中图片加载完成 调用bs.refresh()
    // 如果离开了home则需要取消监听这个事件，使用$bus.$off('事件名', 停止函数) 只传事件名的话就停止整个事件
     
    this.$bus.$on('itemImageLoad',this.itemImgListener = () => {
      this.$refs.betterScroll.bs.refresh()
    })
    // 监听tabControl的index
    this.$bus.$on('fun', (data) => {
      this.TabControlIndex = data
      // console.log(this.TabControlIndex)
    })
  },
  // 处于活跃钩子函数
  activated() {
    // 切换回来时滚动到保存位置 要同时设置keep-alive
    // 这里有个坑 如果不设置跳转的时间 则有可能出现返回顶部的bug so set 1ms
    this.$refs.betterScroll.bs.scrollTo(0, this.saveY, 1)
    // 最好再重新刷新一次
    this.$refs.betterScroll.bs.refresh()
  },
  deactivated() {
    // 保存当前页面滚动位置
    this.saveY = this.$refs.betterScroll.bs.y

    // 取消对图片加载事件的监听
    this.$bus.$off('itemImgload', this.itemImgListener)
  },
  methods: {
    // 获取banner和recommond数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
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
        console.log(this.goods[type].page)
      })
    },
    // 设置点击推荐tab栏更换数据
    setTabControl() {
      return this.currentType[this.TabControlIndex]
    },
    // 接收scroll子组件提交的参数
    DisplayBackTop (data) {
      // console.log(data)
      this.BackTopScroll = data
      //可以这样来取得布尔值
      this.BackTopFlag = this.BackTopScroll <= -800
      // 必须实时调用粘性定位方法
      this.tabControlFixed()
    },
    // 上拉加载更多事件 data是触发了触底
    loadMore () {
      // 由于前面已经写过请求的参数
      // 所以只用再次调用方法就行了
      this.getHomeGoods(this.setTabControl())
    },
    bannerImgLoad() {
      // 获取TabControl中元素的offsetTop\
      this.TabControlOffsetTop = this.$refs.GoodsList.$el.offsetTop - 40 
    },
    // 实现tabControl的粘性定位
    tabControlFixed () {
      if(-this.BackTopScroll-2 >= this.TabControlOffsetTop) {
        this.TabControlFlag = true
      } else {
        this.TabControlFlag = false
      }
    }
  }
}

</script>

<style scoped>
  #home {
    /* 弹幕牛逼 */
    height: calc(100vh - 93px);
    position: relative;
    background-color: #fff;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    font-size: 18px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
  }
  /* 粘性定位在添加betterscroll后就失效了 */
  /* .TabControl {
    position: sticky;
    top: 44px;
  } */
  .content {
    height: 100%;
    overflow: hidden;
    margin-top: 44px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  /* tabcontrol的粘性定位 */
  .tabControlClass {
    position: fixed;
    top: 43px;
  }
  .visibiliityClass {
    visibility: hidden;
  }
</style>