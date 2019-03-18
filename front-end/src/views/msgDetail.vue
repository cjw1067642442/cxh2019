<template lang="html">
  <div class="msg-detail scroll">
    <van-nav-bar
      title='消息详情'
      left-text=''
      left-arrow
      :border='false'
      @click-left='onClickLeft'
    />
    <div class="detail-content">
      <div class="d-title">{{title}}</div>
      <div class="d-time">{{create_time}}</div>
      <div class="d-content-detail" v-html="content" v-cloak></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return  {
      title: '',
      create_time: '',
      content: '',
      id: ''
    }
  },
  mounted () {
    this.id = this.$route.params.id ? this.$route.params.id : this.$route.query.id
    this.$ajax
      .get('/article/detail?id='+this.id)
      .then(({status, data, msg}) => {
        if (parseInt(status) === 1) {
          this.title  = data.title
          this.content  = data.content
          this.create_time  = data.create_time
        }
        else {
          this.$toast('网络繁忙，请稍后重试.' +msg)
        }
      })
      .catch(() => {
        this.$toast('网络繁忙，请稍后重试')
      })
    // this.$ajax.get('')
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.msg-detail {
  height: 100%;
  background: #FFF;

  .detail-content {
    padding: 0 26px;
  }
  .d-title {
    margin: 20px 0 6px;
    line-height: 22px;
    text-align: justify;
    font-size: 16px;
    color: #3C3A39;
  }
  .d-time {
    font-size: 12px;
  }
  .d-content-detail {
    margin: 15px 0 0;

    img {
      display: block;
      width: 100%;
    }

    &>div,&>p {
      margin-top: 0;
    }

    p {
      color: #666;
      text-align: justify;
    }
    b {
      color: #D6454C;
    }
  }
}
</style>
