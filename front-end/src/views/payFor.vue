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
    <div class="pay-msg" flex="dir:top">
      <div flex="">
        <span class="label">收款方户名</span><input type="text"  readonly flex-box="1" v-model="name">
      </div>
      <div flex="">
        <span class="label">收款方开户行</span><input type="text" readonly flex-box="1" v-model="bank">
      </div>
      <div flex="main:justify">
        <div>
          <span class="label">收款方账号</span>
          <span>{{card_no}}</span>
          <input type="text" class="hide-inp" v-model="card_no" readonly ref="account" />
        </div>
        <button type="button" @click.stop="copyAccount">复制</button>
      </div>
      <div flex="main:justify">
        <div>
          <span class="label">汇款时备注内容</span>
          <span class="tx-c-red">{{payment_no}}</span>
          <input type="text" class="hide-inp" v-model="payment_no" ref="memo" />
        </div>
        <button type="button" @click.stop="copyMemo">复制</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      bank: '',
      card_no: '',
      payment_no: '',
      total: 0
    }
  },
  mounted () {
    this.$ajax.post('/order/paymentPrepare', { order_id: this.$route.query.id })
      .then(({status, data, msg}) => {
        if (parseInt(status) === 1) {
          this.name = data.name
          this.bank = data.bank
          this.card_no = data.card_no
          this.payment_no = data.payment_no
          this.total = data.total
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
    copyAccount () {
      this.$refs.account.select()
      document.execCommand("Copy")
      this.$toast('账号复制成功')
    },
    copyMemo () {
      this.$refs.memo.select()
      document.execCommand("Copy")
      this.$toast('备注复制成功')
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
  .pay-msg {
    margin-top: 5px;
    padding: 0 15px;
    font-size: 14px;
    background-color: #FFF;

    &>div {
      margin: 15px 0;
      line-height: 20px;
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
      border:1px solid rgba(125,166,226,1);
      border-radius: 12px;
      background-color: #FFF;
    }
  }
}
</style>
