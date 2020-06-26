import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import DakimakuraList from '../components/Dakimakura/DakimakuraList.vue'
import DakimakuraView from '../components/Dakimakura/DakimakuraView.vue'
import DakimakuraAdd from '../components/Dakimakura/DakimakuraAdd.vue'
import DakimakuraEdit from '../components/Dakimakura/DakimakuraEdit.vue'
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
    path: '/dakimakura/add/',
    name: 'DakimakuraAdd',
    component: DakimakuraAdd
  },
  {
    path: '/dakimakura/:id',
    name: 'DakimakuraView',
    component: DakimakuraView
  },
  {
    path: '/dakimakura/edit/:id',
    name: 'DakimakuraEdit',
    component: DakimakuraEdit
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
