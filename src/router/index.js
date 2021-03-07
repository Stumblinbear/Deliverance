import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  }, {
    path: '/systems',
    name: 'System List',
    component: () => import(/* webpackChunkName: "systems" */ '../views/systems/List.vue')
  }, {
    path: '/systems/:id',
    name: 'System View',
    component: () => import(/* webpackChunkName: "systems" */ '../views/systems/View.vue')
  }, {
    path: '/ships',
    name: 'Ships',
    component: () => import(/* webpackChunkName: "ships" */ '../views/Ships.vue')
  }, {
    path: '/loans',
    name: 'Loans',
    component: () => import(/* webpackChunkName: "loans" */ '../views/Loans.vue')
  }, {
    path: '/market',
    name: 'Market',
    component: () => import(/* webpackChunkName: "market-ships" */ '../views/Market.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
