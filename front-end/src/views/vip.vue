<template lang="html">
  <div class="vip-dec">
    <van-nav-bar
      title='会员权益'
      left-text=''
      left-arrow
      fixed
      :border='false'
      @click-left='onClickLeft'
    />
    <p>会员权益</p>
    <div class="member-line" v-html="content">

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: '...'
    }
  },
  mounted () {
    this.$ajax.get('/article/vip')
      .then(({status, data, msg}) => {
        this.content = data.content
      })
      .catch(() => {
        this.$toast('网络繁忙，请稍后重试')
      })
  },
  methods: {
    onClickLeft () {
      window.goBackNative()
    }
  }
}
</script>

<style lang="scss">
.vip-dec {
  padding: 46px 10px 0;
}
</style>
