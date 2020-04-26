import BackTop from 'components/content/BackTop'


export const backTopMixin = {
  components: {
    BackTop
  },
  data () {
    return {
      BackTopFlag: false,
    }
  },
  methods: {
    backClick () {
      // bs是betterscroll实例 有个scrollTo(x,y,ms)方法可以跳转到指定地点
      this.$refs.betterScroll.bs.scrollTo(0,0,500)
    },
  }
}