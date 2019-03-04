import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedList: []
  },
  mutations: {
    payfor(state, newList) {
      state.selectedList = [...newList]
      console.log(newList);
    }
  },
  actions: {

  }
})
