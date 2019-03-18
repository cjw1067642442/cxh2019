<template lang='html'>
  <div class='shopping-cart'>
    <van-nav-bar
      title='购物车'
      left-text=''
      left-arrow
      :border='false'
      @click-left='onClickLeft'
    />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class='cart-list'>
        <div class='cart-item' flex='cross:center main:justify' v-for='prod in shoppingList' v-if="prod.quantity>0" :key='prod.product_id'>
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
            :min='0'
            :max='10000'
            @change="onChange(prod)"
            :step='1' />
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <div class="stopp-cart-footer" flex="main:justify cross:center">
      <div @click="selectAllPro" flex="cross:center">
        <span class="check-box tx-c-666" :class="{'act-box': selectAll}"></span>
        <span class="chk-label tx-c-666">全选</span>
      </div>
      <div flex="cross:center" class="no-wrap">
        <div class="com-msg tx-c-333">共{{allSelProdNum}}件&nbsp;合计：<strong class="tx-c-red">¥{{allSelMoney | rmb}}</strong></div>
        <van-button size="large" class="settlement-btn" :round="true" @click="payfor">结算</van-button>
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
      isLoading: false
      // shoppingList: []
    }
  },
  mounted () {
    this.getData()
    // this.$store.state.shoppingList = []
  },
  methods: {
    onClickLeft () {
      window.goBackNative()
      this.$router.go(-1)
    },
    onRefresh () {
      this.getData()
    },
    getData () {
      this.$ajax.get('/cart/index')
        .then(({status, data, msg}) => {
          if (parseInt(status) === 1) {
            data.forEach(item => (item.selected = false))
            this.$store.commit('updateShoppingCart', data)
          } else {
            this.$toast(msg)
          }
          this.loading = false
        })
        .catch(() => (this.loading = false))
    },
    onChange (prod, value) {
      if (prod.quantity === 0) {
        this.$dialog.confirm({
          title: '删除商品',
          message: '删除后需要重新添加到购物车'
        })
        .then(() => {
          this.$ajax.post('/cart/mod', {
            product_id: prod.product_id,
            quantity: prod.quantity,
            product_spec_id: prod.product_spec_id
          })
          .then(({status}) => {
            if (parseInt(status) === 1) {
              this.$toast('删除成功')
            }
          })
        })
        .catch(() => {
          prod.quantity = 1
        })
      } else {
        this.$ajax.post('/cart/mod', {
          product_id: prod.product_id,
          quantity: prod.quantity,
          product_spec_id: prod.product_spec_id
        })
      }
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
        this.$store.state.shoppingList.forEach(item => {
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
      if (selectedList.length === 0) {
        return this.$toast('请选择你要购买的物品')
      }
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
      selectedList: 'selectedList',
      shoppingList: 'shoppingList'
    }),
    // 选择的商品数量
    allSelProdNum () {
      let result = 0;
      this.$store.state.shoppingList.forEach(item => {
        if (item.selected) {
          result += parseInt(item.quantity)
        }
      })
      return result
    },
    // 选择的商品总价
    allSelMoney () {
      let allMoney = 0;
      this.$store.state.shoppingList.forEach(item => {
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
        margin-right: 8px;
        width: 80px;
        height: 88px;
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
