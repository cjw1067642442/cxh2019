<template lang="html">
  <div class="tabs-list scroll">
    <van-nav-bar
      :title='headerTitle'
      left-text=''
      left-arrow
      :border='false'
      @click-left='onClickLeft'
    />
    <template v-if="tabList.length>1">
      <van-tabs
        v-if=""
        v-model="active"
        color="#D6454C"
        title-inactive-color="#3C3A39"
        title-active-color="#D6454C"
        :sticky="true"
        :line-width="30"
        :line-height="3"
        :swipeable="true"
        :fixed="true"
        :animated="false"
        @change="changeTab"
        >
        <van-tab v-for= "tab in tabList" :title="tab.tab"></van-tab>
      </van-tabs>
    </template>
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
      @load="onLoad"
      >
      <van-cell
        v-for="(item, idx) in list"
        :key="idx"
        class="my-list"
        >
        <div class="tab-title tx-c-333 van-hairline--bottom">{{item.title}}</div>
        <div class="tab-labels tx-c-999">
          <span v-for="label in item.labels">{{label}}</span>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      headerTitle: '',
      tabList: [],
      loading: false,
      finished: false,
      error: false,
      list: [],
      page: 1
    }
  },
  created () {
    let { title, active = 0, where='' } = this.$route.query
    this.active = 0
    this.headerTitle = title || '---'
    this.$ajax.get('/common/tablist?where='+where)
      .then(({status, data, msg}) => {
        if (parseInt(status) === 1 && data) {
          this.tabList = [...data]
          this.onLoad('isChange')
        } else {
          this.$toast(msg)
        }
      })
      .catch((e) => {
        this.$dialog({
          title: '错误',
          message: location.href
        })
        this.loading = false
        this.finished = true
      })
  },
  mounted () {
    // this.changeTab()
  },
  methods: {
    onClickLeft () {
      window.goBackNative()
    },
    init () {
      this.tabList.length = 0
      this.page = 1
    },
    changeTab () {
      this.init()
      this.onLoad('change')
    },
    onLoad (isChange) {

      if (this.page === 1 && !isChange) return
      let tab = this.tabList[this.active]
      let url = ''
      if (tab.url.match(/\?/g)) {
        url += (tab.url + '&page=' +this.page)
      } else {
        url += (tab.url + '?page=' +this.page)
      }
      this.$ajax.get(url.replace('/app', ''))
        .then(({status, data, msg}) => {
          if (parseInt(status) === 1) {
            this.page++
            if (data.length === 0) this.finished = true
            this.list = [...this.list, ...data]
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
          this.error = true
        })
    },
  }
}
</script>

<style lang="scss">
.tabs-list {
  padding-bottom: 50px;
  background-color: #F2F2F3;

  .my-list {
    margin-top: 5px;
  }
  .van-hairline--bottom {
    position: relative;

    &::after {
      content: ' ';
      position: absolute;
      // pointer-events: none;
      box-sizing: border-box;
      right: 0;
      left: 0;
      bottom: 0;
      top: auto;
      // height: 0;
      // line-height: 0;
      transform: scaleY(.5);
      border-bottom: 1px solid #ccc;
    }
  }
  .tab-title {
    // margin-bottom: 3px;
    padding-bottom: 8px;
    line-height: 20px;
    font-size: 16px;
  }
  .tab-labels {
    font-size: 10px;

    span {
      margin-right: 10px;
    }
  }
}
</style>
