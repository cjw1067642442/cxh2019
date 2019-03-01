<template lang="html">
  <div class="my-orders">
    <van-tabs v-model="active">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
    <van-card v-for="(card,idx) in commodityList"
      :num="card.num"
      tag="标签"
      :price="card.price"
      desc="描述信息"
      title="商品标题"
      :thumb="card.thumb"
      origin-price="10.00"
    >
      <div slot="footer" v-if="idx%2 ==0">
        <van-button size="mini">按钮</van-button>
        <van-button size="mini">按钮</van-button>
      </div>
    </van-card>
    <van-button type="primary" size="small" @click.stop="getImgs">getImgs</van-button>
  </div>
</template>

<script>
const img = require('../assets/xnk.png')
const imgsList = []
for (let i = 0; i < 5; i++) {
  let rand = Math.floor(Math.random() * 10 + 1) + ''
  console.log(rand);
  imgsList.push({
    num:2,
    tag: '标签'+i,
    price: rand+'.00',
    desc: '描述信息',
    title: '商品标题',
    thumb: process.env.NODE_ENV === 'production' ? '/imgs/xnk.png' : img
  })
}

export default {
  data () {
    return {
      active: 1,
      commodityList: []
    }
  },
  methods: {
    getImgs () {
      this.commodityList = [...imgsList]
    }
  }
}
</script>

<style lang="scss">
.my-orders {
  padding: 0 0 52px 0;
}
</style>
