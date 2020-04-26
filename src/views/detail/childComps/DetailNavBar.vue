<template>
  <div class="detailNavBar">
    <NavBar>
      <div slot="left" @click="clickBack"><i class="iconfont icon-left"></i></div>
      <div slot="center" class="center">
        <div 
        v-for="(item, index) in titles" 
        :key="item"
        :class="{active: index===navBarTabIndex}"
        @click="titleClick(index)"
        >
          {{item}}
        </div>
      </div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  components: {
    NavBar
  },
  props: {
    navBarTabIndex: Number
  },
  data () {
    return {
      titles: ['商品','评论','参数',"推荐"],
      currentIndex: 0
    }
  },
  methods: {
    titleClick (index) {
      this.currentIndex = index
      this.$emit('NavBarClick', index)
    },
    clickBack () {
      this.$router.back()
    }
  },
}
</script>

<style scoped>
  .detailNavBar {
    width: 100%;
  }
  .center {
    display: flex;
    justify-content: center;
  }
  .center div {
    margin: 0 8px;
    font-size: 14px;
  }
  .active {
    color: deeppink;
  }
  .icon-left {
    font-size: 18px;

  }
</style>