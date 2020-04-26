<template>
  <div class="cart-list">
    <BrtterScroll class="content" ref="betterScroll">
      <CarListItem 
      v-for="item in carList" 
      :key="item.iid "
      :product="item"
      ></CarListItem>
    </BrtterScroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import CarListItem from './CarListItem'

import BrtterScroll from 'components/common/scroll/BetterScroll'
export default {
  components: {
    BrtterScroll,
    CarListItem
  },
  computed: {
    ...mapGetters(['carList'])
  },
  activated () {
    this.$refs.betterScroll.bs.refresh()
  }
}
</script>

<style scoped>
 .cart-list {
   height: 100vh;
 }
 .content {
  height: 100%;
}
</style>