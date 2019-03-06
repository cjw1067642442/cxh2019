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
      <div class="addr-item" v-for="addr in addrList" @click.stop="selAddr(addr)">
        <div>
          <strong class="addr-name tx-c-333">{{addr.name}}</strong>
          <span class="tx-c-999">{{addr.phone}}</span>
        </div>
        <div flex="cross:top main:justify">
          <div><span class="def-icon tx-c-red" v-if="addr.is_default==1">默认</span><span>{{addr.region + addr.address}}</span></div>
          <div class="fix-addr-space">
            <i class="gr-line"></i>
            <span class="edi-addr-btn" @click.stop="editAddr(addr)"></span>
          </div>
        </div>
      </div>
    </div>

    <div class="addr-footer">
      <van-button class="add-addr-btn" to="/editaddress">添加地址</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'

export default {
  data() {
    return {
      addrList: [],
      comeFrom: ''
    }
  },
  mounted () {
    if (this.$route.query.come) {
      this.comeFrom = this.$route.query.come
    }

    this.addrList = [{
      address: "\u5357\u5c71\u533a\u67d0\u67d0\u8857\u90533\u53f7",
      name: "\u59da\u660e",
      phone: "18****678",
      region: "\u5e7f\u4e1c\u7701\u9633\u6c5f\u5e02\u6c5f\u57ce\u533a",
      region_id: "440000,441700,441702",
      is_default: "1"
    },
    {
      address: "\u6df1\u5733\u5e02\u5357\u5c71\u533a\u67d0\u67d0\u8857\u90531\u53f7",
      name: "\u9648\u51a0\u5e0c66",
      phone: "13****678 ",
      region: "\u5e7f\u4e1c\u7701\u9633\u6c5f\u5e02\u6c5f\u57ce\u533a",
      region_id: "440000,441700,441702 ",
      is_default: "0"
    }]
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    // 选择地址
    selAddr (addr) {
      if (this.comeFrom) {
        this.$router.push({
          name: this.comeFrom,
          params: addr
        })
      }
    },
    // 修改地址
    editAddr(addr) {
      this.$store.commit('setDefaultInfo', {
        id: addr.id,
        name: addr.name,
        tel: addr.phone,
        addressDetail: addr.address,
        areaCode: '110214',
        isDefault: addr.is_default==='1'?true:false
      })
      this.$router.push({
        name: 'editaddress'
      })
    },
    // 添加地址
    addAddr () {
      this.$store.commit('setDefaultInfo', {})
      this.$router.push({
        path: '/editaddress',
      })
    }
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

  .addr-footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50px;

    .add-addr-btn {
      display: block;
      width: 100%;
      height: 100%;
      text-align: center;
      font-size: 16px;
    }
  }
}
</style>
