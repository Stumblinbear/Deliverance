import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store';
import router from './router';
import './plugins/vue-axios';
import './plugins/vue-chimera';
import './plugins/vue-timeago';

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
