<template>
  <div>
    <!-- todo: list events -->
  </div>
</template>

<script>
export default {
  name: 'ShowPad',
  data () {
    return {
      padID: false
    }
  },
  created: function () {
    if (this.$route.params.id) {
      this.padID = this.$route.params.id
      this.loadPadInfo()
    }
  },
  methods: {
    loadPadInfo: function () {
      console.debug('TODO: load Pad Info for: ', this.padID)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~variables";

h1 {
  color: $black;
}

</style>
