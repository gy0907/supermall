<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
        ■
      </div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end">
        ■
      </div>
    </div>
    <div class="info-key"> {{detailInfo.detailImage[0].key}} </div>
    <div class="info-list">
      <img 
      v-for="(item, index) in detailInfo.detailImage[0].list" 
      :key='index' 
      :src="item"
      @load="imgLoad"
      >
    </div>
    <div class="more">更多推荐</div>
  </div>
</template>

<script>
export default {
  props: {
    detailInfo: Object
  },
  data() {
    return {
      couter: 0,
      imageLength: 0
    }
  },
  methods: {
    imgLoad () {
      // 监听图片数据长度 直到数据都加载完了才发送数据
      // 虽然图片监听还是执行了很多次 但是emit发送了一次
      // 已知防抖的最好方式 就是加一个if判断 比在detail中加防抖函数好多了
      if(++this.couter === this.imageLength){
      this.$emit('detalImgLoad')
      }
    }
  },
  watch: {
    detailInfo () {
      this.imageLength = this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>

<style scoped>
  .info-list img {
    width: 100%;
  }
  .goods-info {
    padding: 1px 5px;
    text-align: center;
  }
  .goods-info>div>div {
    padding-top: 10px;
  }
  .start {
    color: #000;
    width: 110px;
    height: 16px;
    border-bottom: 1px solid #000;
    text-align: left;
    margin:10px 10px;
  }
  .end {
    width: 110px;
    height: 25px;
    border-bottom: 1px solid #000;
    text-align: right;
    color: #000;
    float: right;
    margin-right: 10px;
  }
  .more {
    width: 100%;
    height: 50px;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-bottom: 10px;
  }
</style>