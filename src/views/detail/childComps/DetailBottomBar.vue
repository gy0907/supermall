<template>
  <div class="bottomBar">
    <div class="custom-service">
      <div>
        <i class="iconfont icon-custom-service"></i>
        <span>客服</span>
      </div>
      <div>
        <i class="iconfont icon-dianpu"></i>
        <span>店铺</span>
      </div>
      <div>
        <i class="iconfont icon-star"></i>
        <span>收藏</span>
      </div>
    </div>
    <div 
    class="addShopCar"
    @click="addToCart"
    >加入购物车</div>
    <div class="buy">购买</div>
  </div>
</template>

<script>
export default {
  methods: {
    addToCart () {
      this.$emit('addCart')
    }
  }
}
</script>

<style scoped>
.bottomBar {
  position: fixed;
  width: 100%;
  height: 49px;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  text-align: center;
  background: #fff;
}
.custom-service {
  flex: 2;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}
span {
  display: block;
  font-size: 12px;
}
.custom-service i {
  font-size: 24px;
}
.addShopCar,
.buy {
  flex: 1;
  border-radius: 30px 0 0 30px;
  background: linear-gradient(90deg,#ffc400, #ff9402);
  line-height: 45px;
  color: white;
  font-size: 14px;
}
.buy {
  border-radius: 0 30px 30px 0;
  background: linear-gradient(90deg,#ff7900, #fE560A);

}
</style>