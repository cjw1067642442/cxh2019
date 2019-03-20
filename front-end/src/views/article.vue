<template lang="html">
  <div class="vip-dec scroll">
    <van-nav-bar
      :title='title'
      left-text=''
      left-arrow
      fixed
      :border='false'
      @click-left='onClickLeft'
    />
    <div class="member-line" v-html="content"></div>
  </div>
</template>

<script>
export default {
  name: 'article',
  data () {
    return {
      title: '',
      content: ''
    }
  },
  mounted () {
    this.title = this.$route.query.title || '老板没有给标题哦'
    this.$ajax.get(`/article/${this.$route.query.url}`)
      .then(({status, data, msg}) => {
        this.content = data.content
        this.title = data.title
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

  .member-line {
    padding: 5px;
  }
}
</style>
