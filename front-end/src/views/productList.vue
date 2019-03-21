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
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onload"
        flex=""
        class="prod-list"
        >
        <van-cell v-for="prod in list" class="prod-item" flex="dir:top main:center">
          <router-link :to="{ name: 'product', query: { id: prod.id, come: 'prodlist' } }" tag="div">
            <div class="tx-c-666">
              <img :src="prod.thumb" alt="" />
              <div flex="main:justify" class="flex-wrap">
                <strong class="tx-c-red fs-18">￥{{prod.price}}</strong>
                <span class="fs-9 no-wrap"><span class="reword-icon">赠</span>{{prod.member_points}}个</span>
              </div>
              <p>{{prod.title}}</p>
            </div>
          </router-link>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      headerTitle: '精品分享',
      loading: false,
      finished: false,
      list: [],
      cate_id: 8,
      page: 1
    }
  },
  mounted () {
    this.cate_id = this.$route.query.cate_id || 8
  },
  methods: {
    onClickLeft () {
      window.goBackNative()
    },
    getList () {
      this.$ajax.get(`/product/list?cate_id=${this.cate_id}&page=${this.page}`)
        .then(({status, data, msg}) => {
          if (parseInt(status) === 1) {
            this.page++
            if (data.products.length === 0) this.finished = true
            this.list =  [...this.list, ...data.products]
          }
          this.loading = false
        })
        .catch(() => {
          this.finished = false
          this.loading = false
        })
    },
    onload () {
      this.getList()
    }
  }
}
</script>

<style lang="scss">
.product-list-win {
  background: #FFF;

  .prod-list {
    padding: 15px;
    flex-wrap: wrap;

    .van-list__loading {
      flex-shrink: 0;
      width: 100%;
      text-align: center;
    }
    .van-list__finished-text {
      width: 100%;
      text-align: center;
    }
  }
  .fs-18 {
    font-size: 18px;
  }
  .fs-9  {
    font-size: 10px;
  }
  .prod-item {
    margin-bottom: 10px;
    box-sizing: border-box;
    padding: 0;
    width: 50%;
    flex-shrink: 0;

    img {
      box-sizing: border-box;
      display: block;
      margin-bottom: 8px;
      width: 160px;
      height: 170px;
    }

    .reword-icon {
      margin-right: 5px;
      display: inline-block;
      width: 20px;
      height: 16px;
      font-size: 10px;
      line-height: 16px;
      color: #FFF;
      text-align: center;
      border-radius: 4px;
      background-color: #D6454C;
    }

    p {
      margin: 0;
      max-width: 100%;
      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;
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
