import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/axios'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false;

//@ts-ignore
window['API_PATH'] = 'http://localhost:8081/';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
