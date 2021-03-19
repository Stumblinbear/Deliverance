import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import rateLimit from 'axios-rate-limit';

const api = rateLimit(axios.create(), { maxRequests: 2, perMilliseconds: 1000 });

Vue.use(VueAxios, api);

export default api;