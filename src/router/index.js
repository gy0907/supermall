import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/Home')
const Menu = () => import('views/Menu')
const ShopCar = () => import('views/ShopCar')
const Profile = () => import('views/Profile')
const Detail = () => import('views/detail/Detail')

// 创建路由实例
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta:{ keepAlive: true }
  },
  {
    path: '/menu',
    component: Menu
  },
  {
    path: '/shopcar',
    component: ShopCar
  },
  {
    path: '/Profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router