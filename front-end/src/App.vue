<template>
  <div id="app" class="cxh-app">
    <router-view />
  </div>
</template>
<script >

export default {
  data () {
    return {
      active: 1
    }
  },
  methods: {
    go (where) {
      this.$router.push({ path: where })
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
  font-size: 12px;
  height: 100%;
}
</style>
