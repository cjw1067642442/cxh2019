<template lang='html'>
  <div class='shopping-cart'>
    <van-nav-bar
      title='购物车'
      left-text=''
      left-arrow
      :border='false'
      @click-left='onClickLeft'
    />
    <div class='cart-list'>
      <div class='cart-item' flex='cross:center main:justify' v-for='prod in shoppingList' :key='prod.product_id'>
        <div class="check-box" :class="{'act-box': prod.selected}" @click="doSimgle(prod)"></div>
        <div flex='' class='cart-main'>
          <img :src='prod.product_img' alt=''/>
          <div class=''>
            <div class='tx-c-333'>{{prod.product_title}}</div>
            <div class='tx-c-red'>¥{{prod.product_price}}</div>
          </div>
        </div>
        <div class=''>
          <van-stepper
            v-model='prod.quantity'
            integer
            :min='1'
            :max='10000'
            :step='1' />
        </div>
      </div>
    </div>
    <div class="stopp-cart-footer" flex="main:justify cross:center">
      <div @click="selectAllPro" flex="cross:center">
        <span class="check-box tx-c-666" :class="{'act-box': selectAll}"></span>
        <span class="chk-label tx-c-666">全选</span>
      </div>
      <div flex="cross:center" class="no-wrap">
        <div class="com-msg tx-c-333">共{{allSelProdNum}}件商品&nbsp;合计：<strong class="tx-c-red">¥{{allSelMoney>0?allSelMoney:'0.00'}}</strong></div>
        <van-button size="large" class="settlement-btn van-hairline--surround" :round="true" @click="payfor">结算</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      selectAll: false,
      // 是否 是 取消 一个
      isSimgleOne: false,
      shoppingList: []
    }
  },
  mounted () {
    this.shoppingList = [{
      quantity: 1,
      product_id: 1,
      product_title: '\u4ea7\u54c1 001',
      product_price: '10.00',
      product_img: '',
      create_time: 1551507879,
      selected: false
    }, {
      quantity: 1,
      product_id: 2,
      product_title: '\u4ea7\u54c1 002',
      product_price: '1.00',
      product_img: '',
      create_time: 1551507939,
      selected: false
    }]
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    // 全选的情况  取消 其中一个
    doSimgle (prod) {
      if (!prod.selected && this.selectAll) {
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
    },
    // 付款
    payfor() {
      let selectedList = []
      this.shoppingList.forEach(card => {
        if (card.selected) {
          selectedList.push(card)
        }
      })
      //
      this.$store.commit('payfor', selectedList)
      this.$router.push({
        path: '/payment'
      })
    }
  },
  computed: {
    ...mapState({
      // 选择的商品列表
      selectedList: state => state.selectedList
    }),
    // 选择的商品数量
    allSelProdNum () {
      let result = 0;
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
      //
      this.$store.commit('changeAllMoney', allMoney)
      return allMoney
    }
  }
}
</script>

<style lang='scss' scoped>
.shopping-cart {
  box-sizing: border-box;
  height: 100%;
  padding-bottom: 50px;
  background: #F2F2F3;
}
.cart-list {
  padding: 15px;

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
  box-sizing: border-box;
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
