<template>
<div id="banner">
  <swiper :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad" />
      </a>
    </swiper-slide>

    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</div>
</template>

<script>
// 引入swiper （组件挂载方式）
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    swiper,
    swiperSlide
  },
  props: {
    // home组件传过来的banner数据
    banners: Array
  },
  name: "carrousel",
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 挂载分页器
        pagination: {
          el: ".swiper-pagination",
        }
      }
    };
  },

  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
  },
  methods: {
    imageLoad() {
      this.$emit('BannerLoad')
    }
  }
};
</script>

<style scoped>
img {
  width: 100%;
}
.swiper-container {
  --swiper-theme-color: #ff6600;
  --swiper-pagination-color: #00ff33; /* 两种都可以 */
}
/* #banner为要穿透的组件的类名 */
#banner >>> .swiper-pagination-bullet-active {
  background-color: deeppink;
}
.swiper-pagination {
  text-align:right;
  padding-right: 10px;
}
</style>