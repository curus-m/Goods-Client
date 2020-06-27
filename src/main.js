import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VuePureLightbox from 'vue-pure-lightbox'
Vue.config.productionTip = false
Vue.prototype.imageResourceUrl = "http://goods-resources.s3-ap-northeast-1.amazonaws.com/resources"
Vue.prototype.ApiUrl = "https://9twj2j205g.execute-api.ap-northeast-2.amazonaws.com/dev";
Vue.prototype.dakimakuraPath = "/dakimakura/";
Vue.prototype.material="/material/";
new Vue({
  components: {
    VuePureLightbox,
  },
  router,
  render: h => h(App)
}).$mount('#app')
