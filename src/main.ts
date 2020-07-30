import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/axios'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

/*google analytics 初始化并绑定 router*/
import VueGtag from "vue-gtag";
Vue.use(VueGtag, {
  // config: { id: "UA-238826768-1" }
  config: { id: "G-YK0E4K93HL" }
}, router);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
