import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    stateAdminView: 'home' ,
    loginImage: '',
    loginName: ''
  },
  mutations: {
    mutateView(state, payload){
      state.stateAdminView = payload.name
    },
     // despues hago esto del login con firebase
    getDataLogin(state, payload){
      state.loginImage = payload.image
      state.loginName = payload.name
    }
  },
  actions: {
    changeStateAdminView(context, payload){
      context.commit('mutateView', payload)
    },
     // despues hago esto del login con firebase
    getDataLogin(context, payload){
      context.commit('mutateView', payload)
    }
  },
  getters: {
    
  }

})
