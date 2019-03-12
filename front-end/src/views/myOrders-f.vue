<template lang="html">
  <div class="my-orders">
    <van-nav-bar
      title='我的订单'
      left-text=''
      left-arrow
      :border='false'
      @click-left='onClickLeft'
    />
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
      <van-tabs
        v-model="active"
        @click="changeTab"
        :sticky="true"
        :line-width="25"
        :line-height="3"
        :swipeable="true"
        :fixed="true"
        color="#D6454C"
        title-inactive-color="#3C3A39"
        title-active-color="#D6454C"
        >
        <van-tab title="1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </van-tab>
        <van-tab title="2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </van-tab>
        <van-tab title="3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </van-tab>
      </van-tabs>
      <van-tabs
        v-model="active"
        @click="changeTab"
        :line-width="25"
        :line-height="3"
        :fixed="true"
        color="#D6454C"
        title-inactive-color="#3C3A39"
        title-active-color="#D6454C"
        :animated="true"
        >
        <!-- 全部 -->
        <van-tab :title="all.title">
        全部
        </van-tab>
        <!-- 待支付 -->
        <van-tab :title="toBePaid.title">
          待支付
        </van-tab>
        <!-- 待发货 -->
        <van-tab :title="toBeDelivered.title">
          待发货
        </van-tab>
        <!-- 待收货 -->
        <van-tab :title="pendingReceipt.title">
          待收货
        </van-tab>
        <!-- 已完成 -->
        <van-tab :title="completed.title">
        已完成
        </van-tab>
      </van-tabs>
    <!-- </van-pull-refresh> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      isLoading: false,
      // 列表加载
      loading: false,
      page: 1,
      finished: false,
      cancelingOrder: false,
      all: {
        title: '全部',
        list: []
      },
      toBePaid: {
        title: '待支付',
        list: []
      },
      toBeDelivered: {
        title: '待发货',
        list: []
      },
      pendingReceipt: {
        title: '待收货',
        list: []
      },
      completed: {
        title: '已完成',
        list: []
      }
    }
  },
  mounted () {
    if (this.$route.params.active) this.active = this.$route.query.active
    // 全部
    this.$ajax.post('/order/list', { status: this.active })
      .then(res => {
        this.all.list = [...res.data]
      })
      .catch(err => {
        this.$toast(JSON.stringify(err))
      })
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onRefresh () {
      this.loadloading = true
      this.changeTab(this.active)
      .then(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      })
    },
    onLoad () {
      this.getListData()
    },
    getType () {
      let type = ''
      switch (this.active) {
        case 1:
          type = 'toBePaid'
          break;
        case 2:
          type = 'toBeDelivered'
          break;
        case 3:
          type = 'pendingReceipt'
          break;
        case 4:
          type = 'completed'
          break;
        default:
          type = 'all'
      }
      return type
    },
    // 切换 状态
    changeTab () {
      this.loadloading = true
      this.page = 1
      let type = this.getType()
      this[type].list = []
      // status: 0 全部, 1 待支付， 2 代发货，3 代收货，4 已完成, 5 已取消
      return this.getListData()
    },
    getListData() {
      return this.$ajax.get(`/order/list?status=${this.active}&page=${this.page}`)
        .then(res => {
          let { data } = res
          this.page++
          this.loading = false
          if (data && data.length === 0) {
            this.finished = true
          }
          let type = this.getType()
          console.log(type);
          this[type].list = [...this[type].list, ...data]
        })
        .catch(err => {
          this.$toast(err + 'order/list')
        })
    },
    compQua (list) {
      let qua = 0
      if (list && list.length > 0) {
        list.forEach(item => {
          qua += parseInt(item.quantity)
        })
      }
      return qua
    },
    // 付款
    paid (card) {
      this.$router.push({
        name: 'payFor',
        query: {
          id: card.id
        }
      })
    },
    // 修改地址
    fixAddr (card) {
      this.$toast('修改地址' + card.title)
      this.$router.push({path: ''})
    },
    deleteOrder () {

    },
    // 取消订单
    cancelOrder (card) {
      this.cancelingOrder = true
      this.$ajax
        .post('/order/cancel',{ order_id: card.id })
        .then(({status, data, msg}) => {
          this.cancelingOrder = false
          if (parseInt(status) === 1) {
            card.status = 5
            this.$toast('订单取消成功')
          }
        })
        .catch(() => {
          this.cancelingOrder = false
        })
    },
    // 确认收货
    getRes (card) {
      this.$toast('确认收货' + card.id)
      this.$ajax.post('/order/completed', { order_id: card.id })
        .then(({status, msg}) => {
          if (parseInt(status) === 1) {

          }
          this.$toast(msg)
        })
    },
    deletedOrder (card) {
      this.$dialog.confirm({
        title: '确认删除订单',
        message: '删除之后无法再查看次订单'
      }).then(() => {

        this.$toast('删除订单' + card.id)
      }).catch(() => {
        // on cancel
      })
    },
    checkOrderDetail (card) {
      this.$router.push({
        name: 'orderDetail',
        query: {
          id: card.id,
          active: this.active
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .my-orders {
    box-sizing: border-box;
    padding: 0 0 52px 0;
    height: 100%;
    overflow-y: auto;
    background-color: #F2F2F3;

    .my-van-tab {
      padding: 0 15px;
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
    // .van-tabs__track {
    //   height: auto;
    // }
    // .van-tabs .van-tab__pane {
    //   flex-shrink: 1;
    // }
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
    line-height: 14px;
  }
  .card-content {
    margin: 12px 0 0 0;
  }
  .no-data {
    padding: 50px 0;
    text-align: center;
    font-size: 18px;
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
        color: #333333;
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
