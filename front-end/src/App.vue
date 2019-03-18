<template>
  <div id="app" class="cxh-app">
    <transition name="van-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script >

export default {
  mounted () {
    this.$ajax.interceptors.response.use(
      (res) => {
      let { status, data, msg } = res
      if (parseInt(status) != 1) {
        let _msg = msg ? msg : '网络繁忙，请稍后重试'
        if (this.$toast) this.$toast(_msg)
      }
      return res
    },
    (err) => {
      if (this.$toast) this.$toast(JSON.stringify(err))
      return Promise.reject(err)
    })
  }
}

</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 12px;
  height: 100%;
}
.scroll {
  -webkit-overflow-scrolling: touch
}
</style>
