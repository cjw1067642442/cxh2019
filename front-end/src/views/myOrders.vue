<template lang="html">
  <div class="my-orders">
    <h3>my orders</h3>
    <van-card v-for="card in commodityList"
      :num="card.num"
      tag="标签"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      :thumb="card.thumb"
      origin-price="10.00"
    >
      <div slot="footer">
        <van-button size="mini">按钮</van-button>
        <van-button size="mini">按钮</van-button>
      </div>
    </van-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commodityList: [
        {
          num:2,
          tag: '标签',
          price: '2.25',
          desc: '描述信息',
          title: '商品标题',
          thumb: '/imgs/cnk.png'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
</style>
