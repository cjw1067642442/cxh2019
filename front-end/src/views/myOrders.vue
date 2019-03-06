<template lang="html">
  <div class="my-orders">
    <van-tabs
      v-model="active"
      @click="changeTab"
      :sticky="true"
      :line-width="25"
      :line-height="3"
      :swipeable="true"
      color="#D6454C"
      title-inactive-color="#3C3A39"
      title-active-color="#D6454C"
      :animated="true">
      <!-- 全部 -->
      <van-tab class="my-van-tab" :title="all.title">
        <div class="my-card" v-for="card in all.details">
          <div class="card-title" flex="main:justify">
            <span class="card-oid">订单编号:{{card.id}}</span>
            <span v-if="card.status==0" class="not-completed-status">待支付</span>
            <span v-else-if="card.status==1" class="not-completed-status">待发货</span>
            <span v-else-if="card.status==2" class="not-completed-status">待收货</span>
            <span v-else-if="card.status==3" class="completed-status">交易成功</span>
          </div>
          <div class="card-content">
            <div flex="main:justify" class="card-res-box" v-for="i in 2">
              <div class="card-left" flex="dir:left">
                <img :src="card.thumb" />
                <span>{{card.title}}</span>
              </div>
              <div class="card-right" flex="dir:top">
                <span>{{card.price}}</span>
                <span>x{{card.num}}</span>
              </div>
            </div>
          </div>
          <div class="res-total tx-right">共2件商品 合计: <strong>¥2,300</strong></div>
          <div class="card-footer tx-right" v-if="card.status==0">
            <van-button class="card-btn van-hairline--surround" size="small" :round="true" @click.stop="fixAddr(card)">修改地址</van-button>
            <van-button class="card-btn van-hairline--surround" size="small" :round="true" @click.stop="cancelOrder(card)">取消订单</van-button>
            <van-button class="card-btn orange-btn van-hairline--surround" size="small" :round="true" @click.stop="paid(card)">付款</van-button>
          </div>
          <div class="card-footer" flex="dir:right" v-else-if="card.status==2">
            <van-button class="card-btn orange-btn van-hairline--surround" size="small" :round="true" @click.stop="fixAddr(card)">确认收货</van-button>
          </div>
        </div>
      </van-tab>
      <!-- 待支付 -->
      <van-tab class="my-van-tab" :title="toBePaid.title">
        <div class="my-card" v-for="card in toBePaid.details">
          <div class="card-title" flex="main:justify">
            <span class="card-oid">订单编号:{{card.id}}</span>
            <span class="not-completed-status">待支付</span>
          </div>
          <div class="card-content">
            <div flex="main:justify" class="card-res-box" v-for="i in 2">
              <div class="card-left" flex="dir:left">
                <img :src="card.thumb" />
                <span>{{card.title}}</span>
              </div>
              <div class="card-right" flex="dir:top">
                <span>{{card.price}}</span>
                <span>x{{card.num}}</span>
              </div>
            </div>
          </div>
          <div class="res-total tx-right">共2件商品 合计: <strong>¥2,300</strong></div>
          <div class="card-footer tx-right">
            <van-button class="card-btn van-hairline--surround" size="small" :round="true" @click.stop="fixAddr(card)">修改地址</van-button>
            <van-button class="card-btn van-hairline--surround" size="small" :round="true" @click.stop="cancelOrder(card)">取消订单</van-button>
            <van-button class="card-btn orange-btn van-hairline--surround" to="/detail" size="small" :round="true" >付款</van-button>
          </div>
        </div>
      </van-tab>
      <!-- 待发货 -->
      <van-tab class="my-van-tab" :title="toBeDelivered.title">
        <div class="my-card" v-for="card in toBeDelivered.details">
          <div class="card-title" flex="main:justify">
            <span class="card-oid">订单编号:{{card.id}}</span>
            <span class="not-completed-status">买家已付款</span>
          </div>
          <div class="card-content">
            <div flex="main:justify" class="card-res-box" v-for="i in 2">
              <div class="card-left" flex="dir:left">
                <img :src="card.thumb" />
                <span>{{card.title}}</span>
              </div>
              <div class="card-right" flex="dir:top">
                <span>{{card.price}}</span>
                <span>x{{card.num}}</span>
              </div>
            </div>
          </div>
          <div class="res-total tx-right">共2件商品 合计: <strong>¥2,300</strong></div>
        </div>
      </van-tab>
      <!-- 待收货 -->
      <van-tab class="my-van-tab" :title="pendingReceipt.title">
        <div class="my-card" v-for="card in pendingReceipt.details">
          <div class="card-title" flex="main:justify">
            <span class="card-oid">订单编号:{{card.id}}</span>
            <span class="not-completed-status">待收货</span>
          </div>
          <div class="card-content">
            <div flex="main:justify" class="card-res-box" v-for="i in 2">
              <div class="card-left" flex="dir:left">
                <img :src="card.thumb" />
                <span>{{card.title}}</span>
              </div>
              <div class="card-right" flex="dir:top">
                <span>{{card.price}}</span>
                <span>x{{card.num}}</span>
              </div>
            </div>
          </div>
          <div class="res-total tx-right">共2件商品 合计: <strong>¥2,300</strong></div>
          <div class="card-footer tx-right">
            <van-button class="card-btn orange-btn van-hairline--surround" size="small" :round="true" @click.stop="getRes(card)">确认收货</van-button>
          </div>
        </div>
      </van-tab>
      <!-- 已完成 -->
      <van-tab class="my-van-tab" :title="completed.title">
        <div class="my-card" v-for="card in completed.details">
          <div class="card-title" flex="main:justify">
            <span class="card-oid">订单编号:{{card.id}}</span>
            <span class="completed-status">交易成功</span>
          </div>
          <div class="card-content">
            <div flex="main:justify" class="card-res-box" v-for="i in 2">
              <div class="card-left" flex="dir:left">
                <img :src="card.thumb" />
                <span>{{card.title}}</span>
              </div>
              <div class="card-right" flex="dir:top">
                <span>{{card.price}}</span>
                <span>x{{card.num}}</span>
              </div>
            </div>
          </div>
          <div class="res-total tx-right">共2件商品 合计: <strong>¥2,300</strong></div>
          <div class="card-footer tx-right">
            <van-button class="card-btn van-hairline--surround" size="small" :round="true" @click.stop="deletedOrder(card)">删除订单</van-button>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <van-button @click="getImgs">cart</van-button>
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant'
export default {
  data () {
    return {
      active: 0,
      all: {
        title: '全部',
        details: []
      },
      toBePaid: {
        title: '待支付',
        details: []
      },
      toBeDelivered: {
        title: '待发货',
        details: []
      },
      pendingReceipt: {
        title: '待收货',
        details: []
      },
      completed: {
        title: '已完成',
        details: []
      }
    }
  },
  mounted () {
    const img = require('../assets/xnk.png')
    let oog = ['all', 'toBePaid', 'toBeDelivered', 'pendingReceipt', 'completed']
    oog.forEach(name => {
      let status = ''

      switch (name) {
        case 'toBePaid':
          status = 0
          break
        case 'toBeDelivered':
          status = 1
          break
        case 'pendingReceipt':
          status = 2
          break
        case 'completed':
          status = 3
          break
        default:
          status = ''
      }

      for (let i = 0; i < 8; i++) {
        let rand = Math.floor(Math.random() * 10 + 1) + ''
        this[name].details.push({
          id: '2019010110101021321',
          num: 2,
          tag: '标签' + i,
          price: rand + '.00',
          desc: this[name].title,
          title: '商品标题 ' + i + '--' + name,
          thumb: process.env.NODE_ENV === 'production' ? '/imgs/xnk.png' : img,
          // 0 待支付, 1 待发货， 2  待收货， 3 已完成
          status: name === 'all' ? parseInt(Math.random() * 4, 10) : status
        })
      }
    })
  },
  methods: {
    // 切换 状态
    changeTab (status, title) {
      // status: 0 全部, 1 待支付， 2 代发货，3 代收货，4 已完成, 5 已取消
      this.$ajax.get(`/order/list?status=${status}`)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          Toast(err + '1')
        })
    },
    getImgs () {
      this.$ajax.get('/order/list')
        .then(res => {
          console.log(res);
        })
    },
    // 付款
    paid (card) {
      Toast('付款' + card.title)
    },
    // 修改地址
    fixAddr (card) {
      Toast('修改地址' + card.title)
    },
    cancelOrder (card) {
      Toast('取消订单' + card.id)
    },
    // 确认收货
    getRes (card) {
      Toast('确认收货' + card.id)
    },
    deletedOrder (card) {
      Dialog.confirm({
        title: '确认删除订单',
        message: '删除之后无法再查看次订单'
      }).then(() => {
        Toast('删除订单' + card.id)
      }).catch(() => {
        // on cancel
      })
    }
  }
}
</script>

<style lang="scss">
  .my-orders {
    padding: 0 0 52px 0;

    .my-van-tab {
      padding: 0 15px;
      background-color: #F2F2F3;
    }
    .my-card {
      margin: 10px 0;
      padding: 12px;
      border-radius: 6px;
      background-color: #FFF;
    }

    .van-tab {
      flex-basis: 20%!important;
      font-size: 16px;
    }
  }
  .card-oid {
    color: #999999;
  }
  .not-completed-status {
    color: #D6454C;
  }
  .completed-status {
    color: #60A50E;
  }
  .card-status-c {

  }
  .card-title {
    line-height: 12px;
  }
  .card-content {
    margin: 12px 0 0 0;
  }
  .card-res-box {
    margin-bottom: 20px;
    color: #333333;

    &:last-child {
      margin-bottom: 14px;
    }

    .card-left {
      img {
        width: 48px;
        height: 50px;
        margin-right: 14px;
      }
      span {
        color: #333333FF;
      }
    }
    .card-right {
      span {
        &:first-child {
          margin-bottom: 8px;
        }
        &:last-child {
          font-size: 10px;
          color: #999999;
        }
      }
    }
  }
  .card-footer {
    margin-top: 9px;
  }
  .res-total {

  }
</style>
