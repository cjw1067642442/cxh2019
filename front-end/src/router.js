import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/myOrders',
      name: 'myOrders',
      component: () => import(/* webpackChunkName: "myOrders" */ './views/myOrders.vue')
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: () => import(/* webpackChunkName: "orderDetail" */ './views/orderDetail.vue')
    },
    {
      path: '/shoppingcart',
      name: 'shoppingcart',
      component: () => import(/* webpackChunkName: "shoppingcart" */ './views/shoppingCart.vue')
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import(/* webpackChunkName: "payment" */ './views/payment.vue')
    },
    {
      path: '/address',
      name: 'address',
      component: () => import(/* webpackChunkName: "address" */ './views/address.vue')
    },
    {
      path: '/editaddress',
      name: 'editaddress',
      component: () => import(/* webpackChunkName: "editaddress" */ './views/editAddress.vue')
    },
    {
      path: '/product',
      name: 'product',
      component: () => import(/* webpackChunkName: "editaddress" */ './views/product.vue')
    }
  ]
})
