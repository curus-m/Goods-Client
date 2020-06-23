import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.resourceUrl = "http://goods-resources.s3-ap-northeast-1.amazonaws.com/resources"

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
