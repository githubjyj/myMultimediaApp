import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入 reset.css 和 rem.js
import './assets/css/reset.css'
import './assets/js/rem.js'

// 引入 axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
