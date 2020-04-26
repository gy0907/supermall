<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ '￥' + goodsItem.price }}</span>
      <span class="collect">{{ '☆ ' + goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: Object
  },
  computed: {
    showImage () {
      return this.goodsItem.image || this.goodsItem.show.img 
    }
  },
  methods: {
    imageLoad() {
      // 事件总线的概念 类似于vuex 可以公用方法
      // 根据路由判断是否发送这个总线事件
      if(this.$route.path == '/home'){
        this.$bus.$emit('itemImageLoad')
      }
    },
    itemClick () {
      // 详情页路由跳转功能 因为需要返回 所以最好用push, catch解决报错问题
      this.$router.push('/detail/' + this.goodsItem.iid).catch(err=>{err})
    }

  }
}
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 45%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

</style>