<template>
<div class="tab-bar-item" @click="itemClick">
  <div :style="activeStyle" :class="{'tab-bar-item-active': isActive}">
    <slot name="item-icon"></slot>
  </div>
  <div :style="activeStyle" :class="{'tab-bar-item-active': isActive}">
    <slot name="item-text"></slot>
  </div>
</div>
</template>

<script>
export default {
  // 子组件的props是一个对象
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data () {
    return {
      // isActive: false
    }
  },
  computed: {
    isActive () {
      // 如果路由路径和props中的路径一致的话就返回一个true
      return this.$route.path.indexOf(this.path) !== -1
    },
    
    activeStyle () {
      return this.isActive ? {color: this.activeColor} : {} 
    }
  },
  methods: {
    itemClick () {
      // 跳转到指定路径 路径由props传入
      // 加catch解决报错问题
      // console.log(this.path)
      this.$router.replace(this.path).catch(err => {err})
    }
  }

}
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    height: 49px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .tab-bar-item i {
    padding-top: 5px;
    font-size: 24px;
  }
  .tab-bar-item span {
    font-size: 14px;
  }
  /* .tab-bar-item-active {
    color: red;
  } */
</style>