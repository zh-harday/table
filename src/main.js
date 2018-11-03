import 'babel-polyfill';
import {
    Promise
} from 'es6-promise-polyfill'
import Vue from 'vue'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api/index'
import './registerServiceWorker'

Vue.config.productionTip = false
//清除vue warning
Vue.config.silent = true;

Vue.use(element)
const vm = Vue.use(api);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
