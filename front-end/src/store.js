import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedList: [],
    allMoney: 0,
    areaList: require('../data-factory/area.js').default,
    defaultInfo: {},
    shoppingList: [
      {
        quantity: 1,
        product_id: 1,
        product_title: '\u4ea7\u54c1 001',
        product_price: '10.00',
        product_img: '',
        create_time: 1551507879,
        selected: false
      }, {
        quantity: 1,
        product_id: 2,
        product_title: '\u4ea7\u54c1 002',
        product_price: '1.00',
        product_img: '',
        create_time: 1551507939,
        selected: false
      }
    ]
  },
  mutations: {
    payfor (state, newList) {
      state.selectedList = [...newList]
    },
    changeAllMoney (state, newVal) {
      state.allMoney = newVal
    },
    // 修改地址  默认 值
    setDefaultInfo (state, info) {
      state.defaultInfo = info
    }
  },
  actions: {

  }
})
