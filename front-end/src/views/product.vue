<template lang="html">
  <div class="product-detail">
    <van-nav-bar
      title='商品详情'
      left-text=''
      left-arrow
      fixed
      :border='false'
      @click-left='onClickLeft'
    />
    <div class="prod-img">
      <van-swipe :autoplay="autoplay">
        <van-swipe-item v-for="(img, i) in imgsList" :key="i">
          <img src="img" alt="">
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
    <div class="prod-dec marg-5-bottom" flex="cross:center">
      <span class="tx-c-999">邮费:</span>&nbsp;&nbsp;<span class="tx-c-666">15元</span>
    </div>
    <div class="prod-nav">
      <van-tabs v-model="prodAct" :animated="true" :swipeable="true" :sticky="true">
        <van-tab title="图文详情">
          <div class="pic-detail" flex="dir:top">
            <img v-for="img in decPicList" :src="img" alt="">
          </div>
        </van-tab>
        <van-tab title="购买须知" v-html="purchaseNotes" class="purchase-notes"></van-tab>
      </van-tabs>
    </div>
    <!-- 底部购买 按钮 -->
    <van-row class="prod-btn-grop">
      <van-col span="4" flex="main:center">
        <router-link class="shop-cart-btn" to="/shoppingcart"></router-link>
      </van-col>
      <van-col span="10">
        <van-button class="cart-btn">加入购物车</van-button>
      </van-col>
      <van-col span="10">
        <van-button class="buy-btn" @click="buyNow = true">立即购买</van-button>
      </van-col>
    </van-row>
    <!-- 购买 选择尺寸 选择数量 窗口 -->
    <transition name="van-slide-up">
      <div class="select-win" v-show="buyNow">
        <span class="close-icon" @click.stop="buyNow = false">X</span>
        <div class="img-out-bg" flex="main:center cross:center">
          <img src="" alt="">
        </div>
        <div class="title-part">
          <div class="title-price"><strong class="tx-c-red">￥700</strong></div>
          <div class="condition-btn tx-c-333" flex="">
            <span>选择</span>
            <span>尺寸</span>
            <span>颜色分类</span>
          </div>
        </div>
        <!-- 选择条件 -->
        <div class="condition-content">
          这里是条件
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
      img: '',
      autoplay: 0,
      imgsList: ['/jjs.png'],
      // 购买须知
      purchaseNotes: '<p>这里是购买须知</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>这里是购买须知</p><p>这里是购买须知</p><p>这里是购买须知</p>',
      prodAct: '',
      decPicList: [],
      buyNow: false,
      productMsg: {
        id:'2',
        cate_id:'3',
        title:'\u4ea7\u54c12',
        thumb:'',
        details:'',
        price:'23.00',
        price2:'0.0 0',
        member_points:'10',
        create_time:'0',
        update_time:'0',
        sort:'0',
        stock:'100',
        status:'1'
      }
    }
  },
  methods: {
    onClickLeft () {
      // 返回列表页
      this.$router.push('/myOrders')
    },
    goToPay () {

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
      height: 100%;
      background-color: #ff3760;
    }
  }
  .marg-5-bottom {
    margin-bottom: 5px;
  }
  .prod-main {
    box-sizing: border-box;
    padding: 12px 20px;
    height: 75px;
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

    .shop-cart-btn {
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
    height: 300px;
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
      background: green;
      border-radius: 5px;
    }

    img {
      width: 77px;
      height: 81px;
      border: 1px solid #ccc;
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
}
</style>
