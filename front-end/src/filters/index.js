import accounting from 'accounting'

export default {
  rmb (num) {
    return accounting.formatMoney(num, '')
  }
}
