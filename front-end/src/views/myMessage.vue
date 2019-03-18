<template lang="html">
  <div class="my-message">
    <van-nav-bar
      title='我的消息'
      left-text=''
      left-arrow
      :border='false'
      @click-left='onClickLeft'
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
      >
      <van-cell v-for="item in list" :key="item.id">
        <router-link :to="{ name: 'msgDetail', params: {id: item.id} }" class="msg-item">
          <p class="tx-c-333">{{item.title}}</p>
          <div class="tx-c-999">{{item.create_time | time}}</div>
        </router-link>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      finished: false,
      error: false,
      page: 1,
      list: []
    }
  },
  methods: {
    onClickLeft() {
      window.goBackNative()
    },
    onLoad () {
      this.$ajax
        .get('/article/list?page=' + this.page)
        .then(({status, data, msg}) => {
          if (parseInt(status) === 1) {
            this.page++
            if (data.length === 0) this.finished = true
            this.list = [...this.list, ...data]
          }
          this.loading = false
        })
        .catch(() => {
          this.finished = false
          this.loading = false
          this.error = true
          this.$toast('网络错误，请稍后重试')
        })
    }
  }
}
</script>

<style lang="scss">
.my-message {
  height: 100%;

  .msg-item {
    // padding: 12px 20px;

    p {
      margin: 0;
      font-size: 14px;
      height: 20px;
    }
    &>div {
      font-size: 10px;
    }
  }
}
</style>
