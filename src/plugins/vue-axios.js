import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

axios.defaults.baseURL = 'https://api.spacetraders.io';

Vue.use(VueAxios, axios);