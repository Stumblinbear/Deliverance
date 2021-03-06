import Vue from 'vue';
import VueChimera, { MemoryCache } from 'vue-chimera';
import api from './vue-axios';

Vue.use(VueChimera, {
    axios: api,
    // 10 second cache. Accounts for multiple components requesting the same exact data.
    cache: new MemoryCache(10 * 1000),
    keepData: true
});