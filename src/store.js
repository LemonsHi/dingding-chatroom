import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: '',
    userList: [],
    openUserList: false,
    searchName: '',
    msg: '',
    DName: []
  },
  mutations: {
    setID (state, id) {
      state.id = id
    },
    setUserList (state, list) {
      state.userList = list
    },
    controlList (state, isopen) {
      state.openUserList = isopen
    },
    search (state, name) {
      state.searchName = name
    },
    msg (state, msg) {
      state.msg = msg
    },
    addMsg (state, msg) {
      state.msg += msg
    }
  },
  actions: {
    setID (context, id) {
      context.commit('setID', id)
    },
    setUserList (context, list) {
      context.commit('setUserList', list)
    },
    controlList (context, isopen) {
      context.commit('controlList', isopen)
    },
    search (context, name) {
      context.commit('search', name)
    },
    msg (context, msg) {
      context.commit('msg', msg)
    },
    addMsg (context, msg) {
      context.commit('addMsg', msg)
    }
  },
  getters: {
    allUserList: state => {
      return state.userList
    },
    aimUserList: (state) => {
      return state.userList.filter(function(item) {
        return item.name.split(state.searchName).length !== 1
      })
    },
    selfId: state => {
      return state.id
    },
    isOpenUserList: state => {
      return state.openUserList
    },
    getMsg: state => {
      return state.msg
    }
  }
});
