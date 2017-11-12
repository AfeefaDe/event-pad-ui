import Vue from 'vue'
import Vuex from 'vuex'
import api from './api.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
    api
  },

  state: {
    currentEvent: null
  },
  
  mutations: {
    setCurrentEvent (event) {
      state.currentEvent = event
    }
  }
})
