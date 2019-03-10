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
      @load="onLoad"
      >
      <van-cell v-for="item in list" :key="item.id">
        <router-link :to="{ name: '/msgDetail', params: {id: item.id} }" class="msg-item">
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
      list: []
    }
  },
  mounted () {
    this.list = require('../../data-factory/mymsg.json').data
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onLoad () {
      console.log(1);
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
