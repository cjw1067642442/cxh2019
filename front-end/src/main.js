import 'vant/lib/index.css'
import 'flex.css'
import Vue from 'vue'
import Vant from 'vant'
import { Lazyload } from 'vant'
import './style/commont.scss'
import './style/resetVant.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './filters/index.js'
import ajax from './plugins/ajax.js'
import axios from 'axios'
import getQuery from './libs/query.js'

// 定义token  946e84f86519t7d9ca47910d129168d2
let token = process.env.NODE_ENV === 'production' ? getQuery('token') : '946e84f86519t7d9ca47910d129168d2'
if (token) {
  axios.defaults.headers.token = token
  axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  store.state.token = token
}

// 返回原生
window.goBackNative =  function () {
  location.href = 'goBackNative'
}

Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(Lazyload)
Vue.use(ajax)
// 
Vue.prototype.$error = Vue.$toast
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

// 路由守卫
router.beforeEach((to, from, next) => {
  // 没有 token
  if (!token && to.path != '/login') {
    next('/login')
  }
  next()
})

new Vue({
  router,
  store,
  filters,
  render: h => h(App)
}).$mount('#app')
