<template lang='html'>
  <div class='payment-page'>
    <van-nav-bar
      :title='msg'
      left-text=''
      left-arrow
      :border='false'
      @click-left='onClickLeft'
    />
    <!-- 地址 -->
    <div class="paid-addr" flex="cross:center">
      <img src="" alt="">
      <div class="addr-tx">
        <div>姚明</div>
        <div>广东省 深圳市 南山区 某某街道   某某小区10栋110号 </div>
      </div>
      <span class="arr-right">&gt;</span>
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
      </div>
    </div>
    <div class="stopp-cart-footer" flex="main:justify cross:center">
      <div flex="cross:center" class="no-wrap">
        <van-button size="large" class="settlement-btn van-hairline--surround" :round="true">结算</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      msg: '12312312'
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    // 全选的情况  取消 其中一个
    doSimgle (prod) {
      if (!prod.selected) {
        this.isSimgleOne = true
      } else {
        this.selectAll = false
      }
      prod.selected = !prod.selected

    },
    // 选择 或者 取消 全部
    selectAllPro (result) {
      this.selectAll = !this.selectAll
      if (!this.isSimgleOne) {
        this.shoppingList.forEach(item => {
          item.selected = this.selectAll
        })
      }
      this.isSimgleOne = false
    }
  },
  computed: {
    ...mapState({
      // 选择的商品列表
      selectedList: state => state.selectedList
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

<style lang='scss'>
.payment-page {
  height: 100%;
  padding-bottom: 50px;
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
    font-size: 22px;
    font-weight: 600;
    transform: scale3d(1,2,1);
    color: #D1D1D6;
  }
}
.cart-list {
  padding: 15px;
  height: 100%;
  background: #F2F2F3;

  .cart-item {
    box-sizing: border-box;
    margin-bottom: 10px;
    padding: 15px;
    border-radius: 6px;
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
  padding: 5px 15px;
  background-color: #FFF;

  .van-checkbox__label {
    color: #666;
  }
  strong {
    font-size: 14px;
  }
  .settlement-btn {
    margin-left: 9px;
  }
}
</style>
