import axios from 'axios'
import { Toast } from 'vant'
import qs from 'qs'

export default {
  install (Vue) {
    Vue.prototype.$ajax = axios.create({
      baseURL: 'http://app.cxhshop.cc/app', // http://app.cxhshop.cc
      timeout: 60000
    })

    // 请求拦截器
    Vue.prototype.$ajax.interceptors.request.use(
      function (config) {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        config.headers['token'] = '946e84f86519t7d9ca47910d129168d2'
        // 对请求参数做点什么
        if (config && config.data) {
          let data = Object.assign({}, config.data)
          config.data = qs.stringify(data, { arrayFormat: 'indices' })
        }
        return config
      },
      function (err) {
        // Vue.$toast('系统繁忙，请稍后重试')
        return Promise.reject(err)
      }
    )

    // 响应拦截器
    Vue.prototype.$ajax.interceptors.response.use(
      function(res) {
        if (res.data && Object.prototype.toString.call(res.data) !== '[object Object]') {
          let config = Object.assign({url, data}, res.config)
          let { url, data } = res.config
          // Vue.$toast('系统繁忙，请稍后重试')
          axios.post(`http://app.cxhshop.cc/app/common/err`, qs.stringify({ req_url: url, param: data }, { arrayFormat: 'brackets' }))
            .then(succ => {
              console.log(succ);
            })
        }
        if (res.data) {
          return res.data
        }
      },
      function(err) {
        return Promise.reject(err)
      }
    )
  }
}
