<template lang="html">
  <div>
    <van-nav-bar
      title='添加收货地址'
      left-text=''
      left-arrow
      :border='false'
      @click-left='onClickLeft'
    />
    <div class="edit-tips">温馨提示: 请确保收件人为真实姓名,否则可能无法收货</div>
    <van-address-edit
      show-set-default
      show-search-result
      show-delete
      :area-list="areaList"
      :search-result="searchResult"
      :is-saving="addrSaving"
      :address-info="defaultInfo"
      @change-detail="onChangeDetail"
      @change-default="changeDefault"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { Toast } from 'vant'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      searchResult: [],
      addrSaving: false,
      defaultInfo: {
        id: '001',
        name: '收货人姓名',
        tel: '16620981788',
        addressDetail: '详细地址详细地址详细地址详细地址',
        areaCode: "130531",
        isDefault: true
      }
    }
  },
  created() {
    Toast(JSON.stringify(this.$route.params))
    this.defaultInfo.phone = this.$route.params.tel
    this.defaultInfo.phone = this.$route.params.address
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        path: '/address',
        query: {
          addrID: '001'
        }
      })
    },
    // 修改 详细地址（街道地址） 时触发
    onChangeDetail(val) {
      Toast(val)
    },
    // 切换是否使用默认地址时触发
    changeDefault(value) {
      Toast(value+' 122')
    },
    onSave(content) {
      Toast(JSON.stringify(content))
    },
    onDelete(content) {
      Toast(JSON.stringify(content));
    }
  },
  computed: {
    ...mapState({
      areaList: 'areaList'
    })
  }
}
</script>

<style lang="scss">
.van-button--danger {
  border-color: #D6454C;
  background-color: #D6454C;
}
.edit-tips {
  box-sizing: border-box;
  padding: 0 15px;
  height: 25px;
  line-height: 25px;
  color: #FFF;
  background-color: #D6454C;
}
</style>
