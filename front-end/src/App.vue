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
      // 非法 token
      if (parseInt(status) === 2 || parseInt(status) === 403) {
        if (this.$dialog) this.$dialog({
          title: '请先登录',
          message: msg
        })
        .then(() => {
          location.href = '/login'
        })
      }
      if (parseInt(status) === 0) {
        this.$toast(msg)
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
.van-pull-refresh__track, .scroll {
  -webkit-overflow-scrolling: touch
}
.over-h {
  overflow-y: hidden;
}
</style>
