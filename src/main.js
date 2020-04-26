import Vue from 'vue'
import App from '@/App.vue'
import router from './router'
import store from './store/store'
import VueLazyload from 'vue-lazyload'

import Fastclick from 'fastclick'

import toast from 'components/common/toast'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 安装vue-lazyload
Vue.use(VueLazyload, {
  loading: require('assets/img/loading.jpg')
})

// 解决移动端300ms延迟问题
Fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
