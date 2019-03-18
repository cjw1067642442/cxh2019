<template lang="html">
  <div class=""></div>
</template>

<script>
export default {
  mounted () {
    this.$dialog.alert({
      title: '未登录',
      message: '请先登录'
    })
    .then(() => {
      window.goBackNative()
      // 返回APP
    })
  }
}
</script>

<style lang="scss">

</style>
