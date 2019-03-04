import 'vant/lib/index.css'
import 'flex.css'
import Vue from 'vue'
import Vant from 'vant'
import './style/commont.scss'
import './style/resetVant.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import ajax from './plugins/ajax.js'

Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(ajax)
// console.log(Vant);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
