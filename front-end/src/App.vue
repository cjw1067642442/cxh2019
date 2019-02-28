<template>
  <div id="app">
    <van-tabbar v-model="active" id="nav" class="bor-1-top">
      <van-tabbar-item @click.stop="go('/')" >Home</van-tabbar-item>
      <van-tabbar-item @click.stop="go('/About')" class="bor-1-left">About</van-tabbar-item>
      <van-tabbar-item @click.stop="go('/myOrders')" class="bor-1-left">myOrders</van-tabbar-item>
    </van-tabbar>
    <router-view />
  </div>
</template>
<script >
  export default {
    data() {
      return {
        active: 1
      }
    },
    methods: {
      go (where) {
        this.$router.push({path: where})
        console.log(where)
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.bor-1-left {
  border-left: 1px solid #ccc;
}
.bor-1-top {
  border-top: 1px solid #eee;
}
</style>
