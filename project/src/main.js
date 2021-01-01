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

// 引入 Element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
