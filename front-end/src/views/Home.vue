<template>
  <div class="home">
    <van-button type="default" to="/myOrders">myOrders</van-button>
    <van-button type="primary" to="/shoppingcart">shoppingcart</van-button>
    <van-button type="info" to="/payment">payment</van-button>
    <van-button type="warning" to="/address">address</van-button>
    <van-button type="danger" to="/editaddress">editaddress</van-button> |
    <van-button type="danger" to="/address">address</van-button>
    <van-button type="danger" to="/product">product</van-button>

  </div>
</template>

<script>
export default {
  name: 'home',
  mounted () {
  },
  methods: {
    getData () {
      this.$ajax.get('http://localhost:5656')
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss">
  img {
    width: 100px;
  }
</style>
