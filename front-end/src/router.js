import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import myOrders from './views/myOrders.vue'
import loginTips from './views/loginTips.vue'

Vue.use(Router)

export default new Router({
  mode: 'history', // hash
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: myOrders
    },
    // token 失效提示页面
    {
      path: '/login',
      name: 'login',
      component: loginTips
    },
    // 我的订单列表
    {
      path: '/myOrders',
      name: 'myOrders',
      component: () => import(/* webpackChunkName: "myOrders" */ './views/myOrders.vue')
    },
    // 订单详情
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: () => import(/* webpackChunkName: "orderDetail" */ './views/orderDetail.vue')
    },
    // 购物车 列表
    {
      path: '/shoppingcart',
      name: 'shoppingcart',
      component: () => import(/* webpackChunkName: "shoppingcart" */ './views/shoppingCart.vue')
    },
    // 购物车  提交订单
    {
      path: '/payment',
      name: 'payment',
      component: () => import(/* webpackChunkName: "payment" */ './views/payment.vue')
    },
    // 地址列表
    {
      path: '/address',
      name: 'address',
      component: () => import(/* webpackChunkName: "address" */ './views/address.vue')
    },
    // 编辑地址
    {
      path: '/editaddress',
      name: 'editaddress',
      component: () => import(/* webpackChunkName: "editaddress" */ './views/editAddress.vue')
    },
    // 商品详情
    {
      path: '/product',
      name: 'product',
      component: () => import(/* webpackChunkName: "editaddress" */ './views/product.vue')
    },
    // 商品列表
    {
      path: '/prodlist',
      name: 'prodlist',
      component: () => import(/* webpackChunkName: "prodlist" */ './views/productList.vue')
    },
    // 兑换
    {
      path: '/redeem',
      name: 'redeem',
      component: () => import(/* webpackChunkName: "redeem" */ './views/redeem.vue')
    },
    {
      path: '/cxgredeem',
      name: 'cxgredeem',
      component: () => import(/* webpackChunkName: "cxgredeem" */ './views/cxgredeem.vue')
    },
    // 我的消息
    {
      path: '/mymessage',
      name: 'mymessage',
      component: () => import(/* webpackChunkName: "mymessage" */ './views/myMessage.vue')
    },
    // 消息详情
    {
      path: '/msgDetail',
      name: 'msgDetail',
      component: () => import(/* webpackChunkName: "msgDetail" */ './views/msgDetail.vue')
    },
    // 付款页面
    {
      path: '/payFor',
      name: 'payFor',
      component: () => import(/* webpackChunkName: "payFor" */ './views/payFor.vue')
    },
    // 列表
    {
      path: '/tablist',
      name: 'tablist',
      component: () => import(/* webpackChunkName: "tablist" */ './views/tabList.vue')
    },
    // vip 说明
    {
      path: '/vip',
      name: 'vip',
      component: () => import(/* webpackChunkName: "vip" */ './views/vip.vue')
    },
    // 公共文章模版
    {
      path: '/article',
      name: 'article',
      component: () => import(/* webpackChunkName: "article" */ './views/article.vue')
    }
  ]
})
