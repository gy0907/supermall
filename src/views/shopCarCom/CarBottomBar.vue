<template>
  <div class="carbottombar">
    <CheckButton 
    :isActive="allCheckedFlag" 
    class="CheckButton"
    @click.native="clickAllChecked"
    ></CheckButton>
    <span>全选</span>
    <span>合计：{{  '￥' + CountAllToFixed  }}</span>
    <div class="allCount" @click="clickBuy">去结算({{ToBuyCount}})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/CheckButton'
export default {  
  components: {
    CheckButton
  },
  data() {
    return {
      allCheckedFlag: false
    }
  },
  computed: {
    CountAllPrice () {
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return  (preValue + item.price * item.count)
      }, 0) //0 是设置了循环数组的索引，从第0个索引开始
    },
    CountAllToFixed () {
      return this.CountAllPrice.toFixed(2)
    },
    ToBuyCount () {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    stateChange () {
      // 给watch监听用的
      return this.$store.state.allCheckedFlag
    }
  },
  methods: {
    clickAllChecked () {
      this.allCheckedFlag = !this.allCheckedFlag
      this.$store.commit('clickAllChecked', this.allCheckedFlag)
      // 控制全选按钮影响子按钮的 点一下子按钮全部更改状态
      if(!this.allCheckedFlag) {
        this.$store.state.cartList.map(item => {
          item.checked = false
          })
      } else {
        this.$store.state.cartList.map(item => {
          item.checked = true
          })
      }
    },
    clickBuy () {
      if(this.$store.state.cartList.find(item => item.checked)) return
      this.$toast.show('请至少选中一件商品')
    }
  },
  watch: {
    stateChange () {
      // 控制子选项修改全选按钮的 监听到子选项修改了allCheckedFlag就会跟随状态
      if(!this.stateChange) {
        this.allCheckedFlag = false
      } else {
        this.allCheckedFlag = true
      }
    }
  }
}
</script>

<style scoped>
.carbottombar {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  background-color: #eee;
}

.carbottombar span:nth-child(3) {
  flex: 1;
  margin-left: 20px;
}
.allCount {
  color: #fff;
  line-height: 40px;
  width: 80px;
  background-color: #fE560A;
  text-align: center;
}
.CheckButton {
  width: 25px;
  height: 25px;
}
</style>