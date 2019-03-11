import accounting from 'accounting'
import moment from 'moment'

export default {
  rmb (num) {
    return accounting.formatMoney(num, '')
  },
  time (second) {
    if (!second) return second
    return moment(1551549006 * 1000).format('YYYY-MM-DD HH:mm:ss')
  },
  diffTime (tagTime) {
    if (!tagTime) return ''
    let difTime = (new Date()) - (tagTime * 1000)
    let hour = parseInt(difTime / 3600000)
    let second = parseInt((difTime - hour * 3600000) / 60000)
    return `${hour}小时${second}分钟`
  }
}
