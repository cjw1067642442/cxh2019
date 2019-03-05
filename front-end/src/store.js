import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedList: [],
    allMoney: 0
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
