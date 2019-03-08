<template lang='html'>
  <div class='payment-page'>
    <van-nav-bar
      title='购物车'
      left-text=''
      left-arrow
      :border='false'
      @click-left='onClickLeft'
    />
    <!-- 地址 -->
    <div class="paid-addr" flex="cross:center main:justify">
      <div flex="cross:center main:justify">
        <img src="" alt="">
        <div class="addr-tx">
          <div>姚明</div>
          <div>广东省 深圳市 南山区 某某街道   某某小区10栋110号 </div>
        </div>
      </div>
      <span class="arr-right" @click="selAddr"><i class="van-icon van-icon-arrow-left van-nav-bar__arrow"></i></span>
    </div>
    <!-- 商品列表 -->
    <div class='cart-list'>
      <div class='cart-item' flex='cross:center main:justify' v-for='prod in selectedList' :key='prod.product_id'>
        <div flex='' class='cart-main'>
          <img :src='prod.product_img' alt=''/>
          <div class=''>
            <div class='tx-c-333'>{{prod.product_title}}</div>
            <div class='tx-c-red'>¥{{prod.product_price}}</div>
          </div>
        </div>
        <div class="cart-qua tx-c-666">x{{prod.quantity}}</div>
      </div>
    </div>
    <div class="stopp-cart-footer" flex="dir:right cross:center">
      <div flex="cross:center" class="no-wrap">
        <div class="tx-c-333">合计：<strong class="tx-c-red">¥{{allMoney | rmb}}</strong></div>
        <button type="button" name="button" class="sub-money-btn" @click="payforMoney">提交订单</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { mapState } from 'vuex'

export default {
  name: 'payment',
  data () {
    return {
      defaultAddr: {
        address: '',
        name: '',
        phone: '',
        region: '',
        region_id: '',
        is_default: ''
      }
    }
  },
  mounted () {
    this.defaultAddr = this.$router.params
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    payforMoney () {
      Toast(JSON.stringify(this.$store.state.selectedList))
    },
    selAddr () {
      this.$router.push({ path: '/address', query: { come: 'payment' } })
    }
  },
  computed: {
    ...mapState({
      // 选择的商品列表
      selectedList: state => state.selectedList,
      allMoney: state => state.allMoney
    }),
    // 选择的商品数量
    allSelProdNum () {
      let result = 0
      this.shoppingList.forEach(item => {
        if (item.selected) {
          result += item.quantity
        }
      })
      return result
    },
    // 选择的商品总价
    allSelMoney () {
      let allMoney = 0;
      this.shoppingList.forEach(item => {
        if (item.selected) {
          allMoney += parseFloat(item.product_price) * item.quantity
        }
      })
      return allMoney
    }
  }
}
</script>

<style lang='scss' scoped>
.payment-page {
  box-sizing: border-box;
  height: 100%;
  padding-bottom: 50px;
  background: #F2F2F3;
}
.paid-addr {
  margin-bottom: 12px;
  padding: 0 15px;
  min-height: 60px;
  background-color: #fff;

  img {
    margin-right: 12px;
    width: 27px;
    height: 27px;
    border: 1px solid #ccc;
  }
  .addr-tx {
    color: #3C3A39;
    line-height: 17px;
  }
  .arr-right {
    color: #D1D1D6;
    transform: rotateZ(180deg);
    .van-nav-bar__arrow {
      font-size: 20px;
    }
  }
}
.cart-list {
  padding: 15px 0;

  .cart-item {
    box-sizing: border-box;
    margin-bottom: 10px;
    padding: 15px;
    // border-radius: 6px;
    background: #FFF;

    .cart-main {

      img {
        box-sizing: border-box;
        margin-right: 13px;
        width: 86px;
        height: 90px;
        border: 1px solid #ccc;
      }
      &>div>div {
        &:first-child {
          margin-bottom: 6px;
          height: 21px;
          line-height: 20px;
          font-size: 15px;
        }
        &:last-child {
          height: 22px;
          line-height: 22px;
          font-size: 16px;
          font-weight: 500;
        }
      }
    }

    .cart-qua {
      position: relative;
      top: -5px;
    }
  }
}
.check-box {
  width: 20px;
  height: 20px;
  background: url(../assets/chk-def.png) center center no-repeat;
  background-size: 20px 20px;
}
.act-box {
  background-image: url(../assets/chk-act.png);
}
.chk-label {
  margin-left: 6px;
}
.stopp-cart-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  background-color: #FFF;

  .van-checkbox__label {
    color: #666;
  }
  strong {
    font-size: 14px;
  }

  .sub-money-btn {
    margin-left: 19px;
    width:120px;
    height:50px;
    font-size: 16px;
    color: #FFF;
    border: none;
    background:linear-gradient(90deg,rgba(255,137,85,1) 0%,rgba(214,69,76,1) 100%);
  }
}
</style>
