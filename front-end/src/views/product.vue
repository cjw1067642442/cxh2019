<template lang="html">
  <div class="product-detail scroll">
    <van-nav-bar
      title='商品详情'
      left-text=''
      left-arrow
      fixed
      :border='false'
      @click-left='onClickLeft'
    />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="prod-img">
        <van-swipe :autoplay="autoplay">
          <van-swipe-item v-for="(img, i) in productMsg.thumb" :key="i">
            <img :src="img" alt="">
          </van-swipe-item>
          <div slot="indicator"></div>
        </van-swipe>
      </div>
      <div class="prod-main marg-5-bottom">
        <div class="prod-name tx-c-333">{{productMsg.title}}</div>
        <div class="prod-price"><strong class="tx-c-red">¥{{productMsg.price | rmb}}</strong></div>
      </div>
      <div class="prod-dec marg-5-bottom" flex="cross:center">
        <span class="tx-c-999">说明:</span><span class="reword-icon">赠</span>&nbsp;&nbsp;<span class="tx-c-666">{{productMsg.member_points}}个沉香果</span>
      </div>
      <!-- <div class="prod-dec marg-5-bottom" flex="cross:center">
        <span class="tx-c-999">邮费:</span>&nbsp;&nbsp;<span class="tx-c-666">15元</span>
      </div> -->
    </van-pull-refresh>
    <div class="prod-nav">
      <van-tabs v-model="prodAct" :animated="true" :swipeable="true" :sticky="true">
        <van-tab title="图文详情">
          <div class="pic-detail" flex="dir:top">
            <img v-for="img in productMsg.details" v-lazy="img" />
          </div>
        </van-tab>
        <van-tab title="购买须知" v-html="purchaseNotes" class="purchase-notes"></van-tab>
      </van-tabs>
    </div>
    <!-- 底部购买 按钮 -->
    <van-row class="prod-btn-grop">
      <van-col span="4" flex="main:center">
        <router-link class="shop-cart-btn" to="/shoppingcart">
          <span class="order-num" v-if="orderNum">{{orderNum}}</span>
        </router-link>
      </van-col>
      <van-col span="10">
        <van-button class="cart-btn" @click.stop="addCard">加入购物车</van-button>
      </van-col>
      <van-col span="10">
        <van-button class="buy-btn" @click="buyNowFn">立即购买</van-button>
      </van-col>
    </van-row>
    <!-- 购买 选择尺寸 选择数量 窗口 -->
    <transition name="van-slide-up">
      <div class="select-win" v-show="buyNow">
        <span class="close-icon" @click.stop="buyNow = false">X</span>
        <div class="img-out-bg" flex="main:center cross:center">
          <img :src="productMsg.thumb[0]" alt="">
        </div>
        <div class="title-part">
          <div class="title-price"><strong class="tx-c-red">￥{{selectPrice ? selectPrice : productMsg.price}}</strong></div>
          <div class="condition-btn tx-c-333" flex="">
            <span>选择</span>
            <span v-for="spec in productMsg.spec">{{spec.name}}</span>
          </div>
        </div>
        <!-- 选择条件 -->
        <div class="condition-content">
          <div class="cond-spec" v-for="(spec, spIdx) in productMsg.spec">
            <p>{{spec.name}}</p>
            <div flex="">
              <span v-for="(v, idx) in spec.value" :class="{'sel-spec': v.selected}" @click.stop.prevent="selSpec(spIdx, v.id,spec.value,v)">{{v.key}}</span>
            </div>
          </div>
          <div class="cond-spec">
            <p>数量</p>
            <van-stepper v-model="selNum" />
          </div>
        </div>
        <div class="sure-btn">
          <van-button type="button" @click="goToPay">确认</van-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      autoplay: 0,
      isLoading: false,
      orderNum: 0,
      id: '',
      // 购买须知
      purchaseNotes: '',
      prodAct: '',
      buyNow: false,
      productMsg: {
        id: '',
        cate_id:'',
        title: '',
        thumb: [],
        details: [],
        price: '',
        price2: '',
        member_points: '',
        create_time: '',
        update_time: '',
        sort: '',
        stock: '',
        status: '',
        spec: [],
        spec_price: {}
      },
      selectPrice: '',
      selMark: [],
      selNum: 1,
      spec_length: 0,
      sureType: '', // buyNow:立即购买  addCard:添加购物车
    }
  },
  mounted () {
    this.getDetails()
    this.getOrderNum()
  },
  methods: {
    onClickLeft () {
      if (this.$route.query.come) {
        this.$router.push('/' + this.$route.query.come)
      } else {
        // 返回 原生
        window.goBackNative()
      }
      // this.$router.push('/myOrders')
    },
    init () {
      this.autoplay = 0
      this.orderNum = 0
    },
    onRefresh () {
      this.init()
      this.getOrderNum()
      this.getDetails()
    },
    getDetails () {
      this.$ajax
        .get('/product/details?id=' + this.$route.query.id)
        .then(({status, data, msg}) => {
          if (parseInt(status) === 1) {
            (this.productMsg = this.addSpecMark(data))
            this.autoplay = data.autoplay || 0
          } else {
            this.$toast.fail(msg)
          }
          this.isLoading = false
        })
        .catch(err => {
          this.loading = false
          this.$toast.fail(JSON.stringify(err))
        })
        this.$ajax.get('/article/shopNotice?id='+this.id)
          .then(({status, data, msg}) => {
            this.purchaseNotes = data.content || '暂无说明'
          })
    },
    // 购物车数量
    getOrderNum () {
      this.$ajax.get('/cart/')
        .then(({status, data, msg}) => {
          if (parseInt(status) === 1) {
            this.orderNum = data.length
          }
          this.isLoading = false
        })
    },
    addSpecMark (data) {
      // 设置规格 类别数量
      this.spec_length = data.spec.length
      // 给 规格添加标记
      if (data && data.spec.length > 0) {
        //
        data.spec.forEach(item => {
          item.value.forEach(key => {
            key.selected = false
          })
        })
      }
      return data
    },
    // 选择规格
    selSpec (idx, key, values, item) {
      // 取消 规格
      if (item.selected) {
        this.selectPrice = '---'
        this.selMark[idx] = ''
        item.selected = false
        return
      } else {
        this.selMark[idx] = key
      }
      if (this.selMark.length === this.spec_length) {

        if (this.productMsg.spec_price[this.selMark.join('_')]) {
          this.selectPrice = this.productMsg.spec_price[this.selMark.join('_')].price
        }
        else if (!this.selMark.join('_').match('__')) {
          this.selectPrice = '---'
          // item.selected = false
          this.$toast('暂时没有这个规格可选')
          // item.selected = false
        }
      }
      //
      let oldVal = item.selected
      values.forEach(item => (item.selected = false))
      item.selected = !oldVal
    },
    postAddProd () {
      this.$ajax.post('/cart/add', {
        product_id: this.productMsg.id,
        quantity: this.selNum,
        product_spec_id: this.productMsg.spec_price[this.selMark.join('_')].id
      })
      .then(({status, data, msg}) => {
        if (parseInt(status) === 1) {
          this.getOrderNum()
          this.buyNow = false
          this.$toast('商品添加成功')
        }
      })
    },
    // 加入购物车
    addCard () {
      this.sureType = 'addCard'
      this.buyNow = true
    },
    //
    buyNowFn () {
      this.sureType = 'buyNow'
      this.buyNow = true
    },
    // 选择完毕规格 确定
    goToPay () {
      if (this.selMark.join('_').match('__')) {
        return this.$toast('请选择规格')
      }
      // if (/(^_)|(_$)/.test(this.selMark.join('_'))) {
      //   this.$dialog({
      //     title: '错误',
      //     message: '网络繁忙，请返回上一页后重试.__'
      //   })
      //   .then(() => {
      //     this.onClickLeft()
      //   })
      // }
      if (this.sureType === 'addCard') {
        this.postAddProd()
      }
      // 立即购买
      else {
        if (!this.productMsg.spec_price[this.selMark.join('_')]) this.$toast('请选择完整规格')
        let orderMsg = {
          product_id: this.productMsg.id,
          product_title: this.productMsg.title,
          product_price: this.selectPrice,
          quantity: this.selNum,
          product_spec_id: this.productMsg.spec_price[this.selMark.join('_')].id,
          product_img: this.productMsg.thumb[0],
          spec: [...this.productMsg.spec_price[this.selMark.join('_')].key]
        }

        // 计算总价
        this.$store.commit('changeAllMoney', orderMsg.product_price * orderMsg.quantity)
        this.$store.commit('orderNow', orderMsg)
        this.$router.push({
          name: 'payment',
          query: {
            come: 'product'
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
.product-detail {
  height: 100%;
  background-color: #F2F2F3;

  .prod-img {
    padding-top: 46px;
    height: 375px;
    width: 100%;
    background-color: #ccc;

    .van-swipe {
      height: 100%;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      background-color: #6D5F56;
    }
  }
  .marg-5-bottom {
    margin-bottom: 5px;
  }
  .prod-main {
    box-sizing: border-box;
    padding: 12px 20px;
    min-height: 75px;
    background-color: #FFF;

    .prod-name {
      margin-bottom: 4px;
      line-height: 22px;
      font-size: 16px;
    }

    .prod-price {
      font-size: 18px;
    }
  }
  .prod-dec {
    box-sizing: border-box;
    height: 40px;
    padding: 12px 20px;
    background-color: #FFF;

    .reword-icon {
      margin-left: 12px;
      width: 20px;
      height: 16px;
      font-size: 10px;
      line-height: 18px;
      color: #FFF;
      text-align: center;
      border-radius: 4px;
      background-color: #D6454C;
    }
  }

  .prod-nav {
    padding-bottom: 60px;

    .pic-detail {
      img {
        width: 100%;
      }
    }
  }
  .purchase-notes {
    padding: 10px 20px;
    background-color: #fff;
  }
  .prod-btn-grop {
    position: fixed;
    left: 0;
    right: 0;
    bottom: -1px;
    z-index: 100;
    width: 100%;
    height: 50px;
    font-size: 16px;
    text-align: center;
    background-color: #FFF;

    .order-num {
      position: absolute;
      right: 5px;
      top: 5px;
      width: 20px;
      height: 20px;
      line-height: 18px;
      font-size: 10px;
      color: #FFF;
      background:  #D6454C;
      border-radius: 10px;
      transform: scale3d(.7,.7,.7);
    }

    .shop-cart-btn {
      position: relative;
      display: block;
      width: 55px;
      height: 50px;
      background: #fff url(../assets/shoppingcart-icon.png) no-repeat center center;
      background-size: 18px 18px;
    }

    .cart-btn, .buy-btn {
      width: 100%;
      height: 50px;
      color: #FFF;
      border: none;
      border-radius: 0;
    }

    .cart-btn {
      background: #3C3A39;
    }
    .buy-btn {
      background-color: #D6454C;
    }
  }
  .select-win {
    box-sizing: border-box;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    padding: 0 16px;
    min-height: 70%;
    background: #FFF;
    box-shadow: 0 0 20px 0px #ccc;

    .title-part {
      margin: 7px 0 0 137px;
    }
    .title-price {
      font-size: 18px;
    }
    .condition-btn {
      span  {
        margin-right: 12px;
      }
    }

    .condition-content {
      margin: 10px 0 0 0;
      padding: 0 0 20px 0;
      min-height: 300px;
      overflow-y: auto;
    }

    .close-icon {
      position: absolute;
      right: 15px;
      top: 31px;
      font-size: 16px;
      padding: 3px;
      color: rgba(0,0,0,0.1);
      transform: scale3d(1.4,1,1);
    }
    .img-out-bg {
      position: absolute;
      left: 16px;
      top: -43px;
      width: 100px;
      height: 100px;
      background: #FFF;
      border-radius: 5px;
    }

    img {
      width: 77px;
      height: 81px;
    }

    .sure-btn {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 50px;

      button {
        display: block;
        width: 100%;
        height: 100%;
        color: #FFF;
        font-size: 16px;
        text-align: center;
        border: none;
        background-color: #D6454C;
      }
    }
  }

  .condition-content {
    padding: 0 16px;

    .cond-spec {

      p {
        color: #333;
        line-height: 20px;
      }

      span {
        box-sizing: border-box;
        margin-right: 12px;
        display: inline-block;
        padding: 3px 9px;
        font-size: 10px;
        color: #999;
        border-radius: 2px;
        background-color: #F2F2F3;
      }
      .sel-spec {
        color: #FFF;
        background-color: #D6454C;
      }
    }
  }
}
</style>
