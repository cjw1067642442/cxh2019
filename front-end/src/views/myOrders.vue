<template lang="html">
  <div class="my-orders scroll" >
    <van-nav-bar
      title='我的订单'
      left-text=''
      left-arrow
      :border='false'
      @click-left='onClickLeft'
    />
      <van-tabs

        v-model="active"
        @change="changeTab"
        :sticky="true"
        :line-width="25"
        :line-height="3"
        :swipeable="true"
        :fixed="true"
        color="#D6454C"
        title-inactive-color="#3C3A39"
        title-active-color="#D6454C"
        :animated="false">
        <!-- 全部 -->
        <van-tab class="my-van-tab" :title="all.title" >
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :error.sync="error"
              error-text="请求失败，点击重新加载"
              :offset="listOffset"
              @load="onLoad"
              >
              <van-cell class="my-card" v-for="card in all.list" :key="card.id" @click.stop.prevent="checkOrderDetail(card)">
                <div class="card-title" flex="main:justify">
                  <span class="card-oid">订单编号:{{card.order_no}}</span>
                  <span v-if="card.status==1" class="not-completed-status">待支付</span>
                  <span v-else-if="card.status==2" class="not-completed-status">待发货</span>
                  <span v-else-if="card.status==3" class="not-completed-status">待收货</span>
                  <span v-else-if="card.status==4" class="completed-status">交易成功</span>
                  <span v-else class="tx-c-999">已取消</span>
                </div>
                <div class="card-content">
                  <div v-for="prod in card.details">
                    <div flex="main:justify" class="card-res-box">
                      <div class="card-left" flex="dir:left">
                        <img :src="prod.product_img" />
                        <span>{{prod.product_title}}</span>
                      </div>
                      <div class="card-right" flex="dir:top">
                        <span>{{prod.product_price}}</span>
                        <span>x{{prod.quantity}}</span>
                      </div>
                    </div>
                    <div class="tag-span">
                      <span v-for="spec in dealSpec(prod.product_spec)" >{{spec.value}}</span>
                    </div>
                  </div>
                </div>
                <div class="res-total tx-right">共{{compQua(card.details)}}件商品 合计: <strong>¥{{card.total}}</strong></div>
                <div class="card-footer tx-right" v-if="card.status==1">
                  <van-button class="card-btn van-hairline--surround" size="small" :round="true" @click.stop="cancelOrder(card)">取消订单</van-button>
                  <van-button class="card-btn orange-btn van-hairline--surround" size="small" :round="true" @click.stop="paid(card)">付款</van-button>
                </div>
                <div class="card-footer" flex="dir:right" v-else-if="card.status==3">
                  <van-button class="card-btn orange-btn van-hairline--surround" size="small" :round="true" @click.stop="fixAddr(card)">确认收货</van-button>
                </div>
              </van-cell>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <!-- 待支付 -->
        <van-tab class="my-van-tab" :title="toBePaid.title">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :error.sync="error"
              error-text="请求失败，点击重新加载"
              :offset="listOffset"
              @load="onLoad"
              >
              <van-cell class="my-card" v-for="card in toBePaid.list" :key="card.id" @click.stop.prevent="checkOrderDetail(card)" v-if="card.status == 1">
                <div class="card-title" flex="main:justify">
                  <span class="card-oid">订单编号:{{card.order_no}}</span>
                  <span class="not-completed-status">待支付</span>
                </div>
                <div class="card-content">
                  <div v-for="prod in card.details">
                    <div flex="main:justify" class="card-res-box" >
                      <div class="card-left" flex="dir:left">
                        <img :src="prod.product_img" />
                        <span>{{prod.product_title}}</span>
                      </div>
                      <div class="card-right" flex="dir:top">
                        <span>{{prod.product_price}}</span>
                        <span>x{{prod.quantity}}</span>
                      </div>
                    </div>
                    <div class="tag-span">
                      <span v-for="spec in dealSpec(prod.product_spec)">{{spec.value}}</span>
                    </div>
                  </div>
                </div>
                <div class="res-total tx-right">共{{compQua(card.details)}}件商品 合计: <strong>¥{{card.total}}</strong></div>
                <div class="card-footer tx-right">
                  <!-- <van-button class="card-btn van-hairline--surround" size="small" :round="true" @click.stop="fixAddr(card)">修改地址</van-button> -->
                  <van-button class="card-btn van-hairline--surround" size="small" :disabled="cancelingOrder" :round="true" @click.stop="cancelOrder(card)">取消订单</van-button>
                  <van-button class="card-btn orange-btn van-hairline--surround" to="/detail" size="small" :round="true" >付款</van-button>
                </div>
              </van-cell>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <!-- 待发货 -->
        <van-tab class="my-van-tab" :title="toBeDelivered.title">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                :error.sync="error"
                error-text="请求失败，点击重新加载"
                :offset="listOffset"
                @load="onLoad"
                >
                <van-cell class="my-card" v-for="card in toBeDelivered.list" :key="card.id" @click.stop.prevent="checkOrderDetail(card)">
                  <div class="card-title" flex="main:justify">
                    <span class="card-oid">订单编号:{{card.order_no}}</span>
                    <span class="not-completed-status">买家已付款</span>
                  </div>
                  <div class="card-content">
                    <div v-for="prod in card.details">
                      <div flex="main:justify" class="card-res-box">
                        <div class="card-left" flex="dir:left">
                          <img :src="prod.product_img" />
                          <span>{{prod.product_title}}</span>
                        </div>
                        <div class="card-right" flex="dir:top">
                          <span>{{prod.product_price}}</span>
                          <span>x{{prod.quantity}}</span>
                        </div>
                      </div>
                      <div class="tag-span">
                        <span v-for="spec in dealSpec(prod.product_spec)">{{spec.value}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="res-total tx-right">共{{compQua(card.details)}}件商品 合计: <strong>¥{{card.total}}</strong></div>
                </van-cell>
              </van-list>
          </van-pull-refresh>
        </van-tab>
        <!-- 待收货 -->
        <van-tab class="my-van-tab" :title="pendingReceipt.title">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :error.sync="error"
              error-text="请求失败，点击重新加载"
              :offset="listOffset"
              @load="onLoad"
              >
              <van-cell class="my-card" v-for="card in pendingReceipt.list" :key="card.id" @click.stop.prevent="checkOrderDetail(card)">
                <div class="card-title" flex="main:justify">
                  <span class="card-oid">订单编号:{{card.order_no}}</span>
                  <span class="not-completed-status">待收货</span>
                </div>
                <div class="card-content">
                  <div v-for="prod in card.details"  v-if="prod.status==4">
                    <div flex="main:justify" class="card-res-box">
                      <div class="card-left" flex="dir:left">
                        <img :src="prod.product_img" />
                        <span>{{prod.product_title}}</span>
                      </div>
                      <div class="card-right" flex="dir:top">
                        <span>{{prod.product_price}}</span>
                        <span>x{{prod.quantity}}</span>
                      </div>
                    </div>
                    <div class="tag-span">
                      <span v-for="spec in dealSpec(prod.product_spec)">{{spec.value}}</span>
                    </div>
                  </div>
                </div>
                <div class="res-total tx-right">共{{compQua(card.details)}}件商品 合计: <strong>¥{{card.total}}</strong></div>
                <div class="card-footer tx-right">
                  <van-button class="card-btn orange-btn van-hairline--surround" size="small" :round="true" @click.stop="getRes(card)">确认收货</van-button>
                </div>
              </van-cell>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <!-- 已完成 -->
        <van-tab class="my-van-tab" :title="completed.title">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :error.sync="error"
              error-text="请求失败，点击重新加载"
              :offset="listOffset"
              @load="onLoad"
              >
              <van-cell class="my-card" v-for="card in completed.list" :key="card.id" @click.stop.prevent="checkOrderDetail(card)">
                <div class="card-title" flex="main:justify">
                  <span class="card-oid">订单编号:{{card.order_no}}</span>
                  <span class="completed-status">交易成功</span>
                </div>
                <div class="card-content">
                  <div v-for="prod in card.details"  v-if="prod.status==4">
                    <div flex="main:justify" class="card-res-box">
                      <div class="card-left" flex="dir:left">
                        <img :src="prod.product_img" />
                        <span>{{prod.product_title}}</span>
                      </div>
                      <div class="card-right" flex="dir:top">
                        <span>{{prod.product_price}}</span>
                        <span>x{{prod.quantity}}</span>
                      </div>
                    </div>
                    <div class="tag-span">
                      <span v-for="spec in dealSpec(prod.product_spec)">{{spec.value}}</span>
                    </div>
                  </div>
                </div>
                <div class="res-total tx-right">共{{compQua(card.details)}}件商品 合计: <strong>¥{{card.total}}</strong></div>
                <div class="card-footer tx-right">
                  <!-- <van-button class="card-btn van-hairline--surround" size="small" :round="true" @click.stop="deletedOrder(card)">删除订单</van-button> -->
                </div>
              </van-cell>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
  </div>
</template>

<script>
import mixins from '../mixin/index.js'

export default {
  data () {
    return {
      active: 0,
      isLoading: false,
      // 列表加载
      loading: false,
      error: false,
      page: 1,
      finished: false,
      cancelingOrder: false,
      listOffset: 400,
      all: {
        title: '全部',
        list: [],
      },
      toBePaid: {
        title: '待支付',
        list: [],
      },
      toBeDelivered: {
        title: '待发货',
        list: [],
      },
      pendingReceipt: {
        title: '待收货',
        list: [],
      },
      completed: {
        title: '已完成',
        list: [],
      },
      tabType: ''
    }
  },
  mixins: [mixins],
  beforeMount() {
    if (this.$route.query.active) this.active = parseInt(this.$route.query.active)
    if (this.$route.params.active) this.active = parseInt(this.$route.params.active)
    this.tabType = this.getType()
    this[this.tabType].finished = false
  },
  mounted () {
    this.changeTab()
  },
  methods: {
    onClickLeft () {
      window.goBackNative()
    },
    initData () {
      let type = this.getType()
      this.tabType = type
      this.page = 1
      this.loading = false
      this.finished = false
      this[type].list.length = 0
    },
    onRefresh () {
      this.initData()
      this.getListData(this.active)
        .then(() => {
          this.$toast('刷新成功')
          this.isLoading = false
        })
    },
    onLoad (change) {
      if (this.page === 1 && !change) return
      this.getListData()
    },
    getType () {
      let type = ''
      switch (this.active) {
        case 0:
          type = 'all'
          break;
        case 1:
          type = 'toBePaid'
          break;
        case 2:
          type = 'toBeDelivered'
          break;
        case 3:
          type = 'pendingReceipt'
          break;
        default:
          type = 'completed'
      }
      return type
    },
    // 切换 状态
    changeTab () {
      this.initData()
      /* !!!千万不要干掉这个参数 会出现严重 bug */
      this.onLoad('changeTab')
    },
    getListData() {
      return this.$ajax.get(`/order/list?status=${this.active}&page=${this.page}`)
        .then(({status, data, msg}) => {
          if (parseInt(status) === 1) {
            // let { data } = res
            this.page++
            if (data && data.length === 0) {
              this.finished = true
            }
            this[this.tabType].list = [...this[this.tabType].list, ...data]
          }
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          this.error = true
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
            card.status = data.status
          }
          this.$toast(msg)
        })
    },
    // // 处理规格
    // dealSpec (jsonStr) {
    //   console.log(jsonStr);
    //   let result = []
    //   try {
    //     result = JSON.parse(jsonStr)
    //   } catch (e) {
    //     this.$toast(e)
    //   }
    //   return result
    // },
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
