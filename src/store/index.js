import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: '',
    token: ''
  },
  mutations: {

  },
  actions: {
    SET_AUTH(store, [ username, token ]) {
      console.log(username, token);

      store.state.username = username;
      store.state.token = token;

      localStorage.setItem('username', username);
      localStorage.setItem('token', token);

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
  }
});

if(localStorage.getItem('username') && localStorage.getItem('token')) {
  store.dispatch('SET_AUTH', [ localStorage.getItem('username'), localStorage.getItem('token') ]);
}

export default store;