<template lang="html">
  <div class="redeem-reward">
    <van-nav-bar
      title='兑换'
      left-text=''
      left-arrow
      :border='false'
      @click-left='onClickLeft'
    />
    <div class="redeem-win">
      <div class="pos-to-cny">
        <div class="redeem-title tx-c-333 van-hairline--bottom" flex="cross:center main:center" @click.stop="onChangeCurrency">
          <template v-if="from_currency === 'ros'">
            <span>ROS(个)</span><i class="red-icon"></i><span>余额(元)</span>
          </template>
          <template v-else>
            <span>余额(元)</span><i class="red-icon"></i><span>ROS(个)</span>
          </template>
        </div>
        <div class="redeem-form van-hairline--bottom" flex="cross:center">
          <span class="form-labal">数量({{this.from_currency==='ros'?'ROS':'元'}})</span>
          <input flex-box="2" type="number" v-model="number" placeholder="请输入您要兑换的数量" />
        </div>
        <div class="redeem-dec">
          <p flex="cross:center main:justify">
            <span class="tx-c-666">当前汇率:</span>
            <span class="tx-c-333" v-if="this.from_currency==='ros'">1&nbsp;ROS&nbsp;=&nbsp;1&nbsp;元</span>
            <span class="tx-c-333" v-else>1&nbsp;元&nbsp;=&nbsp;1&nbsp;ROS</span>
          </p>
          <p flex="cross:center main:justify">
            <span class="tx-c-666">可用余额:</span>
            <span class="tx-c-666"><span class="tx-c-green">1000</span>&nbsp;{{this.from_currency==='ros'?'ROS':'元'}}</span>
          </p>
          <p flex="cross:center main:justify">
            <span class="tx-c-666">手续费:</span>
            <span class="tx-c-666"><span class="tx-c-red">3</span>&nbsp;{{this.to_currency==='ros'?'ROS':'元'}}</span>
          </p>
        </div>
        <div class="sub-btn-group">
          <van-button class="sub-button" :disabled="this.number-0<=0" @click="sureToChange">确认兑换</van-button>
        </div>
      </div>
    </div>
    <div class="redeem-list">
      <p class="van-hairline--bottom tx-c-333">兑换记录</p>
      <van-list
        class="history-win tx-c-999"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          class="his-item"
          v-for="item in history"
          :key="item.create_time"
        >
          <p class="tx-c-999">{{item.create_time | time}}</p>
          <div class="" flex="main:justify cross:center">
            <div flex="dir:top">
              <span class="tx-c-999">数量({{from_currency.toUpperCase()}})</span>
              <span>{{item.quantity}}</span>
            </div>
            <div flex="dir:top">
              <span class="tx-c-999">汇率</span>
              <span>1&nbsp;ROS&nbsp;=&nbsp;{{item.price}}&nbsp;元</span>
            </div>
            <div flex="dir:top" class="tx-right">
              <span class="tx-c-999">合计(元)</span>
              <span>{{(item.quantity * item.price).toFixed(2)}}</span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'redeem',
  data () {
    return {
      loading: false,
      finished: false,
      number: '',
      history: [],
      page: 1,
      from_currency: 'ros',
      to_currency: 'cny',
    }
  },
  mounted () {
    this.history = require('../../data-factory/redeemlist.json')
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onChangeCurrency () {
      let nowFrom = this.from_currency
      this.from_currency = this.to_currency
      this.to_currency = nowFrom
      this.page = 1
      this.loading = true
      this.finished = false
      this.onLoad()
    },
    onLoad () {
      this.$ajax
        .post('/user/currencyExchangeHis', {
          from_currency: this.from_currency,
          to_currency: this.to_currency,
          page: this.page
        })
        .then(({data, msg}) => {
          this.page++
          this.loading = false
          if (data.length === 0) this.finished = true
          this.history = [...this.history, ...data]
        })
        .catch(err => {
          this.$toast(JSON.stringify(err))
        })
    },
    sureToChange () {
      console.log({
        from_currency: this.from_currency,
        to_currency: this.to_currency,
        quantity: this.number
      });
      this.$ajax.post('/user/currencyExchange', {
        from_currency: this.from_currency,
        to_currency: this.to_currency,
        quantity: this.number
      })
      .then(({msg, data}) => {
        this.$toast(msg)
      })
    }
  },
  watch: {
    number (nVal) {
      if (!/^[0-9]+(\.[0-9]+)?$/g.test(nVal)) this.number = ''
    }
  }
}
</script>

<style lang="scss">
.redeem-reward {
  height: 100%;
  background-color: #F2F2F3;

  .redeem-win {
    height: 271px;
    background: #FFF;
  }
  .redeem-title {
    height: 50px;
    font-size: 16px;

    .red-icon {
      margin: 0 15px;
      width: 15px;
      height: 10px;
      background: url(../assets/redeem-icon.png) no-repeat center center;
      background-size: 15px 10px;
    }
  }
  .redeem-form {
    margin-bottom: 5px;
    padding: 0 20px;
    height: 60px;
    font-size: 16px;

    .form-labal {
      margin-right: 13px;
    }

    input {
      border: none;
    }
  }
  .redeem-dec {
    padding: 6px 20px 0;
    line-height: 17px;

    p {
      margin: 0 0 6px 0;
      margin-bottom: 6px;

      &>span {

      }
    }
  }
  .sub-btn-group {
    padding: 20px 18px 0;

    .sub-button {
      width: 100%;
      color: #FFF;
      font-size: 16px;
      text-align: center;
      background: #D6454C;
      border-radius: 5px;
    }
  }

  .redeem-list {
    margin-top: 6px;
    background-color: #FFF;
    &>p {
      margin: 0;
      padding-left: 15px;
      height: 40px;
      line-height: 40px;
    }
  }

  .history-win {
    padding: 0 15px;
    font-size: 14px;

    .his-item {
      p {
        font-size: 12px;
      }
    }
  }
}
</style>
