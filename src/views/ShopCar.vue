<template>
<div>
  <NavBar class="navbar"><div slot="center">购物车({{carLength}})</div></NavBar>
  <CarList class="carlist"></CarList>
  <CarBottomBar></CarBottomBar>
  </div>
</template>


<script>
import NavBar from 'components/common/navbar/NavBar'
import CarList from './shopCarCom/CarList'
import CarBottomBar from './shopCarCom/CarBottomBar'
// 注意：直接从vuex里面导入
import {mapGetters} from 'vuex'
export default {
  components: {
    NavBar,
    CarList,
    CarBottomBar
  },
  computed: {
    // 两种用法
    // ...mapGetters([
    //   'cartListLength'
    // ])
    ...mapGetters({
      carLength: 'cartListLength'
    })
  }
}
</script>

<style scoped>
  .navbar {
    background-color: var(--color-tint);
    color: #fff;
    font-size: 18px;
    z-index: 99;
  }
  .carlist {
    /* margin-top: 44px; */
    height: calc(100vh - 133px);
    overflow: hidden;
  }
</style>