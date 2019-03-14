import Vue from 'vue'
import Vuex from 'vuex'
import area from './libs/area'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '946e84f86519t7d9ca47910d129168d2',
    selectedList: [],
    allMoney: 0,
    areaList: area,
    defaultInfo: {},
    shoppingList: []
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
    },
    // 立即下单
    orderNow(state, orderMsg) {
      state.selectedList = [orderMsg]
    },
    // 更新购物车
    updateShoppingCart (state, newList) {
      state.shoppingList = [...state.shoppingList, ...newList]
    }
  },
  actions: {

  }
})
