import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {

  },
  actions: {
    SET_TOKEN(store, token) {
      store.state.token = token;

      localStorage.setItem('token', token);

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
  }
});

if(localStorage.getItem('token')) {
  store.dispatch('SET_TOKEN', localStorage.getItem('token'));
}

export default store;