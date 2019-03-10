import accounting from 'accounting'
import moment from 'moment'

export default {
  rmb (num) {
    return accounting.formatMoney(num, '')
  },
  time (second) {
    if (!second) return second
    return moment(1551549006 * 1000).format('YYYY-MM-DD HH:mm:ss')
  }
}
