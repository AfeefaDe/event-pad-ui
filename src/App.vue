<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style  lang="scss">
@import "~variables";
@import "~main";

#app {
  width: 100%;
  margin:  0 auto;
  box-sizing: border-box;
}
</style>
