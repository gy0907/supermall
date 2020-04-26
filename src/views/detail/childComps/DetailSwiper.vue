<template>
  <div>
    <swiper :options="swiperOption" class="swiperHeihgt">
      <swiper-slide v-for="item in topImages" :key="item">
        <img :src="item" alt="">
      </swiper-slide>
       <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    swiperSlide
  },
  props: {
    topImages: Array
  },
  data () {
    return {
      swiperOption: {
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
}
</script>

<style scoped>
  .swiper-slide img{
    width: 100%;
  }
  .swiperHeihgt {
    height: 300px;
    overflow: hidden;
  }
</style>