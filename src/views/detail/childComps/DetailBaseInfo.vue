<template>
<!-- 这个v-if的作用是如果goods是空对象则不进行渲染 -->
  <div v-if="Object.keys(BaseGoods).length !== 0" class="DetailBaseInfo">
    <div class="info-title">{{ BaseGoods.title }}</div>
    <div class="info-price">
      <span class="PriceStyle">{{'￥' + BaseGoods.realPrice }}</span>
      <span><s>{{ BaseGoods.oldPrice }}</s></span>
      <span class="discountStyle" v-if="BaseGoods.discount">{{BaseGoods.discount}}</span>
    </div>
    <div class="columnStyle">
      <span>{{BaseGoods.columns[0]}}</span>
      <span>{{BaseGoods.columns[1]}}</span>
      <span>{{BaseGoods.columns[2]}}</span>
    </div>
    <div class="serviceStyle">
      <span v-for="item in BaseGoods.services" :key="item.name">
        <img :src="item.icon" alt="">
        <span>{{item.name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  // name: DetailBaseInfo, 日了狗 加上name就报错我也是无语
  props: {
    BaseGoods: Object
  },
  data () {
    return {
      spliceService: []
    }
  },
}
</script>

<style scoped>
  .PriceStyle {
    font-size: 26px;
    color: #ff677c;
  }
  .info-title {
    font-size: 16px !important;
    font-weight: 700;
    padding: 17px 10px;
    white-space: 10px;
    text-indent: 1em;
  }
  .info-price {
    position: relative;
  }
  .info-price span s {
    font-size: 14px;
    padding-left: 5px;
  }
  .discountStyle {
    padding: 2px 10px;
    background-color: #ff677c;
    border-radius: 20px;;
    color: #fff;
    font-size: 12px;
    text-align: center;
    position: absolute;
    top: 5px;
    margin-left: 5px;
  }
  .columnStyle {
    margin-top: 25px;
    font-size: 13px;
    color: #888;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    padding-bottom: 10px;
    border-bottom: 2px solid #eee;
  }
  .serviceStyle {
    margin-top: 25px;
    font-size: 13px;
    color: #333;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 10px;
    padding-bottom: 20px;
    border-bottom: 5px solid #eee;
  }
  .serviceStyle img {
    width: 12px;
  }
  /* 截取数组传过来太麻烦了 还是css好使啊 */
  .serviceStyle>span:first-of-type {
    display: none;
  }

</style>