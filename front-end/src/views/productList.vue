<template lang="html">
  <div class="product-list-win scroll">
    <van-nav-bar
      :title='headerTitle'
      left-text=''
      left-arrow
      :border='false'
      @click-left='onClickLeft'
    />
    <div>
      <van-list
        v-loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onload"
        flex=""
        class="prod-list"
        >
        <van-cell v-for="prod in list" class="prod-item" flex="dir:top">
          <div class="tx-c-666">
            <img src="" alt="">
            <div flex="main:justify">
              <strong class="tx-c-red fs-18">￥700.00</strong>
              <span class="fs-9">赠122个</span>
            </div>
            <p>名称</p>
            <div class="fs-9">描述</div>
          </div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      headerTitle: 'title',
      loading: false,
      finished: false,
      list: [1,2,3,5,6,7,8]
    }
  },
  methods: {
    onClickLeft () {
      window.goBackNative()
    },
    getList () {
      // this.$ajax
    },
    onload () {

    }
  }
}
</script>

<style lang="scss">
.product-list-win {
  background: #f2f2f3;

  .prod-list {
    padding: 15px;
    flex-wrap: wrap;
  }
  .fs-18 {
    font-size: 18px;
  }
  .fs-9  {
    font-size: 9px;
  }
  .prod-item {
    margin-bottom: 10px;
    box-sizing: border-box;
    padding: 0;
    width: 50%;
    flex-shrink: 0;
    background: #f1f1f1;

    img {
      box-sizing: border-box;
      display: block;
      margin-bottom: 8px;
      width: 160px;
      height: 170px;
      border: 1px solid #ccc;
    }
    p {
      margin: 0;
      line-height: 22px;
    }

    &:nth-child(even) {
      padding-left: 12px;
    }
    &:nth-child(odd) {
      padding-right: 12px;
    }
  }
  .van-cell:after {
    opacity: 0;
  }
}
</style>
