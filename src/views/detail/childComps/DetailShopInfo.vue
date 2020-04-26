<template>
  <div class="shopInfo">
    <div class="shopLogo">
      <img :src="shops.logo" alt="">
      <span>{{shops.name}}</span>
    </div>
    <div class="allInfo">
      <div class="sells">
      <div>{{(shops.sells/10000).toFixed(2) + '万'}}</div>
      <div>总销量</div>
      </div>
      <div class="goodsCount">
      <div>{{shops.goodsCount}}</div>
      <div>全部宝贝</div>
      </div>
      <div  class="right">
        <div v-for="item in shops.score" :key="item.name">
          <span> {{item.name}}</span>
          <span :class="{red: item.isBetter===false, green: item.isBetter===true}"> {{item.score}}</span>
          <span 
          class="bgRed"
          v-if="item.isBetter===false"
          >低</span>
          <span 
          class="bgGreen"
          v-else
          >高</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shops: Object
  }
}
</script>

<style scoped>
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #ccc;
    padding: 3px;
    margin: 0 5px;
  }
  .shopLogo {
    height: 80px;
    display: flex;
    align-items: center;
  }
  .allInfo {
    height: 100px;
    display: flex;
    text-align: center;
    padding: 20px 0;
    font-size: 13px;
    align-items: center;
  }
  .right {
    display: flex;
    flex-direction: column;
    flex: 2;
    text-align: left;
    
  }
  .right span {
    display: block;
    float: left;
    padding: 5px 5px;
  }
  .right span:first-of-type {
    padding-left: 30px;
  }
  .right span:nth-child(2) {
    width: 60px;
    padding-left: 15px;
  }
  .right span:nth-child(3) {
    font-size: 14px;
    padding: 1px;
    margin-left: 5px;
    margin-top: 2px;
  }
  .bgRed {
    background-color: #ff677c;
    color: #fff;
  }
  .bgGreen {
    background-color: #478f23;
    color: #fff;
  }

  .green {
    color: #478f23;
  }
  .red {
    color: #ff677c;
  }
  .sells,
  .goodsCount {
    flex: 1;
  }
  .goodsCount div:first-of-type,
  .sells div:first-of-type {
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: bold;
  }
  .goodsCount {
    border-right: 1px solid #eee;
  }

</style>