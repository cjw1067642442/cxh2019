import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedList: [],
    allMoney: 0,
    areaList: require('../data-factory/area.js').default
  },
  mutations: {
    payfor(state, newList) {
      state.selectedList = [...newList]
    },
    changeAllMoney(state, newVal) {
      console.log(newVal);
      state.allMoney = newVal
    }
  },
  actions: {

  }
})
