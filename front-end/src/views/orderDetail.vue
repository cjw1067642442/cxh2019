<template lang="html">
  <div class="order-detail">
    <van-nav-bar
      title="订单详情"
      left-text=""
      left-arrow
      :border="false"
      @click-left="onClickLeft"
    />
    <div class="paid-time" flex>
      <div class="paid-time-tx">
        <template v-if="status==1">
          <div>等待买家付款</div>
          <div>剩 {{data.create_time | diffTime}} 自动关闭</div>
        </template>
        <template v-else-if="status==2">
          <div>您的包裹正整装待发</div>
          <div></div>
        </template>
        <template v-else-if="status==3">
          <div>卖家已发货</div>
          <div>还剩{{data.create_time | diffTime}}自动确认</div>
        </template>
        <template v-else-if="status==4">
          <div>交易成功</div>
          <div></div>
        </template>
      </div>
      <div class="paid-time-pic">
        <img src="" alt="">
      </div>
    </div>
    <!-- 地址 -->
    <div class="paid-addr" flex="cross:center">
      <span class="addr-icon"></span>
      <div class="addr-tx">
        <div>{{data.consignee}}</div>
        <div>{{data.shipping_address}}</div>
      </div>
    </div>
    <div class="card-content">
      <div flex="main:justify" class="card-res-box" v-for="prod in data.details">
        <div class="card-left" flex="dir:left">
          <img :src="prod.product_img" />
          <span>{{prod.product_title}}</span>
        </div>
        <div class="card-right" flex="dir:top">
          <span>{{prod.product_price}}</span>
          <span>x{{prod.quantity}}</span>
        </div>
      </div>
      <!-- 待付款 -->
      <template v-if="status>1">
        <div class="order-msg tx-c-999" flex="main:justify">
          <span>订单总额：</span>
          <span>¥{{data.total | rmb}}</span>
        </div>
        <div class="order-msg tx-c-999" flex="main:justify">
          <span>运费：</span>
          <span>¥{{data.freight | rmb}}</span>
        </div>
        <div class="order-msg tx-c-333" flex="main:justify">
          <span>返沉香果</span>
          <span>{{data.member_points}}个</span>
        </div>
      </template>
      <template v-else>
        <div class="order-msg tx-c-333" flex="main:justify">
          <span>订单总额：</span>
          <span>¥{{data.total | rmb}}</span>
        </div>
        <div class="order-msg tx-c-333" flex="main:justify">
          <span>返沉香果</span>
          <span>{{data.member_points}}个</span>
        </div>
        <div class="order-msg tx-c-333" flex="main:justify">
          <span>运费：</span>
          <span>¥{{data.freight | rmb}}</span>
        </div>
      </template>
    </div>
    <div class="order-time-detail" v-if="status>1">
      <div flex="cross:center"><i></i>订单信息</div>
      <!-- 待发货 -->
      <template v-if="status==2">
        <p>订单编号:&nbsp;&nbsp;{{data.order_no}}</p>
        <p>下单时间:&nbsp;&nbsp;{{data.create_time | time}}</p>
      </template>
      <!-- 卖家已发货-->
      <template v-else-if="status==3">
        <p>创建时间:&nbsp;&nbsp;{{data.create_time | time}}</p>
        <p>付款时间:&nbsp;&nbsp;{{data.payment_time | time}}</p>
        <p>发货时间:&nbsp;&nbsp;{{data.shipping_time | time}}</p>
      </template>
      <!-- 交易成功 -->
      <template v-else-if="status==4">
        <p>创建时间:&nbsp;&nbsp;{{data.create_time | time}}</p>
        <p>付款时间:&nbsp;&nbsp;{{data.payment_time | time}}</p>
        <p>发货时间:&nbsp;&nbsp;{{data.shipping_time | time}}</p>
      </template>
    </div>
    <div class="paid-footer" flex="dir:right cross:center">
      <!-- 待付款 -->
      <template v-if="status==1">
        <van-button class="card-btn orange-btn van-hairline--surround" size="small" :round="true" @click.stop="paid">付款</van-button>
        <van-button class="card-btn van-hairline--surround" size="small" :round="true" @click.stop='cancelOrder'>取消订单</van-button>
      </template>
      <!-- 待发货 -->
      <template v-else-if="status==2">
        <van-button class="card-btn orange-btn van-hairline--surround" size="small" :round="true" @click.stop="fixedOrder">修改订单</van-button>
        <van-button class="card-btn van-hairline--surround" size="small" :round="true" @click.stop='cancelOrder'>申请退款</van-button>
      </template>
      <!-- 待收货 -->
      <template v-else-if="status==3">
        <van-button class="card-btn orange-btn van-hairline--surround" size="small" :round="true" @click.stop="paid">确认收货</van-button>
        <van-button class="card-btn van-hairline--surround" size="small" :round="true" @click.stop='cancelOrder'>取消订单</van-button>
      </template>
      <!-- 已完成 -->
      <template v-else-if="status==4">
        <van-button class="card-btn orange-btn van-hairline--surround" size="small" :round="true" @click.stop="paid">修改订单</van-button>
        <van-button class="card-btn van-hairline--surround" size="small" :round="true" @click.stop='cancelOrder'>申请退款</van-button>
      </template>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'orderDetail',
    data () {
      return {
        // status: 0 全部, 1 待支付， 2 待发货，3 待收货，4 已完成, 5 已取消
        status: 1,
        goActive: '',
        data: {},
        cancelId: ''
      }
    },
    mounted () {
      this.goActive = this.$route.query.active
      this.$ajax
        .get(`/order/details?order_id=${this.$route.query.id}`)
        .then(({ data }) => {
          this.status = parseInt(data.status)
          this.data = data
        })
    },
    methods: {
      onClickLeft () {
        this.$router.push({
          name: 'myOrders',
          params: {
            active: this.goActive
          }
        })
      },
      cancelOrder () {
        this.cancelId = this.data.id
        this.$ajax
          .post('/order/cancel', {order_id: this.data.id})
          .then(({status, data, msg}) => {
            if (parseInt(status) === 1) {
              this.$dialog.alert({
                title: '成功',
                message: '订单取消成功'
              }).then(() => {
                this.onClickLeft()
              })
            } else {
              this.$dialog.alert({
                title: '提示',
                message: msg
              })
            }
          })
          .catch(err => {
            this.$dialog.alert({
              title: '失败',
              message: '请稍后重试'
            })
          })
      },
      // 修改订单
      fixedOrder () {

      },
      paid () {
        this.$router.push({
          name: 'payFor',
          query: {
            id: this.data.id
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .order-detail {
    height: 100%;
    background-color: #F2F2F3;


    .paid-time {
      height: 80px;
      background-color: #6D5F56;

      .paid-time-tx {
        padding: 16px 0 0 30px;

        div {
          color: #fff;

          &:first-child {
            line-height: 26px;
            font-size: 16px;
          }
          &:last-child {
            font-size: 12px;
            line-height: 14px;
            opacity: .7;
          }
        }
      }

      .paid-time-pic {
        height: 76px;
      }
    }
    .paid-addr {
      margin-bottom: 12px;
      padding: 0 15px;
      min-height: 60px;
      background-color: #fff;

      .addr-icon {
        margin-right: 12px;
        width: 27px;
        height: 27px;
        background: url('../assets/dizhi.png') no-repeat center center;
        background-size: 28px 28px;
      }

      .addr-tx {
        color: #3C3A39;
        line-height: 17px;
      }
    }

    .card-content {
      padding: 16px 15px 12px 16px;
      background-color: #fff;
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

    .order-msg {
      margin-bottom: 4px;
      line-height: 17px;
      height: 17px;


      &:last-child {
        margin: 0;
      }
    }
    .order-time-detail {
      box-sizing: border-box;
      margin-top: 10px;
      padding: 12px 0 11px 17px;
      height: 112px;
      background-color: #FFF;

      &>div {
        margin-bottom: 6px;
        height: 20px;
        font-size :14px;
        line-height: 20px;
        color: #333;

        i {
          position: relative;
          top: -1px;
          margin-right: 8px;
          display: inline-block;
          width: 2px;
          height: 13px;
          background: #D6454C;
        }
      }

      p {
        margin: 0 0 6px 0;
        height: 17px;
        line-height: 17px;
        color: #999;
      }
    }

    .paid-footer {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      padding-right: 15px;
      height: 50px;
      background-color: #FFF;
    }
  }
</style>
