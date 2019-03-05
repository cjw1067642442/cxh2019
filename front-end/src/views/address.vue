<template lang="html">
  <div class="addr-list-page">
    <van-nav-bar
      title='收货地址'
      left-text=''
      left-arrow
      :border='false'
      @click-left='onClickLeft'
    />
    <div class="addr-list">
      <div class="addr-item">
        <div>
          <strong class="addr-name tx-c-333">陈冠希</strong>
          <span class="tx-c-999">131****7262</span>
        </div>
        <div flex="cross:top">
          <span class="def-icon tx-c-red">默认</span><span>广东省 深圳市 南山区 某某街道 某某小区10栋 110号</span>
          <div class="fix-addr-space">
            <i class="gr-line"></i>
            <span class="edi-addr-btn"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },

  }
}
</script>

<style lang="scss">
.addr-list-page {
  height: 100%;
  background: #F2F2F3;


  .addr-list {
    background-color: #FFF;

    .addr-item {
      box-sizing: border-box;
      min-height: 87px;
      padding: 12px 0 14px 20px;

      &>div{
        &:first-child {
          margin-top: 6px;
        }
      }

      .def-icon {
        display: inline-block;
        margin-right: 13px;
        width: 34px;
        height: 17px;
        line-height: 18px;
        text-align: center;
        font-size: 12px;
        background-color: rgba(214, 69, 76, .3);
        border: 1px dashed #999;
      }
      .gr-line {
        display: inline-block;
        width: 1px;
        height: 20px;
        background-color: #EEEEEE;
      }
      .fix-addr-space {
        margin-left: 10px;
        width: 54px;
        height: 100%;
      }
      .edi-addr-btn {
        display: inline-block;
        margin-left: 15px;
        width: 20px;
        height: 20px;
        background: url('../assets/bianji.png') no-repeat center 4px;
        background-size: 15px 15px;
      }
    }
    .addr-name {
      margin-right: 10px;
      height: 22px;
      line-height: 22px;
      font-size: 16px;
    }
  }
}
</style>
