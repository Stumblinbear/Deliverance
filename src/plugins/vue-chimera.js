import Vue from 'vue';
import VueChimera, { MemoryCache } from 'vue-chimera';

Vue.use(VueChimera, {
    // 10 second cache. Accounts for multiple components requesting the same exact data.
    cache: new MemoryCache(10 * 1000),
    keepData: true
});

