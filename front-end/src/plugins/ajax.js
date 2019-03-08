import axios from 'axios'
import qs from 'qs'

export default {
  install (Vue) {
    Vue.prototype.$ajax = axios.create({
      timeout: 30000,
      baseURL: 'http://app.cxhshop.cc/app', // http://app.cxhshop.cc
      timeout: 60000
    })

    // 请求拦截器
    Vue.prototype.$ajax.interceptors.request.use(
      async function (config) {
        config.headers['token'] = '946e84f86519t7d9ca47910d129168d2'
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
        if (res.data && parseInt(res.data.status) === 0) {
          let config = Object.assign({url, data}, res.config)
          let { url, data } = res.config
          axios.post(`${process.env.NODE_ENV === 'production' ? '/app' : 'http://localhost:5656'}/home`, qs.stringify({ url, data }, { arrayFormat: 'brackets' }))
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
