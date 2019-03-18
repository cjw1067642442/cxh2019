<template lang="html">
  <div class="order-pay-for">
    <van-nav-bar
      title="交易明细"
      left-text=""
      left-arrow
      :border="false"
      @click-left="onClickLeft"
    />
    <div class="money-msg" flex="main:center cross:center dir:top">
      <p class="tx-c-333">订单总额</p>
      <div><strong class="tx-c-red">￥{{total | rmb}}</strong></div>
      <div>待付款</div>
    </div>
    <van-tabs
      :sticky="true"
      :line-width="25"
      :line-height="3"
      :swipeable="true"
      :fixed="true"
      color="#D6454C"
      @change="changeType"
      title-inactive-color="#3C3A39"
      title-active-color="#D6454C"
      :animated="false"
      class="pay-win">
      <van-tab v-for="pay in payMethod" :title="pay.pname">
        <template v-if="pay.type==='txt'">
          <div class="pay-msg" flex="dir:top">
            <div flex="">
              <span class="label">收款方户名</span><input type="text"  readonly flex-box="1" v-model="pay.name">
            </div>
            <div flex="">
              <span class="label">收款方开户行</span><input type="text" readonly flex-box="1" v-model="pay.bank">
            </div>
            <div flex="main:justify">
              <div>
                <span class="label">收款方账号</span>
                <span>{{pay.card_no}}</span>
                <input type="text" class="hide-inp" v-model="pay.card_no" readonly :id="'account'+pay.method" />
              </div>
              <button type="button" @click="copyAccount(pay.method)">复制</button>
            </div>
            <div flex="main:justify cross:center">
              <div>
                <span class="label">汇款时备注内容</span>
                <span class="tx-c-red">{{payment_no}}</span>
                <input type="text" class="hide-inp" v-model="payment_no" :id="'memo'+pay.method" />
              </div>
              <button type="button" @click="copyMemo(pay.method)">复制</button>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="pay-msg" flex="dir:top">
            <div class="img-pay" flex="main:center cross:center">
              <img :src="pay.img" alt="">
            </div>
            <div flex="main:justify cross:center">
              <div>
                <span class="label">汇款时备注内容</span>
                <span class="tx-c-red">{{payment_no}}</span>
                <input type="text" class="hide-inp" v-model="payment_no" :id="'memo'+pay.method" />
              </div>
              <button type="button" @click="copyMemo(pay.method)">复制</button>
            </div>
          </div>
        </template>
      </van-tab>
    </van-tabs>
    <div class="sure-pay-for" flex="cross:center">
      <van-button @click='surePayMoney'>确认付款</van-button>
    </div>
  </div>
</template>

<script>
function $(id) {
  return document.getElementById(id)
}
export default {
  data () {
    return {
      order_id: '',
      payMethod: {},
      payment_no: '',
      total: 0,
      selMethod: ''
    }
  },
  mounted () {
    this.order_id = this.$route.query.id
    this.$ajax.post('/order/paymentPrepare', { order_id: this.order_id })
      .then(({status, data, msg}) => {
        if (parseInt(status) === 1) {
          this.payMethod = [...data.payMethod]
          this.payment_no = data.payment_no
          this.total = data.total
          this.selMethod = this.payMethod[0].method
        }
        else {
          this.$toast(msg)
        }
      })
      .catch(err => {
        this.$toast(JSON.stringify(err))
      })
  },
  methods: {
    onClickLeft () {
      this.$router.push({
        path: '/myOrders'
      })
    },
    copyAccount (method) {
      let element = $('account' + method)
      element.select()
      document.execCommand("Copy")
      this.$toast('账号复制成功')
    },
    copyMemo (method) {
      let element = $('memo'+method)
      element.select()
      document.execCommand("Copy")
      this.$toast('备注复制成功')
    },
    changeType (active) {
      this.selMethod = this.payMethod[active].method
    },
    surePayMoney () {
      this.$ajax.post('/order/payConfirm',{
        order_id: this.order_id,
        method: this.selMethod
      })
      .then(({status, data, msg}) => {
        if (parseInt(status) === 1) {
          this.$dialog.alert({
            title: '成功',
            message: '订单已确认付款'
          })
          .then(() => {
            this.$router.push({
              path: 'myOrders',
              query: {
                active: 2
              }
            })
          })
        }
        else {
          let _msg = msg ? msg : '网络繁忙，请稍后重试'
          this.$toast(_msg)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.order-pay-for {
  height: 100%;
  background-color: #F2F2F3;

  .money-msg {
    box-sizing: border-box;
    padding: 16px 0;
    font-size: 14px;
    height: 110px;
    background-color: #FFF;
    p {
      margin: 0;
    }
    strong {
      line-height: 32px;
      font-size: 23px;
    }
    div:last-child {
      color: #FEC538;
    }
  }

  .pay-win {
    margin-top: 5px;
    padding-bottom: 55px;
  }
  .pay-msg {
    padding: 0 15px 50px 15px;
    font-size: 14px;
    background-color: #FFF;

    &>div {
      margin: 15px 0;
      line-height: 20px;
    }
    .img-pay {
      margin: 0;
      padding: 20px;

      img {
        width: 200px;
      }
    }

    .label {
      display: inline-block;
      color: #999;
      width: 106px;
    }
    input {
      border: none;
    }

    button {
      display: inline-block;
      width:40px;
      height:20px;
      line-height: 17px;
      color: rgba(125,166,226,1);
      font-size: 10px;
      text-align: center;
      white-space: nowrap;
      border:1px solid rgba(125,166,226,1);
      border-radius: 12px;
      background-color: #FFF;
    }
  }
  .sure-pay-for {
    box-sizing: border-box;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 10px;
    height: 50px;
    background: #FFF;

    button {
      width: 100%;
      color: #fff;
      border-radius: 6px;
      background-color: #D6454C;
    }
  }

  // .van-tabs__track {
  //   height: auto;
  //   .van-tab__pane {
  //     display: inline-block;
  //   }
  // }
}
</style>
