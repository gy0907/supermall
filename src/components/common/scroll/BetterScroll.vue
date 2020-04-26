<template>
  <div class="BetterScroll" ref="BetterScroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      bs: null,
    }
  },
  mounted () {
    this.bs = new BScroll(this.$refs.BetterScroll, {
      click: true,
      probeType: 3,
      pullUpLoad: true
    })

    // 监听滚动位置 注意:监听事件必须先在实例中配置配置参数开启
    this.bs.on('scroll', (position) => {

      this.$emit('func', position.y)
    })

    // 监听触底上拉事件 
    this.bs.on('pullingUp', () => {
      // 可以只发送一个参数 只传递这个函数本身
      this.$emit('pullingUp')
      this.bs.finishPullUp()
    })
  }
}
</script>

<style scoped>

</style>