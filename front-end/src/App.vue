<template>
  <div id="app" class="cxh-app">
    <transition name="van-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script >

export default {
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
