import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DakimakuraList from '../components/DakimakuraList.vue'
import DakimakuraView from '../components/DakimakuraView.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dakimakura',
    name: 'DakimakuraList',
    component: DakimakuraList
  },
  {
    path: '/dakimakura/:id',
    name: 'DakimakuraView',
    component: DakimakuraView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
