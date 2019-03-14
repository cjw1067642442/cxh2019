<template lang="html">
  <div class="no-list">
    <van-nav-bar
      title='列表'
      left-text=''
      left-arrow
      :border='false'
      @click-left='onClickLeft'
    />
    <van-tabs>
      <van-tab v-for= "tab in tabList" :title="tab.title">
      {{tab.title}}
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          title: '1',
          status: 0,
          url: '/kskdf'
        },
        {
          title: '2',
          status: 1,
          url: '/lkoo'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
</style>
