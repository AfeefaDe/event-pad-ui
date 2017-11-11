<template>
  <div>
    <event-link-clipboard :link="eventId">
    </event-link-clipboard>
  </div>
</template>

<script>
import EventLinkClipboard from '@/components/EventLinkClipboard'

export default {
  name: 'ShowPad',
  components: {EventLinkClipboard},
  data () {
    return {
      eventId: false
    }
  },
  created: function () {
    if (this.$route.params.id) {
      this.eventId = this.$route.params.id
      this.loadPadInfo()
    }
  },
  methods: {
    loadPadInfo: function () {
      console.debug('TODO: load Pad Info for: ', this.eventId)
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
