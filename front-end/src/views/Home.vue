<template>
  <div class="home">
    <van-button type="default" to="/myOrders">myOrders</van-button>
    <van-button type="primary" to="/shoppingcart">shoppingcart</van-button>
    <van-button type="info" to="/payment">payment</van-button>
    <van-button type="warning" to="/address">address</van-button>
    <van-button type="danger" to="/editaddress">editaddress</van-button> |
    <van-button type="danger" to="/address">address</van-button>
    <van-button type="danger" to="/product">product</van-button>
    <div class="">
    {{num | rmb}}
    </div>
    <van-button @click="getData">ajax</van-button>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      num: 10000.251
    }
  },
  mounted () {

  },
  methods: {
    getData () {
      this.$ajax.post('http://localhost:5656/err', { a: 123, b: 888 })
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
