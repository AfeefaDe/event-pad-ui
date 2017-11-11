<template>
  <div>
    <h1>{{this.title}}</h1>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar',
  data () {
    return {
      title: ''
    }
  },
  created: function () {
    this.updateRouteTitle()
  },
  methods: {
    updateRouteTitle: function () {
      if (this.$route.meta.navTitle) {
        this.title = this.$route.meta.navTitle
      }
    }
  },
  watch: {
    '$route': function () {
      this.updateRouteTitle()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~variables";

</style>
