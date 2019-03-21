<template lang="html">
  <div class="vip-dec">
    <van-nav-bar
      :title='title'
      left-text=''
      left-arrow
      fixed
      :border='false'
      @click-left='onClickLeft'
    />
    <div class="member-line" v-html="content">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      content: '...'
    }
  },
  mounted () {
    this.title = this.$route.query.title || '---'
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

  img {
    width: 100%;
  }
}
</style>
