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
      <div class="prod-name tx-c-333">加里曼丹沉香制荷和摆件</div>
      <div class="prod-price"><strong class="tx-c-red">¥700.00</strong></div>
    </div>
    <div class="prod-dec marg-5-bottom" flex="cross:center">
      <span class="tx-c-999">说明:</span><span class="reword-icon">赠</span>&nbsp;&nbsp;<span class="tx-c-666">139个沉香果</span>
    </div>
    <div class="prod-dec marg-5-bottom" flex="cross:center">
      <span class="tx-c-999">邮费:</span>&nbsp;&nbsp;<span class="tx-c-666">15元</span>
    </div>
    <div class="prod-nav">
      <van-tabs v-model="prodAct">
        <van-tab title="图文详情">
          <div class="pic-detail" flex="dir:top">
            <img v-for="img in decPicList" :src="img" alt="">
          </div>
        </van-tab>
        <van-tab title="购买须知">
          购买须知
        </van-tab>
      </van-tabs>
    </div>
    <div class="prod-btn-grop" flex="main:justify">
      <div class="shop-cart-btn"></div>
      <van-button class="cart-btn">加入购物车</van-button>
      <van-button class="buy-btn">立即购买</van-button>
    </div>
    <div class="select-win">
      <div>
        <img src="" alt="">
      </div>
      <!-- 选择条件 -->
      <div></div>
      <div class="sure-btn">
        <button type="button">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
const img = require('../assets/xnk.png')
export default {
  data () {
    return {
      img: '',
      autoplay: 0,
      imgsList: ['/jjs.png', '/jjsh.png'],
      prodAct: '',
      decPicList: [img,img,img,img]
    }
  },
  methods: {
    onClickLeft() {
      console.log(111);
    }
  }
}
</script>

<style lang="scss">
.product-detail {
  height: 100%;
  background-color: #F2F2F3;

  .van-nav-bar {
    background-color: rgba(0,0,0,0);
  }

  .prod-img {
    height: 366px;
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
      line-height: 16px;
      color: #FFF;
      text-align: center;
      border-radius: 4px;
      background-color: #D6454C;
    }
  }
  .prod-btn-grop {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    height: 50px;
    font-size: 16px;
    text-align: center;

    .shop-cart-btn {
      width: 55px;
      background: #fff url(../assets/shoppingcart-icon.png) no-repeat center center;
      background-size: 18px 18px;
    }

    .cart-btn, .buy-btn {
      width: 160px;
      height: 100%;
      color: #FFF;
      border: none;
      border-radius: 0;
    }

    .cart-btn {
      background: #3C3A39;
    }
    .buy-btn {
      background-color: #D6454C
    }
  }
  .select-win {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
  }
}
</style>
