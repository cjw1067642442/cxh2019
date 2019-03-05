<template>
  <div class="home">
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button> |
    <van-button type="danger" to="/address">address</van-button>

  </div>
</template>

<script>
export default {
  name: 'home',
  // components: {
  //   HelloWorld
  // },
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
