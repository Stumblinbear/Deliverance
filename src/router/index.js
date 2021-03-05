import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  }, {
    path: '/locations',
    name: 'Locations',
    component: () => import(/* webpackChunkName: "locations" */ '../views/Locations.vue')
  }, {
    path: '/ships',
    name: 'Ships',
    component: () => import(/* webpackChunkName: "ships" */ '../views/Ships.vue')
  }, {
    path: '/loans',
    name: 'Loans',
    component: () => import(/* webpackChunkName: "loans" */ '../views/Loans.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
