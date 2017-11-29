<template>
  <div id="app">
    <router-view/>

    <dialog-window></dialog-window>
  </div>
</template>

<script>
import DialogWindow from '@/components/Dialog'

export default {
  name: 'app',

  components: {
    DialogWindow
  }
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
