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
import { mapState } from 'vuex'

export default {
  data () {
    return {
      searchResult: [],
      addrSaving: false,
      isNew: false
    }
  },
  mounted () {
    if (this.$route.params.isNew) this.isNew = true
  },
  methods: {
    onClickLeft () {
      this.$router.push({
        path: '/address'
      })
    },
    // 修改 详细地址（街道地址） 时触发
    onChangeDetail (val) {
      // this.$toast(val)
    },
    // 切换是否使用默认地址时触发
    changeDefault (value) {
      this.$toast(value+' 122')
    },
    // 确定修改
    onSave (content) {
      let data = {}
      // 修改的时候，需要ID
      if (!this.isNew) data.id = this.defaultInfo.id
      data.region_id = content.areaCode
      data.region = content.province + content.city + content.county
      data.address = content.addressDetail
      data.name = content.name
      data.phone = content.tel
      data.default = content.isDefault ? 1 : 0

      let url = this.isNew ? '/address/add' : '/address/mod'

      this.$ajax.post(url, data)
        .then(({status, data, msg}) => {
          if (parseInt(status) === 1) {
            this.onClickLeft()
          } else {
            this.$toast(msg)
          }
        })

    },
    onDelete (content) {
      this.$toast(JSON.stringify(content))
    }
  },
  computed: {
    ...mapState({
      areaList: 'areaList',
      defaultInfo: 'defaultInfo'
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
