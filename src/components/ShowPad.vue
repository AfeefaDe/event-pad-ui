<template>
  <div>
    <event-link-clipboard :event="event">
    </event-link-clipboard>
  </div>
</template>

<script>
import EventLinkClipboard from '@/components/EventLinkClipboard'
import Event from '@/models/Event'
import Events from '@/resources/Events'

export default {
  name: 'ShowPad',
  components: {EventLinkClipboard},
  data () {
    return {
      event: new Event()
    }
  },
  created: function () {
    Events.getEvent(this.$route.params.uri).then(event => {
      this.event = event
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~variables";

h1 {
  color: $black;
}

</style>
