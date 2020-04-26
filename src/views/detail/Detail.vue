<template>
  <div class="detail">
    <DetailNavBar 
    class="DetailNavBar" 
    @NavBarClick="NavBarClick"
    :navBarTabIndex = navBarTabIndex
    ></DetailNavBar>
    <BetterScroll 
    class="content" 
    ref="betterScroll"
    @func="DisplayBackTop"
    >
    <DetailSwiper :topImages="topImage"></DetailSwiper>
    <DetailBaseInfo :BaseGoods="goods"></DetailBaseInfo>
    <DetailCommentInfo ref="commentInfo" :commentInfo="commentInfo"></DetailCommentInfo>
    <DetailShopInfo :shops="shops"></DetailShopInfo>
    <DetailItemParams ref="itemParams" :itemParams="itemParams"></DetailItemParams>
    <DetailGoodsInfo 
    :detailInfo="detailInfo"
    @detalImgLoad="GoodsInfoLoad"
    ></DetailGoodsInfo>
    <GoodsList ref="GoodsList" :goods="recommend"></GoodsList>
    </BetterScroll>
    <transition name="slide-fade">
      <BackTop v-show="BackTopFlag" @click.native="backClick"></BackTop>
    </transition>
    <DetailBottomBar @addCart="addToCart"></DetailBottomBar>
    <Toast :message="'哈哈哈哈哈'"></Toast>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailItemParams from './childComps/DetailItemParams'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import GoodsList from 'components/content/goods/GoodsList'
import BetterScroll from 'components/common/scroll/BetterScroll'
import Toast from 'components/common/toast/Toast'

import {getDetail, GoodsInfo, Shop, getRecommend} from "network/detail"

import {backTopMixin} from '@/common/mixin'
import { mapActions } from 'vuex'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    BetterScroll,
    DetailGoodsInfo,
    DetailItemParams,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Toast
  },
  mixins: [backTopMixin],
  data () {
    return {
      iid: null,
      topImage: [],
      // 这里不能定义为null 定了会报错
      goods: {},
      shops: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommend: [],
      commentOffsetTop: 0,
      itemParamsOffsetTop: 0,
      GoodsListOffsetTop: 0,
      imgListen: null,
      DetailScroll: 0,
      navBarTabIndex: 0
    }
  },
  created () {
    // 1.保存传入的id
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res)
      this.topImage = res.result.itemInfo.topImages
      
      // 获取商品信息
      this.goods = new GoodsInfo(res.result.itemInfo, res.result.columns,res.result.shopInfo.services)

      // 获取商店信息
      this.shops = new Shop(res.result.shopInfo)

      // 获取商品的详情数据
      this.detailInfo = res.result.detailInfo

      // 获取表格参数信息
      this.itemParams = res.result.itemParams

      // 获取评论相关信息
      if (res.result.rate.cRate !== 0){
      this.commentInfo = res.result.rate.list[0]
      }
    })
    // 3.获取商品推荐信息
    getRecommend().then(res => {
      this.recommend = res.data.list
    })
  },
  methods: {
    ...mapActions(['addCart']),
    GoodsInfoLoad () {
      this.$refs.betterScroll.bs.refresh()
      // 将需要添加锚点的组件的offsetTop获取过来
      this.commentOffsetTop = this.$refs.commentInfo.$el.offsetTop
      this.itemParamsOffsetTop = this.$refs.itemParams.$el.offsetTop
      this.GoodsListOffsetTop = this.$refs.GoodsList.$el.offsetTop
    },
    // 接收scroll子组件提交的参数
    DisplayBackTop (data) {
      // console.log(Math.floor(data))
      this.DetailScroll = data
      //可以这样来取得布尔值
      this.BackTopFlag = this.DetailScroll <= -800

      // 感觉在这里解决滚动页面tab栏跟随的问题比较好 真费事....
      if(-this.DetailScroll < this.commentOffsetTop - 60) {
        this.navBarTabIndex = 0
      } else if(this.commentOffsetTop - 60 < -this.DetailScroll && -this.DetailScroll < this.itemParamsOffsetTop - 60){
        this.navBarTabIndex = 1
      } else if(this.itemParamsOffsetTop - 60 < -this.DetailScroll && -this.DetailScroll < this.GoodsListOffsetTop - 110){
        this.navBarTabIndex = 2
      } else if(-this.DetailScroll > this.GoodsListOffsetTop  - 110){
        this.navBarTabIndex = 3
      }
    },
    //点击tab栏滚动到指定位置
    NavBarClick (index) {
      this.navBarTabIndex = index
      switch (this.navBarTabIndex) {
        case 0: this.$refs.betterScroll.bs.scrollTo(0, 0, 500)
        break;
        case 1: this.$refs.betterScroll.bs.scrollTo(0, -this.commentOffsetTop + 50, 500)
        break;
        case 2: this.$refs.betterScroll.bs.scrollTo(0, -this.itemParamsOffsetTop + 50, 500)
        break;
        case 3: this.$refs.betterScroll.bs.scrollTo(0, -this.GoodsListOffsetTop + 100, 500)
        break;
      }
    },
    // 实现加入购物车功能
    addToCart () {
      const product = {}
        product.image = this.topImage[0]
        product.title = this.goods.title
        product.desc = this.detailInfo.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        product.checked = false

        // 使用了vuex中映射过来的方法 就不用像下面那样用dispatch提交了
        this.addCart(product).then(res => {
          // 设置一个提示弹窗
          this.$toast.show(res, 2000)
        })
        // this.$store.commit('addCart', product)
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res)
        // })
    }
  }
}
</script>

<style scoped>
/* 震惊：整个项目只需要导入一次iconfont即可 */
/* @import '../../assets/css/iconfont.css' */
.detail {
  position: relative;
  background-color: #fff;
  z-index: 1000;
  height: 100vh;
}
.content {
  height: calc(100% - 93px);
}
.DetailNavBar {
  position:relative;
  background-color: #fff;
  z-index: 100;
}
/* 几个动画类 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(15px);
  opacity: 0;
}
</style>