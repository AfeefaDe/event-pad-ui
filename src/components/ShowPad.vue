<template>
  <div>
    
    <div ref="header" class="header">
      <div ref="pattern" class="pattern"></div>
      <div class="header-content">
        <h1>Redaktionssitzung</h1>
        <p>Do 7.12.2017 um 18:00</p>
        <p>
          <span class="location" @click="openLocationInGMaps()">Impact Hub Dresden</span>
        </p>
      </div>
    </div>

    <section class="description">
      <h2>Beschreibung</h2>
      <pre>AGENDA:
- Kategorienbaum beschließen
- Orga
  - Redaktionsrhythmus
  - ÖA Event</pre>
    <p class="show-more">...</p>
    </section>

    <section>
      <h2>Teilnehmer</h2>
      <div class="participants">
        <div class="list">
          <span class="list-heading">Kommt:</span>
          <ul>
            <li>Anna</li>
            <li>Felix</li>
            <li>Friedrich</li>
            <li>Jens</li>
          </ul>
        </div>
        <div class="list not-coming">
          <span class="list-heading">Kommt nicht:</span>
          <ul>
            <li>Misha</li>
            <li>Ahmad</li>
          </ul>
        </div>
      </div>
    </section>

    <div class="participation-actions">
      <div class="flex">
        <button class="button-green button-small-margin" @click="userAction()">Komme!</button>
        <button class="button-red button-small-margin" @click="userAction()">Komme nicht</button>
      </div>
    </div>

    <section>
      <h2>Leute einladen</h2>
      <event-link-clipboard :event="event"></event-link-clipboard>
    </section>

    <section>
      <h2>Benötigt</h2>
      <ul>
        <li>Bier</li>
        <li>Essen</li>
      </ul>
    </section>

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
    var participants = 30

    var pattern = Trianglify({
      width: this.$refs.header.offsetWidth,
      height: this.$refs.header.offsetHeight,
      cell_size: 2000 / participants,
      x_colors: 'GnBu',
      y_colors: 'GnBu'
    })
    this.$refs.pattern.appendChild(pattern.svg())
    this.$el.querySelector('svg').setAttribute('opacity', 0.5)
  },
  methods: {
    openLocationInGMaps: function () {
      window.open('http://maps.google.de/maps/search/' + this.event.location.replace(' ', '+'))
    },
    userAction: function () {
      let userName = prompt('Gib deinen Namen einen, mit andere dich erkennen:')
      console.debug(userName)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~variables";

h1 {
  color: $white;
  font-size: 1.3rem;
  display: inline-block;
  text-transform: uppercase;
  border: none;
  margin-bottom: .5em;
}

p {
  margin: 0;
}
.header {
  width: 100%;
  height: auto;
  background-color: $black;
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
    color: $white;
  }
    .location {
      border-bottom: 1px dashed white;
      cursor: pointer;
    }

.description {
  /*background: $creme;*/
}
  pre {
    margin: 0;
  }
  .show-more {
    font-size: 2rem;
    color: $black;
    text-align: center;
  }
.participants {
  display: flex;
  margin-bottom: 1rem;
  
  .list {
    width: 50%;
    padding-right: 1rem;

    &.not-coming {
      /*text-align: right;*/
    }

    .list-heading {
      font-style: italic;
    }
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding-left: 0;
  }
  li {
    display: inline-block;
    background-color: $creme;
    margin-bottom: .3rem;
    padding: .2rem;
  }
}

.participation-actions {
  position: relative;

  .flex {
    display: flex;
  }
}
</style>
