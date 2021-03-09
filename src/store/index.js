import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/plugins/vue-axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    outstandingRequests: 0,
    
    accounts: [ ],

    username: '',
    token: ''
  },
  mutations: {

  },
  actions: {
    SET_ACCOUNTS(store, accounts) {
      store.state.accounts = accounts;
    },

    ADD_ACCOUNT(store, [ username, token ]) {
      store.state.accounts.push([ username, token ]);
      
      localStorage.setItem('accounts', JSON.stringify(store.state.accounts));
    }, REMOVE_ACCOUNT(store, [ username, token ]) {
      Vue.delete(store.state.accounts, store.state.accounts.findIndex((auth) => auth[0] == username && auth[1] == token));
      
      localStorage.setItem('accounts', JSON.stringify(store.state.accounts));
    },

    SET_AUTH(store, [ username, token ]) {
      api.defaults.headers.common['Authorization'] = 'Bearer ' + token;

      store.state.username = username;
      store.state.token = token;

      localStorage.setItem('username', username);
      localStorage.setItem('token', token);

      if(username != '' && token != '' && !store.state.accounts.some((auth) => auth[0] == username && auth[1] == token)) {
        this.dispatch('ADD_ACCOUNT', [ username, token ]);
      }
    }
  }
});

if(localStorage.getItem('accounts')) {
  store.dispatch('SET_ACCOUNTS', JSON.parse(localStorage.getItem('accounts')));
}

if(localStorage.getItem('username') && localStorage.getItem('token')) {
  store.dispatch('SET_AUTH', [ localStorage.getItem('username'), localStorage.getItem('token') ]);
}

function reduceOutstanding() {
  // Add a slight delay so the loading spinner looks like a loading spinner
  setTimeout(() => {
    store.state.outstandingRequests--;
  }, 500);
}

api.interceptors.request.use(req => { store.state.outstandingRequests++; return req; });
api.interceptors.response.use(res => { reduceOutstanding(); return res; },
                              err => { reduceOutstanding(); throw err; });
  

api.interceptors.response.use(null,  err => {
  if(err.response && err.response.status == 401) {
    store.dispatch('REMOVE_ACCOUNT', [ store.state.username, store.state.token ]);
    store.dispatch('SET_AUTH', [ '', '' ]);
    return;
  }

  throw err;
});

export default store;