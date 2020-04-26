<template>
<div>
  <div class="itemCon1">
    <div class="checkbox" @click.stop="itemFlag" >
      <CheckButton :isActive="product.checked"></CheckButton>
    </div>
      <div class="CartImg">
        <img :src="product.image" alt="">
      </div>
      <div class="pStyle">
        <p>{{product.title}}</p>
        <p>{{product.desc}}</p>
        <p>{{'￥'+product.price}}</p>
        <p>{{'×'+product.count}}</p>
      </div>
  </div>
</div>
</template>

<script>
import CheckButton from 'components/content/CheckButton'
export default {
  props: {
    product: Object
  },
  components: {
    CheckButton
  },
  data () {
    return {
      // isActive: false
    }
  },
  methods: {
    itemFlag() {
      this.product.checked = !this.product.checked
      // 这个if指的是cartList数组的checked都为true时，才执行
      if(this.$store.state.cartList.filter(item=>item.checked).length===this.$store.state.cartList.length) {
        this.$store.commit('clickAllFlagTrue')
      } else {
        this.$store.commit('clickAllFlagFalse')
      }
    }
  }
}
</script>

<style scoped>
  .itemCon1 {
    height: 130px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
  }
  .pStyle {
    width: 75vw;
    position: relative;
    height: 100%;
    padding-left: 10px;
    padding-top: 12px;
  }
  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
  p:first-child {
    width: 90%;
    font-weight: bold;
  }
  p:nth-child(2) {
    width: 90%;
    font-size: 13px;
  }
  p:nth-child(3) {
    position: relative;
    top: 25px;
    font-size: 18px;
    color: orangered;
  }
  p:last-child {
    position: absolute;
    font-size: 18px;
    bottom: 10px;
    right: 30px;
    color: orangered;
  }
  [src] {
    width: 70px;
    height: 100px;
    border-radius: 5px;
    text-align: center;
  }
  .checkbox {
    height: 100px;
    display: flex;
    align-items: center;
    border-radius: 50%;
    margin: 6px;
    color: red;
  }
</style>