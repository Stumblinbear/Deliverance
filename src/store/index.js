import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/plugins/vue-axios';

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

      api.defaults.headers.common['Authorization'] = 'Bearer ' + token;

      store.state.username = username;
      store.state.token = token;

      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
    }
  }
});

if(localStorage.getItem('username') && localStorage.getItem('token')) {
  store.dispatch('SET_AUTH', [ localStorage.getItem('username'), localStorage.getItem('token') ]);
}

api.interceptors.response.use(null,  err => {
  if(err.response.status == 401) {
    store.dispatch('SET_AUTH', [ '', '' ]);
    return;
  }

  throw err;
});

export default store;