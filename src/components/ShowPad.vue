<template>
  <div>
    
    <div ref="header" class="header">
      <div ref="pattern" class="pattern"></div>
      <div class="header-content">
        <h1>Redaktionssitzung</h1>
        <div>
          <p>Morgen</p>
          <p>18:00</p>
        </div>
        <div>
          <p>Impact Hub Dresden</p>
        </div>
      </div>
    </div>
    
    <event-link-clipboard :event="event">
    </event-link-clipboard>
  </div>
</template>

<script>
import EventLinkClipboard from '@/components/EventLinkClipboard'
import Event from '@/models/Event'
import Events from '@/resources/Events'
import Trianglify from 'trianglify'

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
  },
  mounted () {
    var participants = 10

    var pattern = Trianglify({
      width: this.$refs.header.offsetWidth,
      height: this.$refs.header.offsetHeight,
      cell_size: 300 / participants,
      x_colors: 'Spectral',
      y_colors: 'Spectral'
    })
    this.$refs.pattern.appendChild(pattern.svg())
    this.$el.querySelector('svg').setAttribute('opacity', 0.5)
  }
}
</script>

<style lang="scss" scoped>
@import "~variables";

h1 {
  color: $black;
}

.header {
  width: 100%;
  height: auto;
  background-color: black;
  position: relative;
}

.pattern {
  position: absolute;
  top: 0;
  z-index: 5;
}
.header-content {
  width: 100%;
  padding: 1rem;
  text-align: center;
  position: relative;
  z-index: 10;
}
h1 {
  color: white;
}

p {
  color: white;
  display: inline-block;
  margin: 0 1rem;
}

</style>
