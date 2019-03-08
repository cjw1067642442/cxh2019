import 'vant/lib/index.css'
import 'flex.css'
import Vue from 'vue'
import Vant from 'vant'
import './style/commont.scss'
import './style/resetVant.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './filters/index.js'
import ajax from './plugins/ajax.js'

Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(ajax)
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

new Vue({
  router,
  store,
  filters,
  render: h => h(App)
}).$mount('#app')
