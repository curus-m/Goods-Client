import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VuePureLightbox from 'vue-pure-lightbox'

Vue.config.productionTip = false
Vue.prototype.imageResourceUrl = "http://192.168.0.39:3000/images"
//Vue.prototype.imageResourceUrl = "http://goods-resources.s3-ap-northeast-1.amazonaws.com/resources"
Vue.prototype.ApiUrl = "http://192.168.0.39:3000"
//"http://localhost:3000";
Vue.prototype.dakimakuraPath = "/dakimakura/";
Vue.prototype.materialUrl="/resource/material/";
// Vue.prototype.preSignUrl="/getpresign"
new Vue({
  components: {
    VuePureLightbox
  },
  router,
  render: h => h(App)
}).$mount('#app')
