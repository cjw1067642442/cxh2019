<template lang="html">
  <div class="vip-dec">
    <van-nav-bar
      title='精选商品'
      left-text=''
      left-arrow
      fixed
      :border='false'
      @click-left='onClickLeft'
    />
    <p>精选商品</p>
    <div class="member-line" v-html="content">

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: '',
      cate_id: 8,
      page: 1,
      isLoading: false
    }
  },
  mounted () {
    this.cate_id = this.$route.query.cate_id || 8
    this.$ajax.get(`/product/list?cate_id=${this.cate_id}&page=${this.page}`)
      .then(({status, data, msg}) => {
        // this.content = data.content
        console.log(data);
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
