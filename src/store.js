import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: '',
    userList:[]
  },
  mutations: {
    setID (state, id) {
      state.id = id
    },
    setUserList (state, list) {
      state.userList = list
    }
  },
  actions: {
    setID (context, id) {
      context.commit('setID', id)
    },
    setUserList (context, list) {
      context.commit('setUserList', list)
    }
  },
  getters: {
    allUserList: state => {
      return state.userList
    },
    selfId: state => {
      return state.id
    }
  }
});
