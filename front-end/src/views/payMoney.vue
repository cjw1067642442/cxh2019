<template lang="html">
  <div class="pay-money">
    <van-nav-bar
      title='付款'
      left-text=''
      left-arrow
      :border='false'
      @click-left='onClickLeft'
    />

  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
</style>
