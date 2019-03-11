import Vue from 'vue'
import Vuex from 'vuex'
import area from './libs/area'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
    }
  },
  actions: {

  }
})
