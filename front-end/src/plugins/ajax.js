import axios from 'axios'
import qs from 'qs'

export default {
  install (Vue) {
    Vue.prototype.$ajax = axios.create({
      timeout: 30000,
      baseURL: process.env.NODE_ENV === 'production' ? '/app' : 'http://localhost:5656'
    })

    // 请求拦截器
    Vue.prototype.$ajax.interceptors.request.use(
      async function (config) {
        console.log(config)
        // 对请求参数做点什么
        if (config && config.data) {
          let { data } = { config }
          config.data = qs.stringify(data, { arrayFormat: 'brackets' })
        }
        return config
      },
      function (err) {
        return Promise.reject(err)
      }
    )

    // 响应拦截器
    Vue.prototype.$ajax.interceptors.response.use(
      function(res) {
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
